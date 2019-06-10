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
    mapObject: {
      shown: false
    },
    resultsArray:[
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
        location: 'Paradise city',
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
        location: 'Paradise city',
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
        location: 'Paradise city',
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
        location: 'Paradise city',
      },
    ],
    steps:{
      act: [
        {
          stepDesc: 'Step 1',
          completed: false,
          pages:[]
        },
        {stepDesc: 'Step 2', completed: false},
        {stepDesc: 'Step 3', completed: false},
        {stepDesc: 'Step 4', completed: false},
        {stepDesc: 'Step 5', completed: false},
      ],
      venue: [
        {
        stepDesc: 'Start with the basics',
        completed: false,
        pages:[
          {
            title: 'Enter Your Address',
            inputType: 'input',
            information: 'Your information will only be shared with confirmed bookings.',
            options:[
              {
                type: 'text',
                name: "street",
                placeholder: 'Street',
                tag: 'address',
                style: {width: '100%', height: '5vh'},
              },
              {
                type: 'text',
                name: "buildingNumber",
                placeholder: 'Building Number',
                tag: 'address',
                style: {width: '48%', height: '5vh'}
              },
              {
                type: 'text',
                name: "aptSuite",
                placeholder: 'Apartment/Suite',
                tag: 'address',
                style: {width: '48%', height: '5vh'}
              },
              {
                type: 'text',
                name: "townCity",
                placeholder: 'Town/City',
                tag: 'address',
                style: {width: '100%', height: '5vh'}
              },
              {
                type: 'text',
                name: "province",
                placeholder: 'Province',
                tag: 'address',
                style: {width: '48%', height: '5vh'}
              },
              {
                type: 'text',
                name: "postalCode",
                placeholder: 'Postal Code',
                tag: 'address',
                style: {width: '48%', height: '5vh'}
              },
            ]
          },
          {
            title: 'Confirm your exact location',
            inputType: 'map',
            information: 'Your information will only be shared with confirmed bookings.',
            options:[],
          },
          {
            title: 'Choose the genre of music that you want to book',
            inputType: 'genre',
            information: 'This information will helps us match you with the right venues.',
            options:{
               Pop: false,
               Rock: false,
               Metal: false,
               Dance: false,
               Country: false,
               'Hip Hop': false,
               Alternative: false,
               'R&B': false,
               'Solo Artists': false,
               Soul: false,
               Reggae: false,
               Punk: false,
               Latin: false,
               EDM: false,
               Classical: false,
            }
          },
          {
            title: 'How many guests can you welcome for a show?',
            inputType: 'input',
            information: `Divide the square footage of your space by five
            (the approximate number of feet each guest needs in personal space).
            That number equal many people can fit comfortably in your home.`,
            options: [{
              type: 'number',
              name: 'venueCapacity',
              placeholder: 'Venue Capacity',
              tag: null,
              style: {width: '48%', height: '5vh'}
            }]
          },
          {
            title: 'What kind of venue are you listing?',
            inputType: 'input',
            information: ' * Bar * Bands are booking a venue with'
            + ' all the permits and proper equipment. *' +
            ' * Shared Space * Bands are using a community' +
            ' space, permits and equipement are subject to the space. *' +
            ' * Private Space * Bands are using someones house,' +
            ' it can be a room, a garage; you probably don’t have' +
            ' the permits and will need to apply for them.',
            options: [
              {
                type: 'card',
                placeholder: 'Bar',
                style: {width: '100%', height: '10vh'},
                img: 'https://via.placeholder.com/100'
              },
              {
                type: 'card',
                placeholder: 'Shared Space',
                style: {width: '100%', height: '10vh'},
                img: 'https://via.placeholder.com/50'
              },
              {
                type: 'card',
                placeholder: 'Private Space',
                style: {width: '100%', height: '10vh'},
                img: 'https://via.placeholder.com/50'
              },
              {
                type: 'select',
                name: 'venueType',
                tag: null,
                style: {width: '48%', height: '5vh'},
                selectOptions: ['Select one', 'Bar', 'Shared Space', 'Private Space']
              },
            ]
          },
          {
            title: 'How many bathrooms do your guests have access too?',
            inputType: 'input',
            information: 'some kinda info',
            options: [
              {
                type: 'number',
                name: 'number',
                placeholder: 'Number of Bathrooms',
                tag: 'bathrooms',
                style: {width: '50%', height: '5vh'}
              },
              {
                type: 'radio',
                tag: 'bathrooms',
                placeholder: 'Shared Bathroom',
                name: 'sharedBathroom',
                style: {width: '100%', height: '5vh'},
              },
              {
                type: 'radio',
                tag: 'bathrooms',
                placeholder: 'Private Bathroom',
                name: 'privateBathroom',
                style: {width: '100%', height: '5vh'},
              },
            ]
          },
          {
            title: 'What amenities do you offer the artists?',
            inputType: 'input',
            information: 'Providing the essentials helps artists'
            + ' feel at home in your place. *'
            + '*Some venues provide meals, or just coffee and tea.'
            + ' None of these things are required, but sometimes'
            + ' they add a nice touch to help guests feel welcome.',
            options: [
              {
                type: 'checkbox',
                placeholder: 'Essentials (towels, green room)',
                tag: 'amenities',
                name: 'essentials',
                style: {width: '100%'}
              },
              {
                type: 'checkbox',
                placeholder: 'Wifi',
                tag: 'amenities',
                name: 'internet',
                style: {width: '100%'},
              },
              {
                type: 'checkbox',
                placeholder: 'Storage Area',
                tag: 'amenities',
                name: 'storage',
                style: {width: '100%'},
              },
              {
                type: 'checkbox',
                placeholder: 'Backline (drums & amps)',
                tag: 'amenities',
                name: 'backline',
                style: {width: '100%'},
              },
              {
                type: 'checkbox',
                placeholder: 'Food',
                tag: 'amenities',
                name: 'food',
                style: {width: '100%'},
              },
              {
                type: 'checkbox',
                tag: 'amenities',
                name: 'drinks',
                placeholder: 'Drinks',
                style: {width: '100%'},
              },
            ]
          },
        ]
        },
        {
          stepDesc: 'Set the stage',
          completed: false,
          pages:[
            {
              title: 'Photos',
              inputType: 'photo',
              information: 'We recommend at least 8 photos.'
              + ' You can start with just one photo and come back later to add more.'
              + ' Including photos of all the spaces a band'
              + ' can use helps bands imagine playing a show in your space.*'
              + '* Make sure the venue is well-lit. Or bring in extra lights…*'
              + '* Sometimes shooting from a corner (instead of straight-on)'
              + ' gives you a better shot.',
              options:[]
            },
            {
              title: 'Start building your description',
              inputType: 'input',
              information: 'The description will appear at the top'
              + ' of your listing page. We’ve started you out with a'
              + ' few common questions bands have when looking for a venue.'
              + ' You’ll be able to edit and write more next.',
              options: [
                {
                  type: 'text',
                  tag: 'venueDescription',
                  name: 'area',
                  placeholder: 'My space is close to...',
                  style: {width: '100%', height: '5vh'}
                },
                {
                  type: 'text',
                  tag: 'venueDescription',
                  name: 'highlights',
                  placeholder: 'You will love my space because...',
                  style: {width: '100%', height: '5vh'},
                },
                {
                  type: 'card',
                  placeholder: 'My space is good for...',
                  style: {width: '100%'}
                },
                {
                  type: 'radio',
                  tag: 'actType',
                  name: 'solo',
                  placeholder: 'Solo',
                  style: {width: '100%'},
                },
                {
                  type: 'radio',
                  tag: 'actType',
                  name: 'duo',
                  placeholder: 'Duo',
                  style: {width: '100%'},
                },
                {
                  type: 'radio',
                  tag: 'actType',
                  name: 'band',
                  placeholder: 'Band',
                  style: {width: '100%'},
                },
                {
                  type: 'radio',
                  tag: 'actType',
                  name: 'dj',
                  placeholder: 'DJ',
                  style: {width: '100%'},
                }
              ]
            },
            {
              title: 'Create a brief summary of your venue',
              inputType: 'input',
              information: 'This is your summary description.'
              + ' You can edit and change it as you see fit.'
              + ' Keeping it as a brief overview makes it easier'
              + ' for bands to read.',
              options:[
                {
                  type: 'textarea',
                  name: 'venueSummary',
                  placeholder: 'Edit your venue description',
                  tag: 'venueDescription',
                  style: {width: '100%', height: '40vh'},
                }
              ]
            },
            {
              title: 'Create a name for your venue',
              inputType: 'input',
              information: 'Here are some example listings.',
              options:[
                {
                  type: 'text',
                  name: 'venueName',
                  placeholder: 'Listing Title',
                  tag: 'venueDescription',
                  style: {width: '100%', height: '5vh'},
                }
              ]
            },
          ]
        },
        {
          stepDesc: 'Get ready to book shows!',
          completed: false,
          pages:[
            {
              title: 'Have you organized a show in your space before?',
              inputType: 'input',
              information: 'These questions help us recommend setting'
              + ' for your price and how to get shows.',
              options: [
                {
                  type: 'radio',
                  name: 'haveOrganizedShows',
                  tag: 'venueDescription',
                  placeholder: 'I have',
                  style: {width: '100%', height: '5vh'}
                },
                {
                  type: 'radio',
                  name: 'haveOrganizedShows',
                  tag: 'venueDescription',
                  placeholder: 'I\'m new to this',
                  style: {width: '100%', height: '5vh'}
                },
              ]
            },
            {
              title: 'How often do want to host shows?',
              inputType: 'input',
              information: 'It’s OK if you’re not sure yet.'
              + ' You’ll start out by picking the'
              + ' days when you want to host',
              options: [
                {
                  type: 'radio',
                  name: 'often',
                  tag: 'showReg',
                  placeholder: 'As often as possible',
                  style: {width: '100%', height: '5vh'}
                },
                {
                  type: 'radio',
                  name: 'partTime',
                  tag: 'showReg',
                  placeholder: 'Part-time',
                  style: {width: '100%', height: '5vh'}
                },
                {
                  type: 'radio',
                  name: 'undecided',
                  tag: 'showReg',
                  placeholder: 'Not sure yet',
                  style: {width: '100%', height: '5vh'}
                },
              ]
            },
            {
              title: 'How do you want to set your price?',
              inputType: 'input',
              information: 'The right arrangment can'
              + ' change over time. Whatever'
              + ' you choose, you’ll get personalized tips.',
              options: [
                {
                  type: 'radio',
                  tag: 'profitSplit',
                  name: 'split',
                  placeholder: '*%*Price adapts to ticket sales'
                  + ' Set a base price for tickets and offer a'
                  + ' split between you and the artists who is playing'
                  + ' the show. We will automatically dispurce the percentage'
                  + ' you agreed upon.**RECOMMENDED',
                  style: { width: '100%'}
                },
                {
                  type: 'radio',
                  tag: 'profitSplit',
                  name: 'flat',
                  placeholder: '*$*Price is a flat rental fee'
                  + ' Set a base price. We will give you price'
                  + ' tips that you can accept or ignore.',
                  style: {width: '100%'}
                },
              ]
            },
            {
              title: 'Base price - your default rate',
              inputType: 'input',
              information: 'Base price * Some hosts start off with a lower'
              + ' price and raise it after earning positive reviews.',
              options:[
                {
                  type: 'number',
                  tag: null,
                  name: 'price',
                  placeholder: '$per show',
                  style: {width: '50%', height: '5vh'}
                }
              ]
            },
            {
              title: 'Extra fees',
              inputType: 'input',
              information: 'Other fees * Some host choose to cover the'
              + ' cost of a professional sound guy. The fee is charged'
              + ' once per show. **Consider carefully how much you charge because'
              + ' a big fee can make a show very expensive for the artists.',
              options:[
                {
                  type: 'text',
                  tag: 'extras',
                  name: 'soundTech',
                  placeholder: 'Sound tech fee - $per show',
                  style: {width: '50%', height: '5vh'}
                },
                {
                  type: 'text',
                  tag: 'extras',
                  name: 'lightTech',
                  placeholder: 'Light tech fee - $per show',
                  style: {width: '50%', height: '5vh'}
                },
                {
                  type: 'text',
                  tag: 'extras',
                  name: 'posterTech',
                  placeholder: 'Poster design fee - $per show',
                  style: {width: '50%', height: '5vh'}
                },
              ]
            },
            {
              title: 'Set venue rules for artists',
              inputType: 'rules',
              information: 'Artists see your rules before'
              + ' booking. Let them know how you expect them to behave'
              + ' when playing a show.',
              options:[
                {rule: 'rule 1', enforced: false},
                {rule: 'rule 2', enforced: false},
                {rule: 'rule 3', enforced: true},
                {rule: 'rule 4', enforced: false},
                {rule: 'rule 4', enforced: false},
              ]
            },
            {
              title: 'Based on your settings, here\'s what to expect:',
              inputType: 'example',
              information: 'Here are some examples of some acts that are well matched with your venue.'
            },
            {
              title: 'Local laws and taxes',
              inputType: 'laws',
              information: 'It is important to comply with local laws and taxes.'
            }
          ]
        }
      ],
      profile: []
    }
  },
  mutations:{
    changeStep: (state, payload) => {
      let newStep;
       if(payload.change === 'inc'){
         state.steps[payload.type][payload.step].completed = true
       }else if(payload.change === 'dec'){
         payload.step--
         state.steps[payload.type][payload.step].completed = false
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
    showMap:(state, location) => {
      state.mapObject.shown = true
      state.mapObject.location = location
      console.log(state.mapObject)
    }
  },
  actions:{
    changeStep: (context, payload) => {
      context.commit('changeStep', payload)
    },

  }
}
export default appConfig
