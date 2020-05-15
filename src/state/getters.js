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
}