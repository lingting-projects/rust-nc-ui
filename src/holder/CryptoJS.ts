import CryptoJS from 'crypto-js';

export type Calculate = {
  buffer: ArrayBuffer;
  array: CryptoJS.lib.WordArray;
};

export type CalculateDigest = Calculate & { md5: string; sha1: string; sha256: string };

export default {
  toArrayBuffer(blob: Blob) {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = () => reject(reader.error);
      reader.readAsArrayBuffer(blob);
    });
  },
  toWordArray(buffer: ArrayBuffer) {
    const byteArray = new Uint8Array(buffer);
    const words = [];
    for (let i = 0; i < byteArray.length; i += 4) {
      words.push(
        (byteArray[i] << 24) |
        ((byteArray[i + 1] || 0) << 16) |
        ((byteArray[i + 2] || 0) << 8) |
        (byteArray[i + 3] || 0),
      );
    }
    return CryptoJS.lib.WordArray.create(words, byteArray.length);
  },
  md5: (array: CryptoJS.lib.WordArray) => CryptoJS.MD5(array).toString(),
  sha1: (array: CryptoJS.lib.WordArray) => CryptoJS.SHA1(array).toString(),
  sha256: (array: CryptoJS.lib.WordArray) => CryptoJS.SHA256(array).toString(),
  calculateDigest(blob: Blob) {
    return new Promise<CalculateDigest>((resolve, reject) => {
      try {
        this.toArrayBuffer(blob)
          .then((buffer) => {
            const array = this.toWordArray(buffer);

            const md5 = this.md5(array);
            const sha1 = this.sha1(array);
            const sha256 = this.sha256(array);
            resolve({md5, sha1, sha256, buffer, array});
          })
          .catch(reject);
      } catch (e) {
        reject(e);
      }
    });
  },
};
