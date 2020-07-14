import {apiHost} from '../global.js'

const getAdminDataFn = async (url, token) => {
  const res = await fetch(apiHost + url, {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    }
  })

  const response = await res.json();
  return response
}

export default getAdminDataFn