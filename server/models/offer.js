const { Schema, model } = require("mongoose")

const Offer = Schema({
  offerorId: {
    type: Schema.Types.ObjectId,
    ref: "BaseUser",
    required: true
  },
  offerorName: {
    type: String,
    required: true
  },
  offerorTitle: {
    type: String,
    required: true
  },
  offerorRating: {
    type: String,
    required: true
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "BaseUser",
    required: true
  },
  receiverName: {
    type: String,
    required: true
  },
  receiverTitle: {
    type: String,
    required: true
  },
  receiverRating: {
    type: String,
    required: true
  },
  bookingDate: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  mostRecentMessage: String,
  messageArray: {
    type: Schema.Types.ObjectId,
    ref: "MessageArray"
  }
},
{
  timestamps: true  
})

module.exports = model("Offer", Offer)