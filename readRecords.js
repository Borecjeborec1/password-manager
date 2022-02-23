const PassModel = require('./pswrdModel');
const decrypt = require('./decrypt.js');
const record = async function read(wantSite, what) {
  let records;
  if (wantSite) {
    records = await PassModel.find({ site: what });
    if (records.length > 1) {
      for (let i = 0; i < records.length; ++i) {
        records[i].password = decrypt(Buffer.from(records[i].password, 'base64'), process.env.KEY, 'utf8');
      }
    } else {
      records[0].password = decrypt(Buffer.from(records[0].password, 'base64'), process.env.KEY, 'utf8');
    }
    return records;
  } else {
    records = await PassModel.find({ username: what });
    if (records.length > 1) {
      for (let i = 0; i < records.length; ++i) {
        records[i].password = decrypt(Buffer.from(records[i].password, 'base64'), process.env.KEY, 'utf8');
      }
    } else {
      records[0].password = decrypt(Buffer.from(records[0].password, 'base64'), process.env.KEY, 'utf8');
    }
    return records;
  }
};

module.exports = record;
