//DOMContentLoaded or IIFE
const cacheName = 'IReallyNeedSomeSleep';

(() => {
  //this IIFE runs when the import() method is called
  getAllCacheImages();
  getPosition();
})();

function getPosition() {
  //find the user's location
  let options = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 1000 * 60 * 60 * 24,
  };
  navigator.geolocation.getCurrentPosition(ftw, wtf, options);
}

function ftw(position) {
  //geolocation success
  console.log(position);
  document.querySelector('header h1').textContent = position.coords.latitude + ',' + position.coords.longitude;
}
function wtf(err) {
  //geolocation fail
}

async function getAllCacheImages() {
  let cache = await caches.open(cacheName);
  let requests = await cache.keys();
  //returns an array of Request objects
  let responses = await Promise.all(requests.map((req) => cache.match(req)));
  //requests.map() loop through all the request objects and return an array
  // the function called by map() will return a promise
  // each promise is created by cache.match()
  let blobs = await Promise.all(responses.map((resp) => resp.blob()));
  //responses.map() loop through all the response objects and return an array
  // the function called by map() will return a promise
  // each promise is created by response .blob()
  // Promise.all takes an array of Promises and returns an array of results
  let urls = blobs.map((blob) => URL.createObjectURL(blob));
  //synchronous method
  buildGallery(urls);
}

function buildGallery(urls) {
  //build the HTML on the page with img tags using urls
  console.log(urls);
  document.querySelector('main > section').innerHTML = urls
    .map((url) => {
      let name = url.replace(`blob:${location.origin}/`, '');
      return `<p data-ref="${name}"><img src="${url}" alt="${name}" /></p>`;
    })
    .join('');
}
