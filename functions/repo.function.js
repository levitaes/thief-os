export default {
    name: 'repo',
    description: ['repo count (output aviable functions as integer)','repo list (list aviable functions)'],
    arguments: 1,
    execute(os, args, functions) {
        switch (args[0]) {
            case "count":
                os.next(functions.size);
                break;
            case "list":
                os.next(Array.from(functions.keys()));
                break;
            default:
                os.next('argument doesnt exist');
        }
    }
};
