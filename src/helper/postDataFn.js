const postDataFn = async (url, body, headers, method="POST") => {
  try {
    const response = await fetch("http://localhost:3000/" + url, {
      method: method,
      body: body,
      headers: headers
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

export default postDataFn