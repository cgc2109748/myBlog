const mongoose = require('mongoose');

const TravelsSchema = mongoose.Schema({
  type: String,
  place: String,
  viewSport: String,
  text: String,
  date: String,
})

const Travels = module.exports = mongoose.model('Travels', TravelsSchema)
