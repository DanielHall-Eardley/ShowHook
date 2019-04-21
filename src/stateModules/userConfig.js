import key from "@/../keys.js"

const userConfig = {
  state: {
    user: {
      id: '1',
      userType: "act",
      name: {content:"Motley Crue", verified: true},
      email: {content:"350chevy8@gmail.com", verified: true},
      phone: {content:236890346, verified: true},
      price: `\$${200}`,
      location: {content: "Everywhere, I'm a ninja", verified: false},
      bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      pic: "https://via.placeholder.com/300",
      dateJoined: "July 15th 2018",
      banner: "https://via.placeholder.com/1000",
      genres: ["edm", "bangerz", "dance"],
      members: ["userId1", "userId2"],
      video:{title: "Music video", videoId: "xWIlizw7M1M"},
      featuredTrack: "285823350",
      offers:[],
      pictures: [
        "https://via.placeholder.com/500",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
      ],
      ratingsAveraged:[
        {title: "Accuracy", rating: 3},
        {title: "Communication", rating: 5},
        {title: "Cleanliness", rating: 5},
        {title: "Location", rating: 2},
        {title: "Promotions", rating: 1},
        {title: "Occupancy", rating: 4},
      ],
      responseData: {
        rate: "70%",
        time: "within an hour",
        responses: [
          {
          id: "some user id",
          message: "booking confirmed"
          },
          {
          id: "some user id",
          message: "booking confirmed"
          },
        ]
        },
      featureIcons: [
        {feature: "I\'m a feature", src: "https://via.placeholder.com/200"},
        {feature: "I\'m a feature", src: "https://via.placeholder.com/200"},
        {feature: "I\'m a feature", src: "https://via.placeholder.com/200"},
        {feature: "I\'m a feature", src: "https://via.placeholder.com/200"},
      ],
      shows: {
        upcoming: [{
            id: "unique id",
            date: "2019, 4, 16",
            venueAddress: "in the sun",
            venueName: "A cool place",
            ticketsOnSale: true,
            ticketCount: 10000,
            ticketsPurchased: 5000,
          },
          {
            id: "unique id",
            date: "2019, 4, 5",
            venueAddress: "in the sun",
            venueName: "A cool place",
            ticketsOnSale: true,
            ticketCount: 10000,
            ticketsPurchased: 5000,
          },
        ],
        past: [{
            date: "2018, 11, 17",
            venueAddress: "in the sun",
            venueName: "A cool place",
            ticketsOnSale: false,
            ticketCount: 10000,
            ticketsPurchased: 5000,
          },
          {
            date: "2018, 11, 17",
            venueAddress: "in the sun",
            venueName: "A cool place",
            ticketsOnSale: false,
            ticketCount: 10000,
            ticketsPurchased: 10000,
          },
        ],
      },
      reviews:[
        {
          id: "show unique id",
          comment: "sick show",
          name: "bob",
          location: "somewhere",
          profilePic: "https://via.placeholder.com/150",

        },
        {
          id: "show unique id",
          comment: "sick show",
          name: "bob",
          location: "somewhere",
          profilePic: "https://via.placeholder.com/150",

        },
      ],
      venueDetails:[
        {
        subHeading: 'Rules',
        content: [
          {rule: "capacity", text: "200"},
          {rule: "capacity", text: "200"},
          {rule: "capacity", text: "200"},
          {rule: "capacity", text: "200"},
          {rule: "capacity", text: "200"},
          {rule: "capacity", text: "200"},
          {rule: "capacity", text: "200"},
        ],
      },
      {
        subHeading: "Amenities",
        content:[
          {rule: "kitchen", text: "open til 10pm", icon: "https://via.placeholder.com/40"},
          {rule: "kitchen", text: "open til 10pm", icon: "https://via.placeholder.com/40"},
          {rule: "kitchen", text: "open til 10pm", icon: "https://via.placeholder.com/40"},
          {rule: "kitchen", text: "open til 10pm", icon: "https://via.placeholder.com/40"},
          {rule: "kitchen", text: "open til 10pm", icon: "https://via.placeholder.com/40"},
          {rule: "kitchen", text: "open til 10pm", icon: "https://via.placeholder.com/40"},
          ],
        }
      ],
      featuredNews:[
        {
          image: "https://via.placeholder.com/500",
          title: "Some news article",
          link: {url:"www.google.com", name: "Article source"},
          content: "1 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          image: "https://via.placeholder.com/500",
          title: "Some news article",
          link: {url:"www.google.com", name: "Article source"},
          content: "2 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          image: "https://via.placeholder.com/500",
          title: "Some news article",
          link: {url:"www.google.com", name: "Article source"},
          content: "3 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ]
    }
  },
  mutations: {
    addOffer: (state, payload) => {
      state.user.offers = [...state.user.offers, payload]
    },
    getVideo: state => {
      fetch(`https://www.googleapis.com/youtube/v3/videos?id=${state.user.video.videoId}&key=${key.youtube}`)
      .then(res => res.json)
      .then(res => console.log(res))
    },
    updateBasicDetails: (state, e) => {
      let category = e.target.placeholder.toLowerCase()
      state.user[category] = {content: e.target.value, verified: false}
      console.log(state.user[category])
    }
  },
  actions: {
    sendUserDetails: (context, payload) => {
      console.log(payload)
      //send post request with user details
    },
    updateBasicDetails: (context, e) => {
      context.commit("updateBasicDetails", e)
    },
    addTickets: (context, event) => {
      console.log(event.target.innerText)
    },
    addOffer: (context, payload) => {
      context.commit("addOffer", payload)
    },
    getVideo: (context) => {
      context.commit("getVideo")
    }
  }

}

export default userConfig
