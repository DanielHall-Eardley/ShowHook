const loginSignupFn = async (commit, payload, type, redirect) => {
  commit("clearErrors");
  try {
    const response = await fetch("http://localhost:3000/admin/" + type, {
      body: JSON.stringify(payload),
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

    commit(type + "Successful", {
      data: responseData,
      redirect
    });
  } catch (error) {
    commit("updateErrors", error);
  }
}

export default loginSignupFn