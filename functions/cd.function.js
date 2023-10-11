export default {
    name: 'cd',
    description: 'cd [string]/[..] (change directory)',
    arguments: ["path"],
    async execute(os, args) {
        if(args.length === 0) {
            const path = await os.dialog.ask("Please specify a path:", {autoComplete: "file"});
            os.wd.goDirByPath(path);
        }else {
            try {
                const path = args[0];
                if (path === '..') os.wd.goDirUp();
                else if (path.substring(0, 2) === "./") {
                    //Local path
                } else {
                    os.wd.goDirByPath(path);
                }
            } catch (e) {
                os.say(e.message);
            }
        }
        os.next();
    }
};
