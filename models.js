const shortid = require('shortid');
const mongoose = require('mongoose')
require('./db')

var Schema = mongoose.Schema;

// User model
exports.User = mongoose.model('User', new Schema({
  _id: {
    type: String,
    default: shortid.generate()
  },
  username: {
    type: String,
    unique: true
  }
}, {collection: 'users'}))

// Excercise model
exports.Excercise = mongoose.model('Excercise', new Schema({
  userId: String,
  description: String,
  duration: Number,
  date: {
    type: Date,
    default: new Date
  }
}, {collection: 'excercises'}))