//vars
let userName = "thief";
let inputHistory = [];
let inputHistoryCursor = inputHistory.length;
let fs;
let wd;
let appManager;

//boot
async function boot() {
    await initFilesystem(); // load the filesystem
    await initInputManager(); //load the input manager
    await initAppManager(); //load the app manager
    setup();
    await functionLoaderInit();
    // await run();

    // create a new Session
    const {Terminal} = await import('./terminal.js');
    new Terminal();
}

/**
 * Loads the filesystem
 * @returns {Promise<void>}
 */
async function initFilesystem() {
    const {FileSystem, WorkingDirectory} = await import('./filesystem/FileSystem.js');
    fs = new FileSystem();
    wd = new WorkingDirectory();
    window.fs = fs;
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
 */
async function initAppManager() {
    const {AppManager} = await import('./appManager.js');
    appManager = new AppManager();
    await appManager.load();
}

function setup() {
    if (localStorage.getItem("userName")) userName = localStorage.getItem("userName");

    if (localStorage.getItem("inputHistory")) inputHistory = localStorage.getItem("inputHistory").split(",");
    inputHistoryCursor = inputHistory.length;
}

//dialog
function next(returnValue) {
    if (returnValue) {
        push(returnValue);
        pushBr();
    }
    run();
}

function say(message) {
    push(message);
    pushBr();
}

function ask(message) {
    push(message)
    return pull();
}

//core
function push(value) {
    let div = document.createElement("div");
    div.innerHTML = value;
    div.setAttribute("class", "line");
    document.body.appendChild(div);
}

function pull() {
    if (document.getElementById("input")) {
        let lastInput = document.getElementById("input");
        lastInput.setAttribute("contenteditable", "false");
        lastInput.setAttribute("id", "inputKilled");
    }
    let div = document.createElement("div");
    div.innerHTML = "";
    div.setAttribute("class", "input");
    div.setAttribute("id", "input");
    div.setAttribute("spellcheck", "false");
    div.setAttribute("contenteditable", "true");
    div.setAttribute("autofocus", "");

    document.body.appendChild(div);

    setTimeout(function () {
        div.focus();
    }, 0);

    document.execCommand('defaultParagraphSeparator', false, 'p');

    return new Promise((resolve) => {
        div.addEventListener("keydown", function (e) {
            if (e.keyCode === 13) {
                e.preventDefault(); //prevents <br>'s, and <p>'s in input soup
                let replacedInnerHTML = div.innerHTML.replace(/<br>/g, "").replace(/&nbsp;/g, "")
                resolve(replacedInnerHTML);
                if (replacedInnerHTML !== "" && replacedInnerHTML !== inputHistory[inputHistory.length - 1]) {
                    inputHistory.push(replacedInnerHTML);
                    localStorage.setItem("inputHistory", inputHistory);
                }
                inputHistoryCursor = inputHistory.length;
            }
            if (e.keyCode === 38 && inputHistory[inputHistoryCursor - 1] !== undefined) {
                inputHistoryCursor--;
                div.innerHTML = inputHistory[inputHistoryCursor];
            }

            if (e.keyCode === 40 && inputHistory[inputHistoryCursor + 1] !== undefined) {
                inputHistoryCursor++;
                div.innerHTML = inputHistory[inputHistoryCursor];
            }
        });
    });

}

function pushBr() {
    document.body.appendChild(document.createElement("br"));
}

async function run() {
    let currentPath = wd.getCurrent().name;
    if (currentPath === "home")
        currentPath = "~";
    let input = await ask(userName + " " + currentPath + ' ');

    if (input === "") {
        document.getElementById("input").innerHTML = "";
        pushBr();
        await run()
        return;
    }
    functionLoader.run(input);
}

let functionLoader;

/**
 * loads the functionLoader.js file and sets the functions
 * @returns {Promise}
 */
function functionLoaderInit() {
    return new Promise(async (resolve, reject) => {
        import('./functionLoader.js').then((module) => {
            functionLoader = module.default;

            // custom functions
            functionLoader.fs = fs;
            functionLoader.wd = wd;
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
}



