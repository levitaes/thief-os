export default {
    name: 'man',
    description: 'man [string] (display manual of function)',
    arguments: 1,
    execute(os, args) {
        const command = args.shift().toLowerCase();
        if (!os.functions.has(command)) {
            os.next('function not found');
            return;
        }

        if(Array.isArray(os.functions.get(command).description)) {
            let i;
            for(i = 0; i < (os.functions.get(command).description.length -1); i++)
                os.say(os.functions.get(command).description[i]);
            os.next(os.functions.get(command).description[i]);
        } 
        else
            os.next(os.functions.get(command).description);
    }
};
