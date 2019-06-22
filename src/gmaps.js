import keys from './../keys.js'

const API_KEY = keys.map
const CALLBACK_NAME = 'gmapsCallback'

let initialized = !!window.google;
let resolveInitPromise;
let rejectInitPromise;
// This promise handles the initialization
// status of the google maps script.
const initPromise = new Promise((resolve, reject) => {
  resolveInitPromise = resolve;
  rejectInitPromise = reject;
});

export default function init() {
  if (initialized) return initPromise;

  initialized = true;

  window[CALLBACK_NAME] = () => resolveInitPromise(window.google);
  const script = document.createElement('script');
  script.async = true;
  script.defer = true;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${CALLBACK_NAME}`;
  script.onerror = rejectInitPromise;
  document.querySelector('head').appendChild(script);

  return initPromise;
}
