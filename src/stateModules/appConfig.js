import actions from "../app-state/actions"
import mutations from "../app-state/mutations"
import getters from "../app-state/getters"

const appConfig = {
  state:{
    mainBanner: {
      description: "placeholder image",
      src: "https://via.placeholder.com/1500"
    },
    musicGenres: [
      "Pop",
      "Rock",
      "Metal",
      "Dance",
      "Country",
      "Hip",
      "Alternative",
      "R&B",
      "Solo Artists",
      "Soul",
      "Reggae",
      "Punk",
      "Latin",
      "Electronic",
      "Classical"
    ],
    searchQuery: {
      keyword: null,
      location: null,
      priceType: null,
      genreFilters: [],
      actFilters: [],
      venueFilters: [], 
      priceRange: {
        min: null,
        max: null
      },
      dateRange: {
        start: null,
        end: null
      }
    },
    searchResults: [],
    searchError: null,
    selectedUserType: null,
    profileCreationStep: 0,
    profileCreationPage: 0,
    actProfileCreation: [
      {
        stepName: 'Basic Info',
        pages:[
          {
            name: "Address",
            info: `Only your general location will be shared.`,
            error: null
          },
          {
            name: "Genres",
            info: `This will help you match with likeminded venues and musicians.`,
            error: null
          },
          {
            name: "Bio",
            info: "Provide a short summary of your musical journey",
            error: null
          },
        ]
      },
      {
        stepName: 'Uploads and Links',
        pages:[
          {
            name: "Photos",
            info: `Upload some photos that of your act in action. It's best to compress your images before uploading as this will ensure that there is no delay when they being veiwed on your profile. Hover over a previewed image to check its size, ideally it should be 2MB or smaller.`,
            error: null
          },
          {
            name: "Links",
            info: "Add links to Youtube, SoundCloud and News Stories. Showcasing your content is a great way entice new people to attend your shows.",
            error: null            
          }
        ]
      },
      {
        stepName: 'Pricing and Preferences',
        pages:[
          {
            name: "Fees",
            info: "Specify your nightly base rate and how you want to split the ticket sales",
            error: null
          },
          {
            name: "Requirements",
            info: "Add a list requirements and preferences for the venue to fulfill",
            error: null
          },
          {
            name: "LegalAgreement",
            info: "It is your reponsibility to follow the rules and regulation of your city. You must check the box to confirm that you will comply with local laws",
            error: null
          }
        ]  
      }
    ],
    venueProfileCreation:[
      {
        stepName: 'Start with the basics',
        pages:[
          {
            name: "Address",
            info: `Your information will only be shared with confirmed bookings.`,
            error: null
          },
          {
            name: "Genres",
            info: `This will help you match with likeminded venues and musicians.`,
            error: null
          },
          {
            name: "Details",
            info: `Bar 
              Bands are booking a venue with all the permits and proper equipment. 

              Shared Space 
              Bands are using a community space, permits and equipement are subject to the space.

              Private Space 
              Bands are using someone's house, it can be a room, a garage; you probably don’t have the permits and will need to apply for them.

              Number of Guests
              Divide the square footage of your space by five(the approximate number of feet each guest needs in personal space).That number equal many people can fit comfortably in your home.
              
              Bathrooms
              Specify if your guests will have exclusive use of bathrooms and the number of bathrooms available.`,
              error: null   
          },
          {
            name: "Amenities",
            info: `Providing the essentials helps artists feel at home in your place. Some venues provide meals, or just coffee and tea.None of these things are required, but sometimes they add a nice touch to help guests feel welcome.`,
            error: null
          }
        ]
      },
      {
        stepName: 'Set the stage',
        pages:[
          {
            name: "Photos",
            info: `Upload some photos that show off your venue. It's best to compress your images before uploading as this will ensure that there is no delay when they being veiwed on your profile. Hover over a previewed image to check its size, ideally it should be 2MB or smaller.`,
            error: null
          },
          {
            name: "Description",
            info: `Provide a listing title, a brief description of your venue and what kind of act it is best suited for.`,
            error: null
          }
        ]
      },
      {
        stepName: 'Get ready for the show!',
        pages:[
          {
            name: "Preferences",
            info: "Choose your level of experience and hosting frequency",
            error: null
          },
          {
            name: "Pricing",
            info: `Choose between setting a flat rental fee or a lower rental fee and a percentage of ticket sales.
            
            Choose if you want add additional fees, try to strike a balance between covering costs and being competitive with other venues`,
            error: null
          },
          {
            name: "Rules",
            info: "Set the rules for your venue",
            error: null
          },
          {
            name: "LegalAgreement",
            info: "It is your reponsibility to follow the rules and regulation of your city. You must check the box to confirm that you will comply with local laws",
            error: null
          },
        ]
      },
    ],
  },
  getters,
  mutations,
  actions
}
export default appConfig
