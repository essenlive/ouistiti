const fs = require('fs')
const gm = require('gm').subClass({ imageMagick: true });

gm('./files/test.png')
    .resize(512)
    .monochrome()
    .rotate(180,180)
    .write('./files/test-monochrome.png',  (err)=>{
        if (!err) console.log('done');
    });
