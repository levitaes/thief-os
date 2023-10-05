export default {
    name: 'rev',
    description: 'rev [string] (print argument in reverse)',
    execute(os, args) {
        os.next(args.join(' ').split('').reverse().join(''));
    }
};
