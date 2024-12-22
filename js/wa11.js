// OG CODE HERE:

// const displayedImage = document.querySelector('.displayed-img');
// const thumbBar = document.querySelector('.thumb-bar');


// const btn = document.querySelector('button');
// const overlay = document.querySelector('.overlay');


// /* Array of Images declared here: */
// const pics = ["../img/Creek.jpg", "../img/Flowers.jpg", "../img/Foggy path.jpg", "../img/Misty path.jpg", "../img/Sun spots.webp"]
// /* Array of each respective alt text declared here: */
// const alts = ["Creek","Flowers", "Foggy path", "Misty forest", "Sun spots"]


// /* Looping motion */
// for (let i=0; i < 5; i++){
//    const newImage = document.createElement('img');
//    newImage.setAttribute('src', pics[i]);
//    newImage.setAttribute('alt', alts[i]);
//    thumbBar.appendChild(newImage);
//    newImage.addEventListener("click", ()=>{
//        displayedImage.setAttribute('src', pics[i]);
//        displayedImage.setAttribute('alt', alts[i]);
//    }
// )
// }


// /* "Darker"/"Lighter button" */
// btn.addEventListener('click', ()=>{
//    const button = btn.getAttribute('class');
//    if (button == 'dark'){
//        btn.setAttribute('class', 'light');
//        btn.textContent = 'Make Lighter';
//        overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
//    } else {
//        btn.setAttribute('class', 'dark');
//        btn.textContent = 'Make Darker';
//        overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
//    }
// }
// )


//DEBUGGED USING CHATGPT HERE: (still doesn't work properly)
const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('.dark');
const overlay = document.querySelector('.overlay');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

// Arrays of images and alt text
const pics = [
  "../img/Creek.jpg",
  "../img/Flowers.jpg",
  "../img/Foggy path.jpg",
  "../img/Misty forest.jpg",
  "../img/Sun spots.webp"
];
const alts = ["Creek", "Flowers", "Foggy path", "Misty forest", "Sun spots"];

// Initialize current image index
let currentIndex = 0;

// Function to update the displayed image
function updateImage(index) {
  displayedImage.setAttribute('src', pics[index]);
  displayedImage.setAttribute('alt', alts[index]);
}

// Looping through and creating thumbnail images
pics.forEach((pic, i) => {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', pic);
  newImage.setAttribute('alt', alts[i]);
  thumbBar.appendChild(newImage);

  newImage.addEventListener("click", () => {
    currentIndex = i; // Update the current image index
    updateImage(currentIndex); // Update the displayed image
  });
});

// "Darker"/"Lighter" button functionality
btn.addEventListener('click', () => {
  const buttonClass = btn.getAttribute('class');
  if (buttonClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Make Lighter';
    overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Make Darker';
    overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
  }
});

// Next button functionality
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % pics.length; // Loop back to first image
  updateImage(currentIndex);
});

// Previous button functionality
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + pics.length) % pics.length; // Loop to last image
  updateImage(currentIndex);
});

// Initialize the first image on load
updateImage(currentIndex);
