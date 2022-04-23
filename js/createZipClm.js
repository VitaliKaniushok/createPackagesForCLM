
function createZipClm(button) {

    $(button).on('click', function() {

        try {

            var folder = $(".active .packageForZip").val(),
                filesHtml = [],
                filesJson = [];

            // Creating temporary tables for comparing the amount of HTML and JSON files & for using this amount in creating archives

            fs.readdirSync(folder).forEach(elem => {

                if (fs.statSync(path.join(folder, elem)).isFile()) {

                    if (path.extname(elem) == ".html") {

                        filesHtml.push(path.basename(elem, ".html"));

                    } else if (path.extname(elem) == ".json") {

                        filesJson.push(path.basename(elem, ".json"));
                    }
                }
            });

            var lHtml = filesHtml.length,
                lJson = filesJson.length;

            if (lHtml !== lJson) {

                throw new Error("Ilośc plików HTML nie jest rowna ilości plików JON !");
            }

            for (let i = 0; i < lHtml; i++) {

                if (filesHtml.indexOf(filesJson[i]) === -1) {

                    throw new Error("Plik " + filesJson[i] + ".json nie ma odpowiedniego pliku .html");

                } else if (filesJson.indexOf(filesHtml[i]) === -1) {

                    throw new Error("Plik " + filesHtml[i] + ".html nie ma odpowiedniego pliku .json");
                }
            }

        } catch (e) {

            alert(e.message);
            return;
        }

        // function return promise which create folder zip with json & html files

        function packingJsonHtml(i, pathNewFile) {

            return new Promise(function(resolve, reject) {

                // console.log('start '+new Date().getMilliseconds());

                let output = fs.createWriteStream(pathNewFile);
                let archive = archiver('zip', {
                    zlib: {
                        level: 9
                    }
                });

                archive.file(path.join(folder, filesHtml[i] + '.html'), {
                    name: (filesHtml[i] + '.html')
                });

                archive.file(path.join(folder, filesHtml[i] + '.json'), {
                    name: (filesHtml[i] + '.json')
                });

                archive.on('warning', function(err) {
                    output.end();
                    alert(err);
                    return reject(err);
                });

                archive.on('error', function(err) {
                    output.end();
                    alert(err);
                    return reject(err);
                });

                archive.on('end', err => {

                    if (err) {
                        output.end();
                        alert(err);
                        return reject(err);
                    }

                    // console.log(archive.pointer() + ' total bytes  ' + i);
                    // console.log("end " + new Date().getMilliseconds());

                    resolve(archive.pointer());
                });

                archive.pipe(output);
                archive.finalize();

            });
        }

        // function return promise which create kode_s_00 zip folder

        function packingFolder(pathNewFolder) {

            return new Promise(function(resolve, reject) {

                // console.log('start ' + new Date().getMilliseconds());

                copydir(path.join(folder), path.join(folder, filesHtml[0]), function(stat, filepath, filename) {

                    if (stat === 'file' && path.parse(filepath).name !== (filesHtml[0])) {

                        return false;
                    }

                    if (stat === 'directory') {
                        return false;
                    }

                    return true;

                }, function(err) {

                    if (err) return reject(err);
                    addFiles()
                });

                function addFiles() {
                    let output = fs.createWriteStream(path.join(pathNewFolder, filesHtml[0] + '.zip'));
                    let archive = archiver('zip', {
                        zlib: {
                            level: 9
                        }
                    });

                    archive.directory((path.join(folder, filesHtml[0])), false)

                    archive.on('warning', function(err) {
                        output.end();
                        return reject(err);
                    });

                    archive.on('error', function(err) {
                        output.end();
                        return reject(err);
                    });

                    archive.on('end', err => {

                        if (err) {
                            output.end();
                            return reject(err);
                        }

                        resolve(archive.pointer());
                    });

                    archive.pipe(output);
                    archive.finalize();
                }

            });
        }

        //  Create string path to archive folder with HTML & JSON files

        var zipFolder = path.join(folder, 'zipArch');

        // function create generator
        function* createGenerator(start, end) {

            try {

                let st = fs.statSync(path.join(folder, filesHtml[0]));

            } catch (err) {

                if (err.code == "ENOENT") {

                    let c = confirm("Nie ma głównego folderu " + filesHtml[0] + ". Kontynuowac archiwowanie?");

                    if (!c) return;
                    if (!fs.existsSync(zipFolder)) {

                        fs.mkdirSync(zipFolder);
                    }

                    for (let i = 0; i < end; i++) {

                        yield packingJsonHtml(i, path.join(zipFolder, filesHtml[i] + '.zip'));
                    }

                    return;

                } else {

                    alert(err);
                    return;
                }
            }

            if (!fs.existsSync(zipFolder)) {

                fs.mkdirSync(zipFolder);
            }

            for (start; start < end; start++) {

                yield packingJsonHtml(start, path.join(zipFolder, filesHtml[start] + '.zip'));
            }

            yield packingFolder(zipFolder);
        }

        let generator = createGenerator(1, lHtml);

        // function iterate & execute in sequence promises from generator
        let byte = 0;

        function execute(generator) {

            let next = generator.next();

            if (!next.done) {
                next.value.then(
                    result => {
                        byte += result;
                        execute(generator);
                    },
                    err => {
                        alert(err.message);
                    }
                );

            } else {

                if (!byte) return;

                byte = (byte / 1024).toFixed();

                alert("Succes! Archive " + byte + "Kb. ")
            }
        }

        execute(generator);
    });
}