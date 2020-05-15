export default (date, addTime) => {
  let options = {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  }

  if (addTime) {
    options = {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: "numeric",
      minute: "numeric"
    }
  }

  return new Date(date).toLocaleString("en-CA", options)
}