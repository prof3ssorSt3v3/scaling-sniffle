document.addEventListener('DOMContentLoaded', init);
//or use an IIFE
const cacheName = 'IReallyNeedSomeSleep';

async function init() {
  //when either HTML file loads...
  addListeners();
  switch (document.body.id) {
    case 'home':
      //index.html has loaded
      break;
    case 'gallery':
      //gallery.html has loaded
      // let module = await import('./gallery.js');
      import('./gallery.js');
      //load the gallery.js file ONLY if we are on gallery.html
      break;
    default:
    //some other page in the site
  }
}

function addListeners() {
  //add listeners for home page and EVERY PAGE
  let imageForm = document.getElementById('imageForm');
  if (imageForm) {
    //make sure imageForm exists on current page
    imageForm.addEventListener('submit', handleImageSubmit);
  }
}

async function handleImageSubmit(ev) {
  ev.preventDefault();
  //stop the form submitting and reloading the page
  let cache = await caches.open(cacheName);
  let imageFile = document.getElementById('images').files[0];
  console.log(imageFile);
  let response = new Response(imageFile, {
    status: 200, // HTTP Status
    headers: {
      'content-type': imageFile.type, // Mime Type
      'content-length': imageFile.size, // size in Bytes
      'x-original-name': imageFile.name,
    },
  });
  if (!imageFile.type.startsWith('image/')) return;
  //the mime type must include "image/"
  let ext = imageFile.type.replace('image/', '');
  // image/png => png  image/gif => gif   image/jpg => jpg
  let filename = `/${crypto.randomUUID()}.${ext}`;
  console.log(filename);
  let url = new URL(filename, location.origin); // new Request()
  // console.log(filename);
  // console.log(url);
  await cache.put(url, response);
}
