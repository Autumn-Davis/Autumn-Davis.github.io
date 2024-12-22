const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

let names = ["Nibbles McSqueakerton", "Froderick Hoppington", "Pip Fluffwing"];
let locations = ["the Moon", "your mom's pantry", "Alpha Centauri"];
let actions = ["yelled: THE HOLY DAIRY GRAIL!!!", "portalled to the supermarket for crackers", "put on an Indiana Jones hat and ran away"];

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

randomize.addEventListener('click', result);

function result() {

    console.log("testing");

    let newStory = "It was 94 farenheit in the forrest, so :insertx: left home to forrage. When they got to :inserty:, they spotted a massive wheel of cheese rolling toward them, so they :insertz:. Bob saw the whole thing, but was not surprised — :insertx: is 300 pounds, clumsy, and loves cheese.";

    if(document.getElementById("uk").checked) {
        const weight = Math.round(300 / 14);
        const temperature =  Math.round((94 - 32) * (5/9));
        newStory = newStory.replace("300 pounds", weight + ' stone');
        newStory = newStory.replace("94 fahrenheit", temperature + ' centigrade');
    }

    if(customName.value !== '') {
        const name = customName.value;
        console.log(name)
        newStory = newStory.replace(/:insertx:/g, name);
    } else {
        newStory = newStory.replace(/:insertx:/g, randomValueFromArray(names));
    }

    newStory = newStory.replace(':inserty:', randomValueFromArray(locations));
    newStory = newStory.replace(':insertz:', randomValueFromArray(actions));

    story.textContent = newStory;
    story.style.visibility = 'visible';

    
}
