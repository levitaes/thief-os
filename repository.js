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
            createDiv("re".fontcolor("#173F5F") + "Terminal".fontcolor("#20639B") + ", version 0.2-release", "margin-top: 10px");	
            createDiv("These shell commands are defined internally. Type 'help' to see this list.");
            createDiv("/".fontcolor("#F6D55C") + "/".fontcolor("#ED553B") + "Type 'help name' to find out more about the function 'name'.", "margin-bottom: 10px;");
            createDiv("clear","margin-left: 10px;");
            createDiv("time","margin-left: 10px;");
            createDiv("print [string]","margin-left: 10px;");
            createDiv("mkdir [string]","margin-left: 10px;");
            createDiv("rmdir [string]","margin-left: 10px;");
            createDiv("list","margin-left: 10px;");
            println("uname [string]", "margin-left: 10px;");
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