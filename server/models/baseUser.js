const { model, Schema} = require("mongoose")
const TicketSchema = require('./ticket')

const BaseUserSchema = Schema({
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
	userData:{
		type: Schema.Types.ObjectId,
    refPath: "userType",
  },
  bio: String,
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

module.exports = model("BaseUser", BaseUserSchema)