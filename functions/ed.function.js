export default {
    name: 'ed',
    description: 'ed',
    arguments: ["path"],
    async execute(os, args) {
        // it is a clone from the ed command in unix
        const path = args[0];
        let content = '';
        let commandMode = true;
        let selectedLine = 0;

        if (path) {
            const file = os.wd.getFile(path);
            if (file) {
                content = file.getData();
                os.dialog.say(content.length);
            }
        }

        while (true) {
            const line = await os.dialog.ask("");

            if (commandMode) {
                if (line === "a") {
                    // enter append mode
                    commandMode = false;
                    continue;
                } else if (line === "q") {
                    // quit
                    os.dialog.next();
                    return;
                } else if (line === "p") {
                    // display last line
                    os.dialog.say(content.split("\n").at(-1));
                } else if (line === ",p") {
                    // print all lines
                    os.dialog.say(content);
                } else if (line === "w") {
                    // save to file
                    if (!path) {
                        os.dialog.say("?");
                        continue;
                    }
                    os.wd.getOrCreateFile(path).setData(content);
                    os.dialog.say(content.length);
                } else if (line.startsWith("w ")) {
                    // save to file
                    const filename = line.substring(2);
                    os.wd.getOrCreateFile(filename).setData(content);
                    os.dialog.say(content.length);
                } else if (Number.isInteger(parseInt(line))) {
                    // display line
                    const lines = content.split("\n");
                    if (parseInt(line) > lines.length) {
                        os.dialog.say("?");
                        continue;
                    }
                    os.dialog.say(lines[parseInt(line) - 1]);
                    selectedLine = parseInt(line);
                } else if (line.startsWith("s/")) {
                    // search and replace
                    if (selectedLine === 0) {
                        os.dialog.say("?");
                        continue;
                    }
                    const parts = line.split("/");
                    if (parts.length !== 3) {
                        os.dialog.say("?");
                        continue;
                    }

                    const search = parts[1];
                    const replace = parts[2];

                    // replace only the selected line
                    const lines = content.split("\n");
                    lines[selectedLine - 1] = lines[selectedLine - 1].replace(search, replace);

                    content = lines.join("\n"); // ToDO inline replace

                } else {
                    os.dialog.say("?");
                }
            } else {
                if (line === ".") {
                    commandMode = true;

                    continue;
                }
                if (content === "") {
                    content += line;
                    continue;
                }
                content += "\n" + line;
            }

        }
    }
};
