export default {
    name: 'man',
    description: 'show infos about a command',
    execute(os, args) {
        if (args.length === 0) {
            os.next('No command specified');
            return;
        }
        const command = args.shift().toLowerCase();
        if (!os.functions.has(command)) {
            os.next('Command not found');
            return;
        }

        os.next(os.functions.get(command).description);
    }
};
