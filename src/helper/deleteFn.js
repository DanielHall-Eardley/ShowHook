import {apiHost} from '../global.js'

const deleteFn = async (url, token) => {
  return await fetch(apiHost + url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  })
}

export default deleteFn