const appConfig = {
  state:{
    mainBanner: {
      description: "placeholder image",
      src: "https://via.placeholder.com/1500"
    },
    navMenu: [
      {name: "search", url: "/search"},
      {name: "home", url: "/"}
    ],
    steps:{
      act: [
        {
          stepDesc: 'Step 1',
          completed: true,
          pages:[
            {
            name: "Basic info",
            inputType: "input",
            information: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            options: ["street", "number", "town"]
            },
            {
            name: "More Basic info",
            inputType: "input",
            information: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            options: ["street", "number", "town"]
            },
          ]
        },
        {stepDesc: 'Step 2', completed: false},
        {stepDesc: 'Step 3', completed: false},
        {stepDesc: 'Step 4', completed: false},
        {stepDesc: 'Step 5', completed: false},
      ],
      venue: [],
      profile: []
    }
  },
  getters:{
  }
}
export default appConfig
