export default {
    name: 'print',
    description: 'print arguments',
    execute(os, args) {
        os.next(args);
    }
};
