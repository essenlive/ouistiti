const path = require('path');
const ref = require('ref');
const gphoto = require('gphoto2_ffi');


// Define variables
let context, camera;

// Define initialise camera
const initCamera = () => {
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
const takePicture = () => {
    console.log('Taking Picture', './');
    let imageName = `test.jpg`;
    let dest_path = path.join('./', imageName);

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

    return dest_path;
};

(async ()=>{

    try {
        // Wait for camera initialisation
        await initCamera();
        console.log('Camera initialized');
        // Take pictures
        let imagePath = takePicture();
        console.log(`----- Taken Picture`, imagePath);
    
    }
    catch (error) { console.log(error); }
})()

