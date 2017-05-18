const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
  _id: String,
  title: String,
  content: String,
  text: String,
  date: String,
  author: String
})

const Notes = module.exports = mongoose.model('Notes', NotesSchema)
