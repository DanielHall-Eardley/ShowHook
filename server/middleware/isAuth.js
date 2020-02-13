const jwt = require("jsonwebtoken")
const errorHandler = require("../helper/errorHandler")

const isAuth = async (req, res, next) => {
  try {
    const token = req.get("Authorization").split(" ")[1]
    const verified = jwt.verify(token, process.env.JWT_SECRET)

    if (!verified) {
      errorHandler(401, ["You could not be verified, please login to continue"])
    }
    
    req.userId = req.body.userId
    next()
  } catch (error) {
    if (!error.status) {
      error.status = 401;
    }

    if (error.message === "jwt expired" && error.message) {
      error.messages = error.message
    }
    next(error)
  }
}

module.exports = isAuth 