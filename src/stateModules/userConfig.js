import actions from "@/user-state/actions"
import mutations from "@/user-state/mutations"
import getters from "@/user-state/getters"

const userConfig = {
  state: {
    token: null,
    selectedBlog: null,
    offer: {
      offerorId: null,
      receiverId: null,
      offerorName: "",
      offerorTitle: "",
      offerorRating: "",
      receiverName: "",
      receiverTitle: "",
      receiverRating: "",
      bookingDate: "",
      price: 0,
      status: "Pending",
      messageArray: [],
    },
    showSetup: {},
    offerSummary: {},
    baseUser: {},
    venueData: {
      address: null,
      genres: [],
      capacity: null,
      bathrooms: null,
      bathroomType: null,
      amenities: [],
      photos: [],
      suitableActTypes: [],
      title: null,
      description: null,
      experience: null,
      frequency: null,
      price: null,
      priceType: "Open",
      type: null,
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
      type: null,
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
    error: null
  },
  getters,
  mutations,
  actions 
};

export default userConfig
