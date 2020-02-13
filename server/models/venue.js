const { model, Schema } = require("mongoose")
const Review = require("./review")
const Show = require("./show")

const Venue = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "BaseUser",
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  genres: Array,
  venueDetails: {
    type: Object,
    required: true
  },
  amenities: Array,
  suitableActTypes: Array,
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  priceType: {
    type: String,
    required: true,
    default: "Open"
  },
  rules: [
    {
      type: Object
    }
  ],
  photos: {
    type: Array,
    required: true
  },
  reviews: [
   Review
  ],
  overallRating: {
    type: Number,
  },
  bannerPhoto: {
    type: String,
  },
  shows: [
    Schema.Types.ObjectId
  ],
  offers: [
    Schema.Types.ObjectId
  ]
},
{
  timestamps: true
});

module.exports = model("Venue", Venue)