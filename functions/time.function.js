export default {
    name: 'time',
    description: 'show the current time and date',
    execute(os) {
        os.next(new Date());
    }
};
