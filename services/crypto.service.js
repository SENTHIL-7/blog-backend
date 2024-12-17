import CryptoJS from "crypto-js";
import CONFIG from "../config/config.js";
const encrypt = async function (plaintext) {
  let ciphertext;
  ciphertext = CryptoJS.AES.encrypt(plaintext.toString(), CONFIG.secretKey).toString();
  return ciphertext;
};
/**
 * Method which is used to decrypt the text.
 * @param {*} ciphertext To define the data to decrypt.
 */
const decrypt = function (ciphertext) {
  let plaintext;
  const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), CONFIG.secretKey);
  plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return plaintext;
};

export { encrypt, decrypt };