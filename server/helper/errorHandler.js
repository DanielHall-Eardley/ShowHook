module.exports = (status, messageArray) => {
  const error = new Error()
  error.status = status
  error.messages = messageArray
  throw error
}