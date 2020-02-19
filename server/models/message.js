const Schema = require("mongoose").Schema

const Message = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
},
{
  timestamps: true
})

module.exports = Message