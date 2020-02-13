const paginate = (page, perPage, array) => {
  let start = array.length - (page + 1) * perPage
  let end = start + perPage

  if (start < 0) {
    start = 0
    end = 3
  }

  const paginatedArray = array.slice(start, end)

  return paginatedArray
}

module.exports = paginate