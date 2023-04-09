export default {
    name: 'touch',
    description: 'touch [file] - Creates a new file.',
    arguments: 1,
    execute(os, args) {
        os.wd.getCurrent().addFile(args[0], "");
        os.next();
    }
};
