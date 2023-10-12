export default {
    name: 'touch',
    description: 'touch [file] (create a new file)',
    arguments: 1,
    execute(os, args) {
        const name = args[0];
        // error when / in name
        if(name.includes('/')) {
            os.dialog.say("Error: / in name");
        }
        os.wd.getCurrent().addFile(args[0], "");
        os.next();
    }
};
