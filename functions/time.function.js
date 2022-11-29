export default {
    name: 'time',
    description: 'show the current time and date',
    execute(os) {
        let date = new Date();
        os.next(date.getHours()+":"+date.getMinutes()+" "+date.getDate()+"."+(date.getMonth()+1));
    }
};
