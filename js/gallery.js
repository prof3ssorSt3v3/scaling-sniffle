//DOMContentLoaded or IIFE
const cacheName = 'IcannotThinkOfANameRightNowImages';

(() => {
  //this IIFE runs when the import() method is called
})();

function getPosition() {
  //find the user's location
  let options = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 0,
  };
}

function ftw(position) {
  //geolocation success
}
function wtf(err) {
  //geolocation fail
}

async function getAllCacheImages() {}

function buildGallery(urls) {
  //build the HTML on the page with img tags using urls
}
