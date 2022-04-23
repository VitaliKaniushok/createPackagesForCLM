
function createClmPack(button) {

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

        copydir.sync(templateFolder, toFolder, function(stat, filepath, filename) {

            if (stat == 'file' && (path.extname(filepath) === '.html' || path.extname(filepath) === '.json')) {
                return false;
            }

            return true;
        });

        fs.renameSync(path.join(directory, name, "kod_s_00"), path.join(directory, name, code + "_s_00"));

        //  create new HTML-files & write Id

        function* createGenerator() {

            let templateFiles;

            yield new Promise(function(resolve, reject) {


                fs.readFile(path.join(templateFolder, "kod_s_00.html"), {
                    encoding: "utf8"
                }, (err, data) => {

                    if (err) return reject(err);

                    let str = data.match(/kod_s_00/);
                    let str2 = data.match(/wrapper_kod/);

                    if (str && str2) {

                        data = data.replace(str2, "wrapper_" + code);
                        templateFiles = data;
                        resolve();

                    } else {

                        alert("Sprawdz pooprawnosc wpisu id='kod_s_00' i class='wrapper_kod' w templatce kod_s_00.html!");
                        return;
                    }

                });
            });
            
            for (let i = 0; i < quantity; i++) {

                yield new Promise(function(resolve, reject) {

                    let s = (i < 10) ? ("0" + i) : i;

                    fileCode = code + "_s_" + s;
                    

                    let data = templateFiles.replace("kod_s_00", fileCode);

                    fs.writeFile(path.join(toFolder, fileCode + ".html"), data, (err, data) => {

                        if (err){

                            reject(err);
                            return;
                        }
                        resolve();
                    });

                    let jsonf1 = fs.createReadStream(path.join(templateFolder, "kod_s_00.json"), { encoding: "utf8" });
                    let jsonf2 = fs.createWriteStream(path.join(toFolder, fileCode + ".json"));

                    jsonf1.pipe(jsonf2);

                    jsonf1.on('error', (err) => {
                        reject(err);
                    });

                    jsonf2.on('error', (err) => {
                        reject(err);
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
                        return;
                    }
                );

            } else {

                alert("Succes! ")
            }
        }

        execute(generator);
    }
}