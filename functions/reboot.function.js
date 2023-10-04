export default {
    name: 'reboot',
    description: 'reboot (reboot the system)',
    execute(os) {
        os.say('Rebooting...');
        window.location.reload();
    }
};
