export default {
    name: 'man',
    description: 'show infos about a command',
    execute(app, args) {
        if (args.length === 0) {
            app.say('No command specified');
            return;
        }
        const command = args.shift().toLowerCase();
        if (!app.functions.has(command)) {
            app.say('Command not found');
            return;
        }

        app.say(app.functions.get(command).description);
    }
};
