const { model, Schema} = require("mongoose")
const TicketSchema = require('./ticket')

const ShowgoerSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  profilePhoto: {
    type: String
  },
  tickets: [
    TicketSchema
  ]
},
{
  timestamps: true
});

module.exports = model("Showgoer", ShowgoerSchema)