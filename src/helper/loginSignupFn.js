import {apiHost} from '../global.js'

const loginSignupFn = async (body, url) => {
  const res = await fetch(apiHost + url, {
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