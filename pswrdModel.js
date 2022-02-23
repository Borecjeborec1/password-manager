const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  site: String,
  username: String,
  password: String,
});

const model = mongoose.model('TodoModel', TodoSchema);

module.exports = model;
