module.exports = (status, messageArray) => {
  const error = new Error()
  error.status = status
  error.messageArray = messageArray
  throw error
}