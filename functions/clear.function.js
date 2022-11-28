export default {
    name: 'clear',
    description: 'clear all past entries',
    execute(os) {
        let divs = document.getElementsByTagName("div");
        let brs = document.getElementsByTagName("br");
        let length = divs.length;
        let lengthBrs = brs.length;
        for (let i = 0; i < length; i++) {
            divs[0].remove();
        }
        for (let i = 0; i < lengthBrs; i++) {
            brs[0].remove();
        }
        os.next("");
    }
};
