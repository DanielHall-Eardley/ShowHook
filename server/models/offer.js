const { Schema, model } = require("mongoose")

const Offer = Schema({
  offeror: {
    type: String,
    required: true
  },
  receiver: {
    type: String,
    required: true
  },
  offerorContact: {
    type: String,
    required: true
  },
  receiverContact: {
    type: String,
    required: true
  },
  offerorId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  receiverId: {
    type: Schema.Types.ObjectId,
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
  }
},
{
  timestamps: true  
})

module.exports = model("Offer", Offer)