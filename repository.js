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