const {Schema, model} = require("mongoose")

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
    required: true,
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
  photoUrl:{
    type: String,
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
  numberOfTickets: {
    type: Number,
    required: true
  },
  schedule: {
    type: Object,
  },
  actProfits: Number,
  venueProfits: Number,
  venueId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  actId: {
    type: Schema.Types.ObjectId,
    required: true
  }
},
{
  timestamps: true
})

module.exports = model("Show", ShowSchema)