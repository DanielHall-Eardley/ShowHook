import actions from "@/user-state/actions"
import mutations from "@/user-state/mutations"
import getters from "@/user-state/getters"

const userConfig = {
  state: {
    token: null,
    selectedBlog: null,
    offer: {
      offeror: "",
      receiver: "",
      bookingDate: "",
      paymentType: "guarantee",
      price: 0,
      status: null,
      actPercentage: 50,
      venuePercentage: 50,
      backline: "What are you supplying?",
      merchSeller: "Venue",
      merchPercentageArtist: 40,
      merchPercentageVenue: 60,
      accomodationProvider: "Venue",
      venueAccRoom: 0,
      venueAccAddress: null,
      travelProvider: "Artist",
      travelExpenses: 0,
      venueGuestList: 0,
      artistGuestList: 0,
      conditionText: "Add a condition, upload a rider, a stage plot",
      schedule: [
        {
          task: "Load In",
          start: "Not Selected",
          end: "Not Selected"
        },
        {
          task: "Sound Check",
          start: "Not Selected",
          end: "Not Selected"
        },
        {
          task: "Doors Open",
          start: "Not Selected",
          end: "Not Selected"
        },
        {
          task: "Opener Set Time",
          start: "Not Selected",
          end: "Not Selected"
        },
        {
          task: "Artist Set Time",
          start: "Not Selected",
          end: "Not Selected"
        },
        {
          task: "Load Out",
          start: "Not Selected",
          end: "Not Selected"
        }
      ]
    },
    offerSummary: [],
    baseUser: {},
    venueData: {
      address: null,
      genres: [],
      details: {},
      amenities: [],
      photos: [],
      suitableActTypes: [],
      title: null,
      description: null,
      experience: null,
      frequency: null,
      price: null,
      priceType: "Open",
      rules: [],
      legalAgreement: false,
      reviews: [
        {
          name: "A patron",
          comment: "Awesome show",
          profilePic: "https://via.placeholder.com/100",
          rating: 1,
          userId: "5dec72308d5ac84314102201"
        },
        {
          name: "A patron",
          comment: "Awesome show",
          profilePic: "https://via.placeholder.com/100",
          rating: 4,
          userId: "5deeeeede5f14a1ad0361b73"
        },       
      ],
      bannerPhoto: "https://via.placeholder.com/1000",
      overallRating: 0,
      shows: []
    },
    actData: {
      address: null,
      genres: [],
      requirements: [],
      preferences: [],
      youtubeLink: "",
      soundcloudLink: "",
      actType: null,
      priceType: "Open",
      blogs: [],
      photos: [],
      title: null,
      description: null,
      price: null,
      legalAgreement: false,
      reviews: [
        {
          name: "A patron",
          comment: "Awesome show",
          profilePic: "https://via.placeholder.com/100",
          rating: 1,
          userId: "5dec72308d5ac84314102201"
        },
        {
          name: "A patron",
          comment: "Awesome show",
          profilePic: "https://via.placeholder.com/100",
          rating: 4,
          userId: "5deeeeede5f14a1ad0361b73"
        },
      ],
      bannerPhoto: "https://via.placeholder.com/1000",
      overallRating: 0,
      shows: []
    },
    newShowData: {},
    adminErrors: null,
  },
  getters,
  mutations,
  actions 
};

export default userConfig
