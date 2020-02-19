const {model, Schema} = require("mongoose")
const Message = require("./message")

const messageArraySchema = Schema({
  array: [
    Message
  ]
},
{
  timestamps: true
})

module.exports = model("MessageArray", messageArraySchema)