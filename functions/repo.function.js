export default {
    name: 'repo',
    description: 'manage functions',
    execute(os, args, functions) {
        switch (args[0]) {
            case "count":
                os.next(functions.size);
                break;
            case "list":
                os.next(Array.from(functions.keys()));
                console.log(Array.from(functions.keys()));
        }
    }
};
