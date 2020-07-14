const { validationResult } = require("express-validator")
const errorHandler = require("./errorHandler")

const checkForValidationErr = req => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messageArray = errors.errors.map(err => {
      return `${err.param} ${err.msg} instead received ${err.value}`
    })


    errorHandler(422, messageArray);
  }
} 

module.exports = checkForValidationErr