const { Schema } = require("mongoose")

const Review = Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  profilePic: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true    
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "BaseUser",
    required: true
  },
},
{
  timestamps: true
})

module.exports =  Review