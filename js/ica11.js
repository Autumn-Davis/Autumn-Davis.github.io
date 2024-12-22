const story = document.querySelector('.fortune');

let numChildren = ["1", "2", "3"];
let partName = ["Nibbles McSqueakerton", "Froderick Hoppington", "Pip Fluffwing"];
let location = ["the Moon", "your mom's pantry", "Alpha Centauri"];
let job = ["DIY tiny home content creator", "Emergency room surgeon", "Gynocologist"];



var children = randomValueFromArray(numChildren);
var name = randomValueFromArray(partName);
var home = randomValueFromArray(location);
var occupation = randomValueFromArray(job);

document.getElementById("button").addEventListener("click", function(e){
    console.log("Pressed");
    alert("test");
    fortune(children, name, home, occupation);
})

function randomValueFromArray(array){
    const random = Math.floor(Math.random()*array.length);
    return array[random];
}

function fortune(input1, input2, input3, input4){
    document.getElementById("paragraph").innerHTML = "new text";
    console.log("test");

    let newStory = "You will be a X in Y, and married to Z with N kids.";

    newStory = newStory.replace('X', randomValueFromArray(input4));
    newStory = newStory.replace('Y', randomValueFromArray(input3));
    newStory = newStory.replace('Z', randomValueFromArray(input2));
    newStory = newStory.replace('N', randomValueFromArray(input1));

    story.textContent = newStory;
    story.style.visibility = 'visible';
}