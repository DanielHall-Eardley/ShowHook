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
          completed: false,
          pages:[
            {
            title: "Basic info",
            inputType: "input",
            information: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            options: [
              {
                type: 'text',
                name: 'Some input field'
              },
              {
                type: 'textarea',
                name: 'Some input field'
              },
              {
                type: 'select',
                name: 'Some input field',
                selectOptions: ['ninja', 'pirate', 'samurai']
              },
            ]
            },
            {
            title: "More Basic info",
            inputType: "input",
            information: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            options: [
              {
                type: 'text',
                name: 'Some input field'
              },
              {
                type: 'text',
                name: 'Some input field'
              },
              {
                type: 'text',
                name: 'Some input field'
              },
            ]
            },
            {
            title: "Even more Basic info",
            inputType: "input",
            information: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            options: [
              {
                type: 'text',
                name: 'Some input field'
              },
              {
                type: 'text',
                name: 'Some input field'
              },
              {
                type: 'text',
                name: 'Some input field'
              },
            ]
            }
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
  mutations:{
    incrementStep: (state, payload) => {
      state.steps[payload.type][payload.step].completed = true
    }
  },
  actions:{
    incrementStep: (context, payload) => {
      context.commit('incrementStep', payload)
    }
  }
}
export default appConfig
