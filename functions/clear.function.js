export default {
    name: 'clear',
    description: 'clear (clear all past entries)',
    arguments: 0,
    execute(os, args) {
        os.dialog.clear();
        os.next("");
    }
};
