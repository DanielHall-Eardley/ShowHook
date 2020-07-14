import {apiHost} from '../global.js'

const getDataFn = async (url) => {
  const res = await fetch(apiHost + url)
  const response = await res.json();
  return response
}

export default getDataFn