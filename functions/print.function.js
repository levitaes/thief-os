export default {
    name: 'print',
    description: 'print [string] (print argument)',
    arguments: -1,
    execute(os, args) {
        os.next(args.join(' '));
    }
};
