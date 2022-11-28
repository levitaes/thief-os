//vars
let user = "thief";

//boot
function boot() {
    run();
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
                resolve(div.innerHTML.replace(/<br>/g, "").replace(/&nbsp;/g, ""));
            }
        });
    });

}

function pushBr() {
    document.body.appendChild(document.createElement("br"));
}

async function run() {
    let input = await ask(user + " ~");

    if (input === "") {
        document.getElementById("input").innerHTML = "";
        pushBr();
        await run()
        return;
    }
    functionLoader.run(input);
}

let functionLoader;
function functionLoaderInit() {
    return new Promise(async (resolve, reject) => {
        import('./functionLoader.js').then((module) => {
            functionLoader = module.default;
            functionLoader.say = say;
            functionLoader.ask = ask;
            functionLoader.next = next;
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
}
functionLoaderInit();



