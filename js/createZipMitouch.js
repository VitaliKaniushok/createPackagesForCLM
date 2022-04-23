
function createZipMiTouch(button) {

    $(button).on('click', function() {

        var folder = $(".active .packageForZip").val();
      
        // function create generator
        function* createGenerator() {

            let countDirs;

            yield new Promise(function(resolve, reject) {

                fs.readdir(path.join(folder), (err, dirs) => {

                    if (err) {

                        reject(err);
                        return;

                    } else {

                        resolve(0);
                        return countDirs = dirs;
                    }
                });

            });

            for (let i = countDirs.length - 1; i >= 0; i--) {

                yield new Promise(function(resolve, reject) {

                    let output = fs.createWriteStream(path.join(folder,countDirs[i]+'.zip'));
                    let archive = archiver('zip', {
                        zlib: {
                            level: 9
                        }
                    });                    

                    archive.directory(path.join(folder,countDirs[i]),false );

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
                        }else{
                            
                             resolve(archive.pointer());
                        }
                       
                    });

                    archive.pipe(output);
                    archive.finalize();
                });
            }
        }

        let generator = createGenerator();

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