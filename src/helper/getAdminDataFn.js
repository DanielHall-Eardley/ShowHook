const getAdminDataFn = async (url, token) => {
  try {
    const response = await fetch("http://localhost:3000/" + url, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    })

    const responseData = await response.json();

    if (response.status !== 200) {
      const error = new Error();
      error.messages = responseData;
      throw error;
    }
    return responseData
  } catch (error) {
    return error
  }
}

export default getAdminDataFn