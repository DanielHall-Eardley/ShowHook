import {apiHost} from '../global.js'

const postDataFn = async (url, body, headers, method="POST") => {
  const res = await fetch(apiHost + url, {
    method: method,
    body: body,
    headers: headers
  })

  const response = await res.json();
  return response
}

export default postDataFn