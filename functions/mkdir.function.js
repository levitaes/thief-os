export default {
    name: 'mkdir',
    description: 'create a new directory',
    arguments: 1,
    execute(os, args) {
        os.wd.getCurrent().addDirectory(args[0]);
        os.next();
    }
};
