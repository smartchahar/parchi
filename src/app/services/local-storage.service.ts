import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  setData(key: string, data) {
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    } else if (typeof data !== 'string') {
      data = data.toString();
    }

    // Impementing the Key and IV and encrypt the password
    // const encrypted = AES.encrypt(data, Constants.hash_secret);

    // window.localStorage.setItem(key, encrypted);
    window.localStorage.setItem(key, data);

  }
  getData(key) {
    const val = window.localStorage.getItem(key);

    if (val) {
      // const decrypted = AES.decrypt(val, Constants.hash_secret);
      // return decrypted.toString(CryptoJS.enc.Utf8);
      return val;
    }
    return null;

  }

  clearAll() {
    window.localStorage.clear();
  }

  removeItem(item) {
    window.localStorage.removeItem(item);
  }
}
