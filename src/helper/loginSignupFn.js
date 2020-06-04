const loginSignupFn = async (body, type) => {
  try {
    const response = await fetch("http://localhost:3000/admin/" + type, {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

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

export default loginSignupFn