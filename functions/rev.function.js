export default {
    name: 'rev',
    description: 'reverse the input',
    execute(os, args) {
        if (args.length === 0) {
            os.next('try rev -h for help');
            return;
        }
        if(args.length > 1) {
            os.next('too many arguments');
            return;
        }
        os.next(args[0].split('').reverse().join(''));
    }
};
