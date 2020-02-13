module.exports = (array) => {
  let sum = 0

  array.forEach (rev => {
    sum += rev.rating
  })

  return sum / array.length
}