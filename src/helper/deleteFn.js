const deleteFn = async (url, token) => {
  return await fetch("http://localhost:3000/" + url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  })
}

export default deleteFn