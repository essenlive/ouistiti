const PrepareImage = require('../PrepareImage.js')
(async () => {
        await PrepareImage.transform(`./lena.png`, `./lena-converted.png`)
        console.log('Logo transformed');
})()