const escpos = require('escpos');

const device = new escpos.USB();
const printer = new escpos.Printer(device);

escpos.Image.load('./files/test-monochrome.png', function (image) {

    device.open(function () {

        printer
            .align('ct')
            .raster(image)

            .cut()
            .close();

    });

});