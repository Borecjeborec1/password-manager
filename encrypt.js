const crypto = require('crypto');
let encrypted = function encrypt(plainText, key, outputEncoding = 'base64') {
  const cipher = crypto.createCipheriv(process.env.ALGORITHM, key, null);
  return Buffer.concat([cipher.update(plainText), cipher.final()]).toString(outputEncoding);
};

module.exports = encrypted;
