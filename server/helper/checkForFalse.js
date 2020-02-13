const checkForFalse = (value, {req}) => {
  if (!value) {
    return false
  }

  return true
}

module.exports = checkForFalse