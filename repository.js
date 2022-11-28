/*function pushrepo() {
    commands.push({
        name: "repo",
        syntax: "repo <String>",
        func: function  (args) {
            switch (args[0]) {
                case "install": {
                        if (installed.includes(args[1])) {
                            console.log("!allready installed!");
                            getNewInput();
                        }
                        else if (typeof window["push" + args[1]] === "function") {
                            installed.push(args[1]);
                            setCookie("installed", installed, 30);
                            loadCommands();
                            getNewInput();
                        }else
                            println("unable to locate function ".fontcolor(style.getPropertyValue('--color-4')) + args[1] + "!".fontcolor(style.getPropertyValue('--color-5')));
                    }
                    break;
                case "remove": {
                        if (!installed.includes(args[1])) {
                            println("unable to locate function ".fontcolor(style.getPropertyValue('--color-4')) + args[1] + "!".fontcolor(style.getPropertyValue('--color-5')));
                        }
                        else if (typeof window["push" + args[1]] === "function") {
                            for (var i = 0; i < installed.length; i++)
                                if (installed[i] == args[1])
                                    installed.splice(i, 1);
                            setCookie("installed", installed, 30);
                            loadCommands();
                            getNewInput();
                        }else
                            println("unable to locate function ".fontcolor(style.getPropertyValue('--color-4')) + args[1] + "!".fontcolor(style.getPropertyValue('--color-5')));
                    }
                    break;
                case "list": {
                    if (args[1])
                        println("too many args".fontcolor(style.getPropertyValue('--color-4')) + "!".fontcolor(style.getPropertyValue('--color-5')));
                    else 
                        println(installed.join(' | '));
                    }
                    break;
                case "count": {
                    if (args[1])
                        println("too many args".fontcolor(style.getPropertyValue('--color-4')) + "!".fontcolor(style.getPropertyValue('--color-5')));
                    else 
                        println("you have installed " + installed.length + " functions.");
                    }
                    break;
                default: println("invalid operation".fontcolor(style.getPropertyValue('--color-4')) + "!".fontcolor(style.getPropertyValue('--color-5')));
            }
        }
    });
}

function pushhelp() {
    commands.push({
        name: "help",
        syntax: "help",
        func: function  (args) {
            createDiv("OS".fontcolor(style.getPropertyValue('--color-4')) + ".js".fontcolor(style.getPropertyValue('--color-5')) + ", version 0.2-release", "margin-top: 10px;");	
            createDiv("/".fontcolor(style.getPropertyValue('--color-4')) + "/".fontcolor(style.getPropertyValue('--color-5')) + "These shell functions are defined internally. Type 'help' to see this list.", "margin-left: 10px");
            createDiv("\\".fontcolor(style.getPropertyValue('--color-4')) + "\\".fontcolor(style.getPropertyValue('--color-5')) + "Type 'repo install/remove function' to manage your functions.", "margin-left: 10px");
            createDiv("/".fontcolor(style.getPropertyValue('--color-4')) + "/".fontcolor(style.getPropertyValue('--color-5')) + "repo list/count will give information about aviable functions.", "margin-bottom: 10px; margin-left: 10px");
            getNewInput();
        }
    });
}

function pushclear() {
    commands.push({
        name: "clear",
        syntax: "clear",
        func: function  (args) {
            $(".classToRemove").remove();
            getInput();
        }
    });
}

function pushtime() {
    commands.push({
        name: "time",
        syntax: "time",
        func: function  (args) {
            println(new Date);
        }
    });
}

function pushprint() {
    commands.push({
        name: "print",
        syntax: "print <String>",
        func: function  (args) {
            println(args.join(" "));
        }
    });
}

function pushuname() {
    commands.push({
        name: "uname",
        syntax: "uname <String>",
        func: function  (args) {
            if (args.join()) {
                if (args[1])
                    println("no spaces allowed".fontcolor(style.getPropertyValue('--color-4')) + "!".fontcolor(style.getPropertyValue('--color-5')));
                else {
                    user = args.join();
                    setCookie("user", user, 30);
                    getNewInput();
                }   
            } else 
                println(user);
        }
    });
}

function pushmkdir() {
    commands.push({
        name: "mkdir",
        syntax: "mkdir <String>",
        func: function  (args) {
            if (args.join()) {
                if (args[1])
                    println("no spaces allowed".fontcolor(style.getPropertyValue('--color-4')) + "!".fontcolor(style.getPropertyValue('--color-5')));
                else {
                    files.push(args.join());
                    files.sort();
                    setCookie("files", files, 30);
                    getNewInput();
                }   
            }

            else 
                println("name required".fontcolor(style.getPropertyValue('--color-4')) + "!".fontcolor(style.getPropertyValue('--color-5')));
        }
    });
}

function pushrmdir() {
    commands.push({
        name: "rmdir",
        syntax: "rmdir <String>",
        func: function  (args) {
            if (args.join()) {
                if (args[1])
                    println("no spaces allowed".fontcolor(style.getPropertyValue('--color-4')) + "!".fontcolor(style.getPropertyValue('--color-5')));

                else {
                    var index = files.indexOf(args.join());
                    console.log(index);
                    if (index > -1) {
                        files.splice(index, 1);
                        files.sort();
                        setCookie("files", files, 30);

                        getNewInput();
                    } 

                    else
                        println("directory does not exist".fontcolor(style.getPropertyValue('--color-4')) + "!".fontcolor(style.getPropertyValue('--color-5')));
                }   
            } 

            else 
                println("name required".fontcolor(style.getPropertyValue('--color-4')) + "!".fontcolor(style.getPropertyValue('--color-5')));
        }
    });
}

function pushlist() {
    commands.push({
        name: "list",
        syntax: "list",
        func: function  (args) {
            createDiv(files.join(" &nbsp;&nbsp;").fontcolor(style.getPropertyValue('--color-4')));
            getNewInput();    
        }
    });
}

function pushreset() {
    commands.push({
        name: "reset",
        syntax: "reset",
        func: function  (args) {
            clearCookies();
            location.reload();   
        }
    });
}

function pushmorsa() {
	commands.push({
		name: "morsa",
		syntax: "morsa",
		func: function (args) {
			var morse = [
				["a",".-"],["b","-..."],["c","-.-."],["d","-.."],
				["e","."],["f","..-."],["g","--."],["h","...."],
				["i",".."],["j",".---"],["k","-.-"],["l",".-.."],
				["m","--"],["n","-."],["o","---"],["p",".--."],
				["q","--.-"],["r",".-."],["s","..."],["t","-"],
				["u","..-"],["v","...-"],["w",".--"],["x","-..-"],
				["y","-.--"],["z","--.."],
			];
			if (typeof(args) === "string"){
				if (args == morse[temp][0])
					println("correct!");
				else 
					println("the correct answer would be '" + morse[temp][0] + "'!");
			}
			else {
				temp = (Math.floor(Math.random() * morse.length));			
				println(morse[temp][1],"",1);				
			}				
		}
	});
}

function pushngen() {
    commands.push({
        name: "ngen",
        syntax: "ngen <int>",
        func: function  (args) {
            var vowel = 
            ['a','e','i','o','u'];
            var conso = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','x','z','w','y'];

            var length = parseInt(args[0], 10);
            if(args[1])
                println("too many args".fontcolor(style.getPropertyValue('--color-4')) + "!".fontcolor(style.getPropertyValue('--color-5')));
            else if (!Number.isInteger(length)) 
                println("NaN".fontcolor(style.getPropertyValue('--color-4')) + "!".fontcolor(style.getPropertyValue('--color-5')));
            else {
                var name = [];              
                switch(Math.floor(Math.random() * 2)) {
                    case 0:
                        var lastWas = 'conso';
                        for(var c = 0; c < length; c++) {
                            if(lastWas == 'conso') {
                                name[c] = vowel[Math.floor(Math.random() * vowel.length)];
                                lastWas = 'vowel';
                            }else{
                                name[c] = conso[Math.floor(Math.random() * conso.length)];
                                lastWas = 'conso';
                            }
                        }
                        break;
                    case 1:
                        var lastWas = 'vowel';
                        for(var c = 0; c < length; c++) {
                            if(lastWas == 'vowel') {
                                name[c] = conso[Math.floor(Math.random() * conso.length)];
                                lastWas = 'conso';
                            }else{
                                name[c] = vowel[Math.floor(Math.random() * vowel.length)];
                                lastWas = 'vowel';
                            }
                        }
                        break;
                    default:
                        console.log('error: ngen random');
                }
                println(name.join(""));
            } 
        }
    });
}

function pushfetch() {
    commands.push({
        name: "fetch",
        syntax: "fetch",
        func: function  (args) {
            createDiv("OS".fontcolor(style.getPropertyValue('--color-1')).fontsize(10) + ".js".fontcolor(style.getPropertyValue('--color-2')).fontsize(10));
	        createDiv("Copyright (C) literally no one..", "margin-bottom: 10px");
	        getNewInput();  
        }
    });
}

function pushcalc() {
    commands.push({
        name: "calc",
        syntax: "calc <String>",
        func: function  (args) {
            try {
                println(eval(args.join(" ")));
            }
            catch(err) {
                //println(err);
                println("invalid operation".fontcolor(style.getPropertyValue('--color-4')) + "!".fontcolor(style.getPropertyValue('--color-5')));
            }
        }
    });
}

function pushtweak() {
    commands.push({
        name: "tweak",
        syntax: "tweak <String>",
        func: function  (args) {
            if (args.join()) {
                if (args[1])
                    println("no spaces allowed".fontcolor(style.getPropertyValue('--color-4')) + "!".fontcolor(style.getPropertyValue('--color-5')));
                else {
                    if (args.join() == "dark" || args.join() == "light") {
                        theme = args.join();
                        setCookie("theme", theme, 30);
                        location.reload();                        
                    } else {
                        println("unable to locate theme ".fontcolor(style.getPropertyValue('--color-4')) + args.join() + "!".fontcolor(style.getPropertyValue('--color-5')));
                    }                        
                }   
            } else 
                println(theme);
        }
    });
}*/
