export default {
    name: 'time',
    description: 'time (display the current time and date)',
    execute(os) {
        let date = new Date();
        os.next(date.getHours()+":"+date.getMinutes()+" "+date.getDate()+"."+(date.getMonth()+1));
    }
};
