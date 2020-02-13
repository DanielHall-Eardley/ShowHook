const {Schema, model} = require("mongoose")

const ShowSchema = Schema({
  title: {
    type: String,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  photoUrl:{
    type: String,
    required: true
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
    required: true
  },
  numberOfTickets: {
    type: Number,
    required: true
  },
  schedule: {
    type: Object,
    required: true
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