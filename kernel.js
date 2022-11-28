//vars
let user = "thief";

//boot
function boot() {
	getInput();
}

//input
function getInput(returnValue) {
    if (returnValue) {
        pushOut(returnValue);
        document.body.appendChild(document.createElement("br"));
    }
    pushOut(user + " ~");
    pushOut("input")
}

//core
function pushOut(value) {
    if (document.getElementById("input")) {
        let lastInput = document.getElementById("input");
        lastInput.setAttribute("contenteditable","false");
        lastInput.setAttribute("id","inputKilled");
    }

    let lineToAppend = document.createElement("div");
    lineToAppend.innerHTML = value;
    lineToAppend.setAttribute("class","line");
    if (value === "input") {
        lineToAppend.innerHTML = "";
        lineToAppend.setAttribute("class", "input");
        lineToAppend.setAttribute("id","input");
        lineToAppend.setAttribute("spellcheck","false");
        lineToAppend.setAttribute("contenteditable", "true");
        lineToAppend.setAttribute("autofocus", "");
    }
    document.body.appendChild(lineToAppend);

    if (value === "input") {
        setTimeout(function() {
            lineToAppend.focus();
        }, 0);

        document.execCommand('defaultParagraphSeparator', false, 'p');

        lineToAppend.addEventListener("keydown", function (e) {
            if (e.keyCode === 13) {
                e.preventDefault(); //prevents <br>'s, and <p>'s in input soup
                run(lineToAppend.innerHTML.replace(/<br>/g, "").replace(/&nbsp;/g,""));//.replace(/<br>/g,"").replace(/&nbsp;/g,"").split(" ")
            }
        });
    }
}

function run(input) {
    console.log(input);
    switch (input) {
        case "":
            document.getElementById("input").innerHTML = "";
            getInput(" ");
            return;
        case "command":
            getInput("doing command stuff");
            return;
        default:
            getInput("command '" + input + "' not found");
            return;
    }
}











