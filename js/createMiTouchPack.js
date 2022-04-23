
function createMiTouchPack(button) {

    var numb = "",
        code = "",
        html = "";
    directory = "",
        name = "",
        isError = false;

    $(button).on("click", function() {

        // validate directory prezentetion

        directory = $(".active .nameDir").val();

        if (directory === "") {

            isError = true;
            $(".active .nameDir").addClass("errors").val(directory);

        } else {

            $(".active .nameDir").removeClass("errors");
        }

        // validate name prezentation   

        name = $(".active .namePres").val();

        if (name === "") {

            isError = true;
            $(".active .namePres").addClass("errors").val(name);

        } else if (name.match(/((^[^a-z]))|([^a-z0-9_-])/i)) {

            name = "nie poprawna nazwa";

            isError = true;
            $(".active .namePres").addClass("errors").val(name);

        } else {

            $(".active .namePres").removeClass("errors");
        }

        // validate quantity prezentation

        quantity = $(".active .quantitySlajd").val();

        if (quantity === "") {

            isError = true;
            $(".active .quantitySlajd").addClass("errors").val(quantity);

        } else if (quantity.match(/\D/)) {

            quantity = "powinna byc liczba";

            isError = true;
            $(".active .quantitySlajd").addClass("errors").val(quantity);

        } else {

            $(".active .quantitySlajd").removeClass("errors");
        }

        // validate code prezentation   

        code = $(".active .code").val();

        if (code === "") {

            isError = true;
            $(".active .code").addClass("errors").val(code);

        } else if (code.match(/[^a-z0-9]/i)) {

            code = "nie poprawny kod";

            isError = true;
            $(".active .code").addClass("errors").val(code);

        } else if (code.length < 3) {

            code = "kod powinien zawierac 3 symbole";

            isError = true;
            $(".active .code").addClass("errors").val(code);

        } else {

            $(".active .code").removeClass("errors");
        }

        // validate template structure of prezentation

        template = $(".active .template").val();

        if (template === "") {

            isError = true;
            $(".active .template").addClass("errors").val(template);

        } else {

            $(".active .template").removeClass("errors");
        }

        // validate all errors

        if (isError) {

            return isError = false;

        } else {

            createPackage(template, path.join(directory, name));
        }

    });

    function createPackage(templateFolder, toFolder) {

        try {
            fs.mkdirSync(toFolder);
        } catch (err) {
            alert(err);
            return;
        }

        //  create new HTML-files & write Id

        function* createGenerator() {

            let templateHTML;

            yield new Promise(function(resolve, reject) {


                fs.readFile(path.join(templateFolder, "index.html"), {
                    encoding: "utf8"
                }, (err, data) => {

                    if (err) return reject(err);

                    let str = data.match(/kod_s_00/);
                    let str2 = data.match(/wrapper_kod/);

                    if (str && str2) {

                        data = data.replace(str2, "wrapper_" + code);
                        templateHTML = data;
                        resolve();

                    } else {

                        alert("Sprawdz pooprawnosc wpisu id='kod_s_00' i class='wrapper_kod' w templatce kod_s_00.html!");
                        return;
                    }
                });
            });

            let templateXML;

            yield new Promise(function(resolve, reject) {


                fs.readFile(path.join(templateFolder, "parameters", "parameters.xml"), {
                    encoding: "utf8"
                }, (err, data) => {

                    if (err) return reject(err);

                    let str = data.match(/kod_s_00/);

                    if (str) {

                        templateXML = data;
                        resolve();

                    } else {

                        alert("Sprawdz pooprawnosc wpisu id='kod_s_00' w templatce parameters.xml!");
                        return;
                    }
                });
            });

            for (let i = 0; i < quantity; i++) {

                let s = (i < 10) ? ("0" + i) : i;

                fileCode = code + "_s_" + s;

                yield new Promise(function(resolve, reject) {

                    copydir(templateFolder, path.join(toFolder, fileCode), (err) => {

                        if (err) return reject();

                        resolve();
                    });
                });

                yield new Promise(function(resolve, rejact) {

                    let data = templateHTML.replace("kod_s_00", fileCode);

                    fs.writeFile(path.join(toFolder,fileCode, "index.html"), data, (err, data) => {

                        if (err) return reject(err);
                        
                        resolve();
                    });

                });

                yield new Promise(function(resolve, rejact) {

                    let data = templateXML.replace("kod_s_00", fileCode);
                    
                    fs.writeFile(path.join(toFolder, fileCode,'parameters', 'parameters.xml'), data, (err, data) => {

                        if (err) return reject(err);
                        
                        resolve();
                    });


                });
            }            
        }

        let generator = createGenerator();

        function execute(generator) {

            let next = generator.next();

            if (!next.done) {
                next.value.then(
                    result => {

                        execute(generator);
                    },
                    err => {
                        alert("Erro " + err.message);
                    }
                );

            } else {

                alert("Succes! ")
            }
        }

        execute(generator);
    }
}