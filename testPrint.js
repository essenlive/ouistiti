const escpos = require('escpos');

const loadImage = (imagePath)=>{
    return new Promise((resolve, reject) => {
        escpos.Image.load(imagePath, (image) => {
            if (typeof image.data !== 'undefined') resolve(image);
            else{reject(image)};
        })
    })
}


const printImage = async(image) => {

    const device = await escpos.USB.getDevice();
    const printer = await escpos.Printer.create(device);
    printer
        .align('ct')
        .raster(image)
        .feed(2)
        .cut()
        .close();
}


const thermalPrintImage = async(imagePath)=>{
    try {
        console.log('Try Printing');
        const loadedImage = await loadImage(imagePath);
        await printImage(loadedImage)
        
    } catch (error) {
        console.log('Error while printing :', error);
        return
    }
}

module.exports = thermalPrintImage;

// (async () => {
//     try {
//         await thermalPrintImage("./files/converted-logo.png");
//         console.log("DONE : ");

//     } catch (error) {
//         console.log(error);

//     }
// })()