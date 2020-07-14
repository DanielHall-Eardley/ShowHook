const jwt = require("jsonwebtoken")
const errorHandler = require("../helper/errorHandler")

const isAuth = async (req, res, next) => {
  try {
    const token = req.get("Authorization").split(" ")[1]
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (error) {
    if (!error.status) {
      error.status = 401;
    }

    error.messages = [error.message]
    next(error)
  }
}

module.exports = isAuth 