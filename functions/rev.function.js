export default {
    name: 'rev',
    description: 'rev [string] (print argument in reverse)',
    arguments: 1,
    execute(os, args) {
        os.next(args[0].split('').reverse().join(''));
    }
};
