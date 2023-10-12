export default {
    name: 'time',
    description: 'time (display the current time and date)',
    execute(os, args) {
        if(args[0] === "-u") {
            os.dialog.next(Date.now());
            return;
        }
        let date = new Date();
        os.dialog.next(`${date.getHours()}:${date.getMinutes()} ${date.getDate()}.${(date.getMonth()+1)}.${date.getFullYear()}`);
    }
};
