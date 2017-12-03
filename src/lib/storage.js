const localStorage = window.localStorage;

export default class storage {
    constructor(){
        this.init();
    }

    init () {
        this.qc = localStorage.hasOwnProperty('qc')
            ? JSON.parse(localStorage.getItem('qc'))
            : {};
    }

    get (key) {
        return this.qc.hasOwnProperty(key) ? this.qc[key] : null;
    }

    set (key, value) {
        this.qc[key] = value;
        localStorage.setItem('qc', JSON.stringify(this.qc));
    }

    remove (key) {
        delete this.qc[key];
        localStorage.setItem('qc', JSON.stringify(this.qc));
    }

}