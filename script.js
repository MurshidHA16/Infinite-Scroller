//Constant variables
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')
let photosArray = [];
let ready = false;
let imagesLoaded =0;
let totalImages = 0;

//Unsplash API

const count = 30;
const apiKey = `fTCAKD4TAUPdrKOcBDWyjDRrcMIJYzY4Ne8UdkbHA3A`;
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Check if all imgs were loaded
function imageLoaded(){
    
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        
    }
}

//Create Elements for Links and Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run function for each object in photosArray
    photosArray.forEach((photo)=>{
        //Create <a> to link to unsplash
        const item = document.createElement("a");
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        //Create <img> for photo
        const img = document.createElement("img");
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        //Put <img> inside <a>, then put both inside ImageContainer Element
        img.addEventListener('load', imageLoaded);
        item.appendChild('img');
        imageContainer.appendChild(item);
    });
};
//Get photos from unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiURL);
        photosArray= await response.json();
        displayPhotos();
    } catch(error){
        alert('unable to fetch photos')
    }
}
//Check to see if scrolling near bottom of page, load more photos

window.addEventListener("scroll", ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos()
    }
})

//On Load
getPhotos()