const path = require('path');
const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');



// Define Board
const board = new five.Board({
    io: new Raspi(),
    repl: false
});


// Set up board
board.on('ready', async () => {

    // Create a new `button` hardware instance.
    var button = new five.Button({
        pin: 29,
        isPullup: true
    });

    var relay = new five.Relay(28);

    // On button press
    button.on("release", () => {
        console.log("switch");
        relay.toggle()
    });

});
