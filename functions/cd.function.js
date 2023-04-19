export default {
    name: 'cd',
    description: 'cd [string]/[..] (change directory)',
    arguments: 1,
    execute(os, args) {
        const path = args[0];
        if (path === '..') os.wd.goDirUp();
        else if(path.substring(0,2) === "./") {
            //Local path
        } else {
            os.wd.goDirByPath(path);
        }
        console.log(os.wd.goDirByPath(path));
        os.next();
    }
};
