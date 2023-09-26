export default {
    name: 'history',
    description: 'show the command history',
    execute(os, args) {
            if(args.length > 0) {
                if(args[0] === '-c') {
                    os.terminal.clearHistory()
                    os.next("deleted history");
                    return;
                }
            }

        const historys = os.terminal.history;
        for (let [index, history] of historys.entries()) {
            os.say(`${index}: ${history}`);
        }
        os.next();
    }
};
