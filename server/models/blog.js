const Schema = require("mongoose").Schema

const Blog = Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imgUrl: String
}, 
{
timestamps: true
})

module.exports = Blog