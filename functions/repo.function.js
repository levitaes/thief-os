export default {
    name: 'repo',
    description: 'manage functions',
    execute(os, args) {
        switch (args[0]) {
            case "count":
                os.next(os.functions.size);
                break;
            case "list":
                os.next(Array.from(os.functions.keys()));
                console.log(Array.from(os.functions.keys()));
        }
    }
};
