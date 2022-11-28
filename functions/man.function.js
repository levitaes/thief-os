export default {
    name: 'man',
    description: 'show info about a command',
    execute(os, args) {
        if (args.length === 0) {
            os.next('os command specified');
            return;
        }
        const command = args.shift().toLowerCase();
        if (!os.functions.has(command)) {
            os.next('command not found');
            return;
        }

        os.next(os.functions.get(command).description);
    }
};
