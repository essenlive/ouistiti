const fs = require('fs')
const gm = require('gm').subClass({ imageMagick: true });

const PrepareImage = {
    transform : (sourcePath ='./files/Lenna.png', destPath='./files/converted.png', square = false)=>{
        console.log(`Preparing image : ${sourcePath}`);    
        return new Promise((resolve,reject)=>{
            if(square){
                gm(sourcePath)
                    .gravity("Center")
                    .resize(null,512)
                    .crop(512, 512)
                    .gravity("North")
                    .extent(512, 550)
                    .monochrome()
                    .rotate(180, 180)
                    .write(destPath, (error) => {
                        if (error) reject(error);
                        console.log(`Prepared image : ${destPath}`);
                        resolve(destPath);
                    });
            }
            else {
                gm(sourcePath)
                    .gravity("Center")
                    .resize(512)
                    .monochrome()
                    .rotate(180, 180)
                    .write(destPath, (error) => {
                        if (error) reject(error);
                        console.log(`Prepared image : ${destPath}`);
                        resolve(destPath);
                    });
            }
        })
    },
    merge : (imagesPaths, destPath)=>{ 
        console.log(`Merging images`);
        return new Promise((resolve, reject) => {
            gm(imagesPaths[0])
                .append(imagesPaths.splice(1))
                .write(destPath, (error) => {
                    if (error) reject(error);
                    console.log(`Merged image : ${destPath}`);
                    resolve(destPath);
                });
        })        
    }
}

module.exports = PrepareImage;

    
