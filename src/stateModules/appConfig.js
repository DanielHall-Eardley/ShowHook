const appConfig = {
  state:{
    mainBanner: {
      description: "placeholder image",
      src: "https://via.placeholder.com/1500"
    },
    loginState: false,
    navMenu: [
      {name: "search", url: "/search"},
      {name: "home", url: "/"},
      {name: "home", url: "/"},
      {name: "home", url: "/"},
      {name: "home", url: "/"},
    ],
    filterMenu:[
      {
        name: 'Artist',
        altName: 'Venue',
        active: false,
        img: 'https://via.placeholder.com/100',
        module: 'SelectType'
      },
      {
        name: 'Price Range',
        active: false,
        img: 'https://via.placeholder.com/100',
        module: 'SelectPriceRange'
      },
      {
        name: 'Split (%)',
        active: false,
        img: 'https://via.placeholder.com/100',
        module: 'SelectSplit'
      },
      {
        name: 'More Filters',
        active: false,
        img: 'https://via.placeholder.com/100',
        module: 'SelectMoreFilters'
      },
    ],
    searchQuery:{},
    mapObject: null,
    resultsArray:[
      {
        mainPic: 'https://via.placeholder.com/400',
        subPic: 'https://via.placeholder.com/100',
        name: 'Iron Man',
        location: 'Ottawa',
      },
      {
        mainPic: 'https://via.placeholder.com/400',
        subPic: 'https://via.placeholder.com/100',
        name: 'Iron Man',
        location: 'Toronto',
      },
      {
        mainPic: 'https://via.placeholder.com/400',
        subPic: 'https://via.placeholder.com/100',
        name: 'Iron Man',
        location: 'New York',
      },
      {
        mainPic: 'https://via.placeholder.com/400',
        subPic: 'https://via.placeholder.com/100',
        name: 'Iron Man',
        location: 'Paradise city',
      },
      {
        mainPic: 'https://via.placeholder.com/400',
        subPic: 'https://via.placeholder.com/100',
        name: 'Iron Man',
        location: 'Australia',
      },
      {
        mainPic: 'https://via.placeholder.com/400',
        subPic: 'https://via.placeholder.com/100',
        name: 'Iron Man',
        location: 'Los Angeles',
      },
      {
        mainPic: 'https://via.placeholder.com/400',
        subPic: 'https://via.placeholder.com/100',
        name: 'Iron Man',
        location: 'Montreal',
      },
      {
        mainPic: 'https://via.placeholder.com/400',
        subPic: 'https://via.placeholder.com/100',
        name: 'Iron Man',
        location: 'Paradise city 8',
      },
      {
        mainPic: 'https://via.placeholder.com/400',
        subPic: 'https://via.placeholder.com/100',
        name: 'Iron Man',
        location: 'Paradise city 9',
      },
      {
        mainPic: 'https://via.placeholder.com/400',
        subPic: 'https://via.placeholder.com/100',
        name: 'Iron Man',
        location: 'Paradise city 10',
      },
      {
        mainPic: 'https://via.placeholder.com/400',
        subPic: 'https://via.placeholder.com/100',
        name: 'Iron Man',
        location: 'Paradise city 11',
      },
      {
        mainPic: 'https://via.placeholder.com/400',
        subPic: 'https://via.placeholder.com/100',
        name: 'Iron Man',
        location: 'Paradise city 12',
      },
      {
        mainPic: 'https://via.placeholder.com/400',
        subPic: 'https://via.placeholder.com/100',
        name: 'Iron Man',
        location: 'Paradise city 13',
      },
    ],
    profileCreationStep: 0,
    profileCreationPage: 0,
    profileCreation:{
      act: [
        {
          stepName: 'Step 1',
          pages:[
            "EditAddress" ,
            "component 2" ,
            "component 3" ,
            "component 4" ,
            "component 5" ,
            "component 6" ,
            "component 7" ,
          ]
        },
        {
          stepName: 'Step 2',
          pages:[
            "component 1" ,
            "component 2" ,
            "component 3" ,
            "component 4" ,
            "component 5" ,
            "component 6" ,
            "component 7" ,
          ]
        },
        {
          stepName: 'Step 3',
          pages:[
            "component 1" ,
            "component 2" ,
            "component 3" ,
            "component 4" ,
            "component 5" ,
            "component 6" ,
            "component 7" ,
          ]
        },
      ],
      showgoer:[
        {
          stepName: 'Step 1',
          pages:[
            "component 1" ,
            "component 2" ,
            "component 3" ,
            "component 4" ,
            "component 5" ,
            "component 6" ,
            "component 7" ,
          ]
        },
        {
          stepName: 'Step 2',
          pages:[
            "component 1" ,
            "component 2" ,
            "component 3" ,
            "component 4" ,
            "component 5" ,
            "component 6" ,
            "component 7" ,
          ]
        },
        {
          stepName: 'Step 3',
          pages:[
            "component 1" ,
            "component 2" ,
            "component 3" ,
            "component 4" ,
            "component 5" ,
            "component 6" ,
            "component 7" ,
          ]
        },
      ],
      venue:[
        {
          stepName: 'Step 1',
          pages:[
            "AddressMap" ,
            "component 2" ,
            "component 3" ,
            "component 4" ,
            "component 5" ,
            "component 6" ,
            "component 7" ,
          ]
        },
        {
          stepName: 'Step 2',
          pages:[
            "component 1" ,
            "component 2" ,
            "component 3" ,
            "component 4" ,
            "component 5" ,
            "component 6" ,
            "component 7" ,
          ]
        },
        {
          stepName: 'Step 3',
          pages:[
            "component 1" ,
            "component 2" ,
            "component 3" ,
            "component 4" ,
            "component 5" ,
            "component 6" ,
            "component 7" ,
          ]
        },
      ],
    }
  },
  mutations:{
    changeStepOrPage: (state, payload) => {

      let {
        profileCreation,
        profileCreationPage,
        profileCreationStep,
      } = state

      let userType = payload.userType
      let stepsLength = profileCreation[userType].length -1
      let pagesLength = profileCreation[userType][profileCreationStep].pages.length - 1

      if(payload.direction === "inc"){
        if(profileCreationPage >= pagesLength && profileCreationStep >= stepsLength){
          return
        }else if(profileCreationPage >= pagesLength){
          state.profileCreationStep++
          state.profileCreationPage = 0
        }else if(profileCreationPage <= pagesLength){
          state.profileCreationPage++
        }
      }else if(payload.direction === "dec"){
        if(profileCreationPage <= 0 && profileCreationStep <= 0){
          return
        }else if(profileCreationPage <= 0){
          state.profileCreationStep--
          state.profileCreationPage = pagesLength
        }else if(profileCreationPage >= 0){
          state.profileCreationPage--
        }
      }
    },
    addToSearchQuery: (state, payload) =>{
      state.searchQuery = Object.assign(
        state.searchQuery,
        payload
      )
      console.log(state.searchQuery)
    },
    updateFilterMenu: (state, payload) => {
      state.filterMenu = payload
      console.log(state.filterMenu)
    },
    showMap:(state, payload) => {
      state.mapObject = {
        location: payload.location,
        name: payload.name,
        picture: payload.mainPic
      }
      console.log(state.mapObject)
    },
    hideMap: state =>{
      state.mapObject = null
    }
  },
  actions:{
    changeStepOrPage: (context, payload) => {
      context.commit('changeStepOrPage', payload)
    },

  }
}
export default appConfig
