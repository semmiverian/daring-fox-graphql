const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StudentSchema = new Schema({
  name: String,
  age: Number,
  gender: String
})

const student = mongoose.model('Student', StudentSchema)

module.exports = student