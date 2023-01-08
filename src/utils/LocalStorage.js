import * as CryptoJS from 'crypto-js';

export class LocalService {

    static key = "zyax456";

    static saveData(key, value) {
        localStorage.setItem(key, this.encrypt(value));
    }

    static getData(key) {
        let data = localStorage.getItem(key)|| "";
        return this.decrypt(data);
    }

    static removeData(key) {
        localStorage.removeItem(key);
    } 

    static clearData() {
        localStorage.clear();
    }

    static encrypt(txt) {
        return CryptoJS.AES.encrypt(txt, LocalService.key).toString();
    }

    static decrypt(txtToDecrypt) {
        return CryptoJS.AES.decrypt(txtToDecrypt, LocalService.key).toString(CryptoJS.enc.Utf8);
    }
}
