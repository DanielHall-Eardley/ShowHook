const {Schema, model} = require("mongoose")
const TicketSchema = require('./ticket')

const ShowSchema = Schema({
  actTitle: {
    type: String,
    required: true
  },
  venueTitle: {
    type: String,
    required: true
  },
  title: {
    type: String,
  },
  selfType: {
    type: String,
    default: "show"
  },
  address: {
    type: Object,
    required: true
  },
  description: {
    type: String,
  },
  genre: {
    type: String,
  },
  photoArray:{
    type: Array,
  },
  showDate:{
    type: Date,
    required: true
  },
  actRequirements: {
    type: Array
  },
  venueRequirements: {
    type: Array
  },
  guestList: {
    type: Array
  },
  ticketPrice: {
    type: Number,
  },
  ticketsPurchased: {
    type: Number,
    default: 0
  },
  numberOfTickets: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  schedule: {
    type: Object,
  },
  price: {
    type: Number,
  },
  priceType: {
    type: String,
    default: 'Fixed'
  },
  actProfit: {
    type: Number,
    default: 50
  },
  venueProfit: {
    type: Number,
    default: 50
  },
  venueId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  actId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  published: {
    type: Boolean,
    default: false
  },
  bannerPhoto: String,
  tickets: [
    TicketSchema
  ]
},
{
  timestamps: true
})

module.exports = model("Show", ShowSchema)