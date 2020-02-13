const getDataFn = async (url) => {
  try {
    const response = await fetch("http://localhost:3000/" + url)
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

export default getDataFn