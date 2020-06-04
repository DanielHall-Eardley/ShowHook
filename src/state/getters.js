import { 
  isBefore, 
  add, 
  sub, 
  differenceInDays, 
  lastDayOfMonth,
  format,
  toDate,
  compareDesc,
  parseISO
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
    let nextIndex = 0
    let weekIndex = null
    let monthIndex = null
    let yearIndex = null
    const pastSection = {
      title: 'Past',
      shows: []
    }

    const sectionArray = []

    for(let show of state.showSummary) {
      const now = toDate(new Date())
      const showDate = parseISO(show.showDate)
      
      if (isBefore(showDate, now)) {
        pastSection.shows.push(show)
        continue;
      }

      const timeDiff = differenceInDays(showDate, now)

      if (timeDiff < 7) {
        if (weekIndex === null) {
          weekIndex = nextIndex
          nextIndex++
          sectionArray[weekIndex] = {
            title: 'This Week',
            shows: [show]
          }
          continue;
        }

        sectionArray[weekIndex].shows.push(show)
      }

      const daysInMonth = parseInt(format(lastDayOfMonth(now), "d"))
      if (timeDiff < daysInMonth && timeDiff > 7) {
        if (monthIndex === null) {
          monthIndex = nextIndex
          nextIndex++
          sectionArray[monthIndex] = {
            title: 'This Month',
            shows: [show]
          }
          continue;
        }
        
        sectionArray[monthIndex].shows.push(show)
      }

      if (timeDiff < 365 && timeDiff > daysInMonth) {
        if (yearIndex === null) {
          yearIndex = nextIndex
          nextIndex++
          sectionArray[yearIndex] = {
            title: 'This Year',
            shows: [show]
          }
          continue;
        }

        sectionArray[yearIndex].shows.push(show)
      }
    }
    
    for (let section of sectionArray) {
      section.shows = section.shows.sort((a, b) => {
        return new Date(a.showDate) - new Date(b.showDate)
      })
    }

    const obj = {
      future: sectionArray,
      past: pastSection
    }
    return obj
  }
}