export default {
    name: 'rev',
    description: 'rev [string] (print argument in reverse)',
    execute(os, args) {
        os.dialog.next(args.join(' ').split('').reverse().join(''));
    }
};
