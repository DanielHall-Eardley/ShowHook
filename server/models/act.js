const {Schema, model} = require("mongoose")
const Review = require("./review")
const Show = require("./show")
const Blog = require("./blog")

const ActSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "BaseUser"
  },
  members: [
    Schema.Types.ObjectId
  ],
  memberRequests: [
    {
      _id: Schema.Types.ObjectId,
      name: String
    }
  ],
  selfType: {
    type: String,
    default: "act"
  },
  address: {
    type: Object,
    required: true
  },
  genres: Array,
  requirements: Array,
  preferences: Array,
  youtubeLink: String,
  soundcloudLink: String,
  blogs: [
    Blog
  ],
  photoUrlArray: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
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
  reviews: [
    Review
  ],
  bannerPhoto: String,
  overallRating: Number,
  shows: [
    Schema.Types.ObjectId
  ]
},
{
  timestamps: true
}
)

module.exports = model("Act", ActSchema)