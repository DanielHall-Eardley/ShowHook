const { validationResult } = require("express-validator")
const errorHandler = require("./errorHandler")

const checkForValidationErr = req => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorHandler(422, errors.errors);
  }
} 

module.exports = checkForValidationErr