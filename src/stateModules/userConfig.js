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
      offers:[],
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
            ticketsOnSale: false,
            ticketCount: 10000,
            ticketsPurchased: 5000,
          },
        ],
        past: [{
            date: "2019, 4, 3",
            venueAddress: "in the sun",
            venueName: "A cool place",
            ticketsOnSale: false,
            ticketCount: 10000,
            ticketsPurchased: 5000,
          },
          {
            date: "2019, 4, 16",
            venueAddress: "in the sun",
            venueName: "A cool place",
            ticketsOnSale: true,
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
          profilePic: "https://via.placeholder.com/150"
        },
        {
          id: "show unique id",
          comment: "sick show",
          name: "bob",
          location: "somewhere",
          profilePic: "https://via.placeholder.com/150"
        },
      ]
    },
  },
  mutations: {
    addOffer: (state, payload) => {
      state.user.offers = [...state.user.offers, payload]
    }
  },
  actions: {
    sendUserDetails: (context, payload) => {
      console.log(payload)
      //send post request with user details
    },
    addTickets: (context, event) => {
      console.log(event.target.innerText)
    },
    addOffer: (context, payload) => {
      context.commit("addOffer", payload)
    }
  }
}

export default userConfig
