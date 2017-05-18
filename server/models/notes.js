const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
  title: String,
  content: String,
  text: String,
  date: String,
  author: String
})

const Notes = module.exports = mongoose.model('Notes', NotesSchema)
