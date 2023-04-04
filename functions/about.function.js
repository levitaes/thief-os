export default {
    name: 'about',
    description: 'about (display info about this OS)',
    arguments: 0,
    execute(os, args) {
        os.say("This 'OS' was created by Thief and Beniox.");
        os.next("Work in Progress..");
    }
};
