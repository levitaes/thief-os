export default {
    name: 'cd',
    description: 'cd [string]/[..] (change directory)',
    arguments: 1,
    execute(os, args) {
        try {
            const path = args[0];
            if (path === '..') os.wd.goDirUp();
            else if (path.substring(0, 2) === "./") {
                //Local path
            } else {
                os.wd.goDirByPath(path);
            }
        }
        catch (e) {
            os.say(e.message);
        }
        os.next();
    }
};
