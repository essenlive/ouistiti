const path = require('path');
const ref = require('ref');
const fs = require('fs');
const gphoto = require('./node_modules/gphoto2_ffi/index.js');
const gphoto_get_config = require("./node_modules/gphoto2_ffi/get_config");
const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');
const sleep = require('util').promisify(setTimeout)


// Try loading local config from config.json or load defaults
let config = {
    "destination": "Session1",// Name of the folder in files
    "fileName": "__", // Prefix for the picture names
    "delay": 5000 // Delay between trigger and picture
};
try {
    console.log('Loaded config file');
    config = require('./config.json');
} catch (e) { console.log(e); }


// Define variables
const destination = `./files/${config.destination}/`;
if (!fs.existsSync(destination)) fs.mkdirSync(destination);
const fileName = config.fileName;
const delay = config.delay;
const fileExtension = '.jpg';

let configured = false, test = false;
let context, camera;
let images = [];
let imageIndex = 0;


// Define Board
const board = new five.Board({
    io: new Raspi(),
    repl: false
});

// Define initialise camera
const initCamera = ()=>{
    console.log('Initializing camera');
    return new Promise((resolve, reject) => {
        try {
            context = gphoto.gp_context_new();
            camera = gphoto.NewInitCamera(context);
            resolve(true);
        } catch (e) {
            reject('Camera not connected');
        }
    });
};

// Define take picture
const takePicture = ()=>{
    console.log('Taking Picture', destination);
    let imageName = fileName + Date.now() + fileExtension;
    let dest_path = path.join(destination, imageName);
    
    let pathPtr = ref.alloc(gphoto.CameraFilePath);
    
    let res = gphoto.gp_camera_capture(camera, gphoto.GP_CAPTURE_IMAGE, pathPtr, context);
    if (res < 0) {
        console.log("Could not capture image:\n" + gphoto.gp_port_result_as_string(res));
        return (-1);
    }
    
    var path_folder = pathPtr.deref().folder.buffer.readCString(0);
    var path_name = pathPtr.deref().name.buffer.readCString(0);
    console.log("Photo temporarily saved in " + path_folder + path_name);
    
    var destPtr = ref.alloc(gphoto.CameraFile);
    if (gphoto.gp_file_new(destPtr) < 0)
    return -1;
    var dest = destPtr.deref();
    
    res = gphoto.gp_camera_file_get(camera, path_folder, path_name,
        gphoto.GP_FILE_TYPE_NORMAL, dest, context);
        if (res < 0) {
            console.log("Could not load image:\n" +
            gphoto.gp_port_result_as_string(res));
            return (-1);
        }
        
        res = gphoto.gp_file_save(dest, dest_path);
        if (res < 0) {
            console.log("Could not save image in " + dest_path + ":\n" +
            gphoto.gp_port_result_as_string(res));
            return (-1);
        }
        console.log("Image saved in " + dest_path);
        gphoto.gp_file_unref(dest);
        
        images.push(imageName);
        return 0;
};
    
//Define print picture
const printPicture = async()=>{
    await printer.printImage('./assets/olaii-logo-black.png')
}
    
// Set up board and wait for it to be ready
board.on('ready', async () => {
    
    // Create a new button hardware instance. -> The Trigger
    let button = new five.Button({
        pin: 29,
        isPullup: true
    });
    
    // Create relay hardware instance. -> The Flash
    let relay = new five.Relay(28);
    
    // Wait for camera initialisation
    try {
        configured = await initCamera();
        console.log(configured ? 'Camera initialized' : "Error in configuration");
        relay.open();
    }
    catch (e) { console.log(e); }
    
    // On button press -> Take Picture and print
    button.on("release", ()=>{
        console.log("Trigger pressed");
        
        // Check if camera is initialized and not artifact from test
        if (test || !configured) return
        
        // Shut down flash
        console.log("Shutting Flash"); 
        relay.close();

        // Wait for delay
        console.log(`Waiting ${delay}ms`); 
        await sleep(delay)

        // Turn on flash
        console.log("Turn on Flash"); 
        relay.open();

        // Take picture
        console.log("Take Picture");        
        takePicture();
        
    });
    
    // On Button hold -> Check states
    button.on("hold", ()=>{
        console.log("Test for connection");
        test = true;
    });
    
});