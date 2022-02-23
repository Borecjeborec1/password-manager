const crypto = require('crypto');
let decrypted = function decrypt(cipherText, key, outputEncoding = 'utf8') {
  const cipher = crypto.createDecipheriv(process.env.ALGORITHM, key, null);
  return Buffer.concat([cipher.update(cipherText), cipher.final()]).toString(outputEncoding);
};

module.exports = decrypted;
