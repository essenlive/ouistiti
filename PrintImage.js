const escpos = require('escpos');


const load = (imagePath)=>{

    return new Promise((resolve, reject) => {

        escpos.Image.load(imagePath, (image) => {

            if (typeof image.data !== 'undefined') resolve(image);

            else{reject(image)};

        })

    })

}



const print = async(image) => {


    const device = await escpos.USB.getDevice();

    const printer = await escpos.Printer.create(device);

    printer

        .align('ct')

        .raster(image)

        .feed(2)

        .cut()

        .close();

}



const PrintImage = async(imagePath)=>{

    try {

        console.log('Try Printing');

        const loadedImage = await load(imagePath);

        await print(loadedImage)

        

    } catch (error) {

        console.log('Error while printing :', error);

        return

    }

}


module.exports = PrintImage;
