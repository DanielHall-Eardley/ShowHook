const { Schema, model } = require("mongoose")
const Message = require("./message")

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
  offerorType: {
    type: String,
    required: true
  },
  offerorStatus: {
    type: String,
    default: "Negotiating"
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
  receiverStatus: {
    type: String,
    default: "Pending"
  },
  receiverType: {
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
  mostRecentMessage: Object,
  messageArray: [
    Message
  ],
  show: {
    type: Schema.Types.ObjectId,
    ref: "Show"
  }
},
{
  timestamps: true  
})

module.exports = model("Offer", Offer)