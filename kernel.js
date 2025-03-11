//vars
let userName = "user";
let inputHistory = [];
let inputHistoryCursor = inputHistory.length;
let wd;
let appManager;
let functionLoader;

//boot
async function boot() {
    await initFilesystem(); // load the filesystem
    await initInputManager(); //load the input manager
    await initAppManager(); //load the app manager
    await initDialog(); //load the dialog
    setup();
    await functionLoaderInit();

    // create a new Session
    await initTerminal();
}

/**
 * Loads the filesystem
 * @returns {Promise<void>}
 */
async function initFilesystem() {
    const {FileSystem, WorkingDirectory} = await import('./filesystem/FileSystem.js');
    new FileSystem();
    wd = new WorkingDirectory();
}

/**
 * Loads the InputManager
 * @returns {Promise<void>}
 */
async function initInputManager() {
    const {InputManager} = await import('./inputManager.js');
    new InputManager();
}

/**
 * Loads the AppManager and install the apps
 * @returns {Promise<void>}
 */
async function initAppManager() {
    const {AppManager} = await import('./appManager.js');
    appManager = new AppManager();
    await appManager.load();
}

async function initDialog() {
    const {Dialog} = await import('./utils/dialog.js');
    Dialog.globalInstance = new Dialog();
}

/**
 * Loads the terminal
 * @returns {Promise<void>}
 */
async function initTerminal() {
    const {Terminal} = await import('./terminal.js');
    const terminal = new Terminal();
    terminal.div = document.getElementById("lines");
    terminal.wd = wd;
    terminal.init();
}

function setup() {
    if (localStorage.getItem("userName")) userName = localStorage.getItem("userName");

    if (localStorage.getItem("inputHistory")) inputHistory = localStorage.getItem("inputHistory").split(",");
    inputHistoryCursor = inputHistory.length;
}


/**
 * loads the functionLoader.js file and sets the functions
 * @returns {Promise}
 */
function functionLoaderInit() {
    return new Promise(async (resolve, reject) => {
        import('./functionLoader.js').then((module) => {
            functionLoader = module.default;

            // custom functions
            functionLoader.wd = wd;
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
}



