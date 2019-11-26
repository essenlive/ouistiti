const { Board, Led } = require("johnny-five");
const board = new Board({
    repl: false
 });

// Set up board and wait for it to be ready
board.on('ready', async () => {
    console.log("Ready!");
    const led = new Led(13);
    led.blink(500);
});