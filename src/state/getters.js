import { 
  isBefore, 
  add, 
  sub, 
  differenceInDays, 
  lastDayOfMonth,
  format,
  toDate,
  compareDesc
} from 'date-fns'

export default {
  getComponent: state => {
    return state[state.selectedUserType][state.profileCreationStep].pages[state.profileCreationPage]
  },
  getProfileCreationProgress: state => {
    return {
      page: state.profileCreationPage,
      step: state.profileCreationStep
    }
  },
  getProfileCreationArray: state => {
    return state[state.selectedUserType]
  },
  getShowSummary: state => {
    const pastSection = {
      title: 'Past',
      shows: []
    }

    const sectionArray = []

    for(let show of state.showSummary) {
      const now = toDate(new Date())
      const showDate = toDate(Date.now(show.showDate))
    
      if (isBefore(showDate, now)) {
        pastSection.shows.push(show)
      }

      const timeDiff = differenceInDays(showDate, now)
      if (timeDiff < 7) {
        if (!sectionArray[0]) {
          sectionArray[0] = {
            title: 'This Week',
            shows: [show]
          }
          continue;
        }

        sectionArray[0].shows.push(show)
      }

      const daysInMonth = format(lastDayOfMonth(now), "d")
      if (timeDiff > daysInMonth) {
        if (!sectionArray[1]) {
          sectionArray[1] = {
            title: 'This Month',
            shows: [show]
          }
          continue;
        }

        sectionArray[1].shows.push(show)
      }

      if (timeDiff > 365) {
        if (!sectionArray[2]) {
          sectionArray[2] = {
            title: 'This Week',
            shows: [show]
          }
          continue;
        }

        sectionArray[2].shows.push(show)
      }
    }

    for (let section of sectionArray) {
      section.shows.sort((a, b) => compareDesc(a.showDate, b.showDate))
    }

    const obj = {
      future: sectionArray,
      past: pastSection
    }
    console.log(obj)
    return obj
  }
}