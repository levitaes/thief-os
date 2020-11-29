//vars
var user = "usr";
var files = ['.themes', '.config'];
var installed = ['help', 'repo', 'clear', 'time', 'print', 'uname', 'mkdir', 'rmdir', 'list', 'reset'];
var commands = []
var temp;

//boot
function boot() {
    if (getCookie("user") != "")
        user = getCookie("user");

    if (getCookie("files") != "")
        files = getCookie("files").split(",");
        files.sort();

    if (getCookie("installed") != "")
        installed = getCookie("installed").split(",");
    
    loadCommands();
    
	getInput();
}

//input
function getInput(loop) {
	
    createDiv(user.fontcolor("#173F5F") + "@".fontcolor("#20639B") + "terminal:".fontcolor("#3CAEA3") + "~".fontcolor("#F6D55C") + "$".fontcolor("#ED553B"),"float:left; margin-right:10px;")

    var divInput = document.createElement("div");
    divInput.innerHTML = "";
    divInput.setAttribute("contenteditable","true");
    divInput.setAttribute("class","input classToRemove");
    divInput.setAttribute("id","inputID")
    divInput.setAttribute("autofocus","");
    divInput.setAttribute("spellcheck","false");
    document.body.appendChild(divInput);
    
    setTimeout(function() {
        divInput.focus();
    }, 0); 

    document.execCommand('defaultParagraphSeparator', false, 'p');
		
	divInput.addEventListener("keydown", function (e) {
		if (e.keyCode === 13) {
			e.preventDefault(); //prevents <br>'s, and <p>'s in input soup
			
			if (!loop == 1)
            	execute(divInput.innerHTML);
            else {
            	const command = commands.find(cmd => cmd.name == "morsa");
            	command.func(divInput.innerHTML);
            }
		}
	});
}

function getNewInput(loop) {
    var oldInputDiv = document.getElementById("inputID");
    oldInputDiv.setAttribute("contenteditable","false");
    oldInputDiv.setAttribute("id","inputKilled");

    getInput(loop);
}

//core
function reFocus() {
    var divInput = document.getElementById("inputID");
	divInput.focus();
}

function createDiv(value,style,id) {
    var divToCreate = document.createElement("div");
    divToCreate.setAttribute("class","classToRemove");
    divToCreate.innerHTML = value;
    divToCreate.setAttribute("style",style);
    divToCreate.setAttribute("id",id);
    document.body.appendChild(divToCreate);
}

function execute(input) {
    var inputSplit = input.replace(/<br>/g,"").replace(/&nbsp;/g,"").split(" ");

    const command = commands.find(cmd => cmd.name == inputSplit[0])
    if (inputSplit[0] == "")
        println("<br>");    
    else if (command !== undefined) 
        command.func(inputSplit.slice(1));
    else 
        println(inputSplit[0].fontcolor("#F6D55C") + ": command not found".fontcolor("#ED553B"));    
}

function println(value, style, loop) {
	createDiv(value, style);
	
	getNewInput(loop);
} 

function loadCommands() {
    commands = [];
    for(var i = 0; i < installed.length; i++) {
        var iString = installed[i];
        var toPush = window["push" + iString];
        if (typeof toPush === "function") toPush();
    } 
}

//cookie
function setCookie(name, value, days) {
    var day = new Date();
    day.setTime(day.getTime() + (days*24*60*60*1000));
    var expires = "expires="+ day.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    var _name = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(_name) == 0) {
        return c.substring(_name.length, c.length);
      }
    }
    return "";
}

function clearCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        setCookie(cookies[i].split("=")[0],"",-1);
    }
}










