function pushrepo() {
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
                            println("unable to locate function ".fontcolor("#F6D55C") + args[1] + " !".fontcolor("#ED553B"));
                    }
                    break;
                case "remove": {
                        if (!installed.includes(args[1])) {
                            println("unable to locate function ".fontcolor("#F6D55C") + args[1] + " !".fontcolor("#ED553B"));
                        }
                        else if (typeof window["push" + args[1]] === "function") {
                            for (var i = 0; i < installed.length; i++)
                                if (installed[i] == args[1])
                                    installed.splice(i, 1);
                            setCookie("installed", installed, 30);
                            loadCommands();
                            getNewInput();
                        }else
                            println("unable to locate function ".fontcolor("#F6D55C") + args[1] + " !".fontcolor("#ED553B"));
                    }
                    break;
                case "list": {
                    if (args[1])
                        println("too many args".fontcolor("#F6D55C") + "!".fontcolor("#ED553B"));
                    else 
                        println(installed.join(' | '));
                    }
                    break;
                case "count": {
                    if (args[1])
                        println("too many args".fontcolor("#F6D55C") + "!".fontcolor("#ED553B"));
                    else 
                        println("you have installed " + installed.length + " functions.");
                    }
                    break;
                default: println("invalid operation".fontcolor("#F6D55C") + "!".fontcolor("#ED553B"));
            }
        }
    });
}

function pushhelp() {
    commands.push({
        name: "help",
        syntax: "help",
        func: function  (args) {
            createDiv("js".fontcolor("#F6D55C") + "OS".fontcolor("#ED553B") + ", version 0.2-release", "margin-top: 10px");	
            createDiv("/".fontcolor("#F6D55C") + "/".fontcolor("#ED553B") + "These shell functions are defined internally. Type 'help' to see this list.");
            createDiv("\\".fontcolor("#F6D55C") + "\\".fontcolor("#ED553B") + "Type 'repo install/remove function' to manage your functions.");
            createDiv("/".fontcolor("#F6D55C") + "/".fontcolor("#ED553B") + "repo list/count will give information about aviable functions.", "margin-bottom: 10px;");
            getInput();
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
                    println("no spaces allowed".fontcolor("#F6D55C") + "!".fontcolor("#ED553B"));
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
                    println("no spaces allowed".fontcolor("#F6D55C") + "!".fontcolor("#ED553B"));
                else {
                    files.push(args.join());
                    files.sort();
                    setCookie("files", files, 30);
                    getNewInput();
                }   
            }

            else 
                println("name required".fontcolor("#F6D55C") + "!".fontcolor("#ED553B"));
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
                    println("no spaces allowed".fontcolor("#F6D55C") + "!".fontcolor("#ED553B"));

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
                        println("directory does not exist".fontcolor("#F6D55C") + "!".fontcolor("#ED553B"));
                }   
            } 

            else 
                println("name required".fontcolor("#F6D55C") + "!".fontcolor("#ED553B"));
        }
    });
}

function pushlist() {
    commands.push({
        name: "list",
        syntax: "list",
        func: function  (args) {
            createDiv(files.join(" &nbsp;&nbsp;").fontcolor("#F6D55C"));
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
                println("too many args".fontcolor("#F6D55C") + "!".fontcolor("#ED553B"));
            else if (!Number.isInteger(length)) 
                println("NaN".fontcolor("#F6D55C") + "!".fontcolor("#ED553B"));
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
            createDiv("js".fontcolor("#173F5F").fontsize(10) + "OS".fontcolor("#20639B").fontsize(10));
	        createDiv("Copyright (C) literally no one..", "margin-bottom: 10px");
	        getInput();  
        }
    });
}