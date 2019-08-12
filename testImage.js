const fs = require('fs')
const gm = require('gm').subClass({ imageMagick: true });

const prepareImage = {
    transform : (sourcePath ='./files/Lenna.png', destPath='./files/converted.png')=>{
        console.log(`Preparing image : ${sourcePath}`);    
        return new Promise((resolve,reject)=>{
            gm(sourcePath)
            .resize(512)
            .monochrome()
            .rotate(180, 180)
            .write(destPath, (error) => {
                if (error) reject(error);
                console.log(`Prepared image : ${destPath}`);
                resolve(destPath);
            });  
        })
    },
    merge : ()=>{
        console.log('merge');
        
    }
}

module.exports = prepareImage;

    
