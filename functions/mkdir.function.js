export default {
    name: 'mkdir',
    description: 'mkdir [string] (create new directory)',
    arguments: 1,
    execute(os, args) {
        os.wd.getCurrent().addDirectory(args[0]);
        os.next();
    }
};
