const PassModel = require('./pswrdModel');
const encrypt = require('./encrypt.js');
const newRecord = async function add(site, username, password) {
  const response = await PassModel.create({
    site: site,
    username: username,
    password: encrypt(password, process.env.KEY, 'base64'),
  });
};

module.exports = newRecord;
