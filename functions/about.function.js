export default {
    name: 'about',
    description: 'About the author of this project',
    execute(app, args) {
        app.next('about command executed');
    }
};
