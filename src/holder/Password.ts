import CryptoJS from 'crypto-js';

const securityKey = '==lingting-key==';

const key = CryptoJS.enc.Latin1.parse(securityKey);

/**
 * @pass 密码
 */
const encrypt = (pass: string) => {
  // 密码加密
  return CryptoJS.AES.encrypt(pass, key, {
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
};

export const Password = {
  encrypt,
};
