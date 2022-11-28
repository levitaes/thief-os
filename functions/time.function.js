export default {
    name: 'time',
    description: 'displays the current time and date',
    execute(os) {
        os.next(new Date());
    }
};
