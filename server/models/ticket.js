const {Schema} = require("mongoose")

const TicketSchema = Schema({
  actTitle: {
    type: String,
  },
  venueTitle: {
    type: String,
  },
  address: {
    type: String,
  },
  showDate:{
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  ticketHolderId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  venueId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  actId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  showId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  paymentIntentId: {
    type: String,
    default: null
  },
  paymentComplete: {
    type: Boolean,
    default: false
  },
  attended: {
    type: Boolean,
    default: false
  },
},
{
  timestamps: true
})

module.exports = TicketSchema