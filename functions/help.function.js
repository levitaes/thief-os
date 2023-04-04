export default {
    name: 'help',
    description: 'help (output quickstart information)',
    arguments: 0,
    execute(os) {
        os.say('repo list (list aviable functions)');
        os.next('man [options] (display manual of function)');
    }
};
