import {apiHost} from '../global.js'

const loginSignupFn = async (body, type) => {
  const res = await fetch(apiHost + type, {
    body: JSON.stringify(body),
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });

  const response = await res.json();
  return response
}

export default loginSignupFn