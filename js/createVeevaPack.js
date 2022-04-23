
function createVeevaPack(button) {

    var numb = "",
        code = "",
        html = "";
    directory = "",
        name = "",
        isError = false;
    var kMessages = [];

    $(button).on("click", function() {

        // validate directory prezentetion

        directory = $(".active .nameDir").val();

        if (directory === "") {

            isError = true;
            $(".active .nameDir").addClass("errors").val("Podaj ścieżkę");

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

        // validate template structure of prezentation

        template = $(".active .template").val();

        if (template === "") {

            isError = true;
            $(".active .template").addClass("errors").val(template);

        } else {

            $(".active .template").removeClass("errors");
        }

        // validate naming KM

        nameKM = $(".active .nameKM");

        for (let i = nameKM.length - 1; i >= 0; i--) {

            kMessages[i] = nameKM[i].value;

            if (kMessages[i].match(/((^[^a-z]))|([^a-z0-9_])/i)) {

                name = "nie poprawna nazwa";

                isError = true;
                $(nameKM[i]).addClass("errors").val(name);
            } else {

                $(nameKM[i]).removeClass("errors");
            }
        }

        // validate all errors

        if (isError) {

            return isError = false;

        } else {

            createVeevaPackage(template, path.join(directory, name));
        }

    });


    //  function create KM

    function createVeevaPackage(templateFolder, toFolder) {

        try {
            fs.mkdirSync(toFolder);
        } catch (err) {
            alert(err);
            return;
        }      

        function* createGenerator() {


            if ( $('.isShared').prop('checked') ) {

                yield new Promise(function(resolve, reject) {

                    copydir(path.join(templateFolder,'shared'), path.join(toFolder, 'shared'), () => {

                        return true;

                    }, (err) => {

                        if (err) {
                            
                            return reject(err);
                        } else {

                            templateFolder = path.join(templateFolder,'template_KM');
                            return resolve();
                        }
                    });

                });
            }

            for (let i = kMessages.length - 1; i >= 0; i--) {

                yield new Promise(function(resolve, reject) {

                    copydir(templateFolder, path.join(toFolder, kMessages[i]), () => {

                        return true;

                    }, (err) => {

                        if (err) {
                            
                            return reject(err);
                        } else {
                            resolve();
                        }
                    });

                });

                yield new Promise(function(resolve, reject) {

                    fs.rename(path.join(toFolder, kMessages[i], 'veeva-thumb.jpg'), path.join(toFolder, kMessages[i], kMessages[i] + '-thumb.jpg'), (err) => {

                        if (err) {
                            
                            return reject(err);
                        } else {
                            resolve();
                        }
                    });

                });

                yield new Promise(function(resolve, reject) {

                    fs.rename(path.join(toFolder, kMessages[i], 'veeva-full.jpg'), path.join(toFolder, kMessages[i], kMessages[i] + '-full.jpg'), (err) => {

                        if (err) {
                            
                            return reject(err);
                        } else {
                            resolve();
                        }
                    });

                });

                yield new Promise(function(resolve, reject) {

                    fs.rename(path.join(toFolder, kMessages[i], 'veeva.html'), path.join(toFolder, kMessages[i], kMessages[i] + '.html'), (err) => {

                        if (err) {
                            
                            return reject(err);
                        } else {
                            resolve();
                        }
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
                        alert("Wystąpił błąd: " + err.message);
                    }
                );

            } else {

                alert("Paczka gotowa")
            }
        }

        execute(generator);
    }
}