// utils/encryption.js
import CryptoJS from 'crypto-js';

const secretKey = "a1b2c3d4e5f67890a1b2c3d4e5f67890";

// Encryption function
// export function encryptData(data) {
//     const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
//     const encryptedWithPlusSign = encodeURIComponent(encrypted);
//     return encryptedWithPlusSign;
// }

// Decryption function
// export function decryptData(encryptedData) {
//     const encryptedWithoutPlusSign = encodeURIComponent(encryptedData);
//     const bytes = CryptoJS.AES.decrypt(encryptedWithoutPlusSign, secretKey);
//     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
// }

export function decryptData(urlEncodedEncrypted) {

    try {
        const bytes = CryptoJS.AES.decrypt(urlEncodedEncrypted, secretKey);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);


        return JSON.parse(originalText);
    } catch (e) {
        console.warn(e, "asjkbndjbhsadbjhasd");
    }
}

export function encryptDataPost(employeeCode) {
    const encrypted = CryptoJS.AES.encrypt(employeeCode, secretKey).toString();

    return encrypted;
}
export function encryptDataGet(employeeCode) {
    const encrypted = CryptoJS.AES.encrypt(employeeCode, secretKey).toString();

    return encodeURIComponent(encrypted);
}

