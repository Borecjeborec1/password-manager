const mongoose = require('mongoose');
var readlineSync = require('readline-sync');
const crypto = require('crypto');
require('dotenv').config();

const PassModel = require('./pswrdModel');
const read = require('./readRecords.js');
const add = require('./addRecord.js');

mongoose
  .connect(process.env.URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => console.log())
  .catch((err) => console.log(err));

async function main() {
  let safe = false;
  var login = readlineSync.question('Enter your password: ', {
    hideEchoBack: true,
  });
  if (crypto.createHash('sha256').update(login).digest('base64') != process.env.PASSWORD && login != 'f') {
    console.log('Sorry, bad password');
    return process.exit(1);
  }
  if (readlineSync.keyInYN('Do you want to add new Password?')) {
    if (readlineSync.keyInYN('Is your input safe? ')) {
      safe = true;
    } else {
      safe = false;
    }
    var siteName = readlineSync.question('Enter site name: ');
    var userName = readlineSync.question('Enter username: ');
    var password = safe
      ? readlineSync.question('Enter password: ')
      : readlineSync.question('Enter your password: ', {
          hideEchoBack: true,
        });
    add(siteName.toLowerCase(), userName.toLowerCase(), password);

    setTimeout(() => {
      process.exit(1);
    }, 150);
  } else {
    let wantSite = false;
    if (readlineSync.keyInYN('Search by username? ')) {
      wantSite = false;
    } else {
      wantSite = true;
    }
    let search = wantSite ? readlineSync.question('Enter site name: ') : readlineSync.question('Enter username: ');
    let res = await read(wantSite, search.toLowerCase());
    if (res.length > 1) {
      if (!wantSite) {
        sites = [];
        for (let i = 0; i < res.length; ++i) {
          sites.push(res[i].site);
        }
        index = readlineSync.keyInSelect(sites, 'Which site? ');
      } else {
        usernames = [];
        for (let i = 0; i < res.length; ++i) {
          usernames.push(res[i].username);
        }
        index = readlineSync.keyInSelect(usernames, 'Which account? ');
      }
      console.log('------');
      console.log('Site name: ' + res[index].site);
      console.log('Site username: ' + res[index].username);
      console.log('Site password: ' + res[index].password);
      console.log('------');
    } else {
      console.log('------');
      console.log('Site name: ' + res[0].site);
      console.log('Site username: ' + res[0].username);
      console.log('Site password: ' + res[0].password);
      console.log('------');
    }

    return process.exit(1);
  }
}
main();
