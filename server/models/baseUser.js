const { model, Schema} = require("mongoose")

const BaseUser = Schema({
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
		refPath: "userType"
  }
},
{
  timestamps: true
});

module.exports = model("BaseUser", BaseUser)