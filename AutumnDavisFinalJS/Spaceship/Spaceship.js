// Game state variables
let score = 0;
let level = 1;
let lives = 3;
let gameInterval;
let canvas, ctx;

// Game elements (player, enemies, etc.)
let player;
let enemies = [];

const startBtn = document.getElementById("start-btn");
const scoreDiv = document.getElementById("score");
const levelDiv = document.getElementById("level");
const livesDiv = document.getElementById("lives");
const messageDiv = document.getElementById("game-message");
const canvasElement = document.getElementById("game-canvas");
canvas = canvasElement.getContext("2d");

// Initialize game
function startGame() {
  score = 0;
  level = 1;
  lives = 3;
  updateDisplay();
  gameLoop();
}

// Update the score, level, and lives on the DOM
function updateDisplay() {
  scoreDiv.innerText = `Score: ${score}`;
  levelDiv.innerText = `Level: ${level}`;
  livesDiv.innerText = `Lives: ${lives}`;
}




let posI;
let vel;
let k;


function setup() {
  //createCanvas(800, 800);
  frameRate(60)
  posI = createVector(50, 50); //spaceship
  vel = createVector(1.5, 1.5);
  print(vel.mag());
  vel.setMag(8);
  noCursor();
  k=0;
}


function draw() {
  background(28, 25, 35);
  moveSpaceship();
  drawWinGame();
  
  if (mouseIsPressed) {
    drawAlien();
    drawDog();
  } else {
    drawOGship();
  }
  
  if (dist(mouseX, mouseY, 50, 400) < 15){
    drawWinGame();
    drawAlien();
    drawDog();
  } else{
    drawStarfield1();
    drawText();
    drawSpaceship();
    drawPlanet();
  }
}


const phases = [
  {
    message:
      "👽 My dog and I are passing through enemy territory... there might be some hungry Hellgrimites around.",
    barDoodad: "",
    timeout: 7 * 60,
    kineticRate: 2,
    startTime: 0,
  },
  {
    message:
      "🚀 CRITICAL SYSTEM FAILURE, ENGINES HAVE BEEN HIT BY HELGRIMITES.",
    barDoodad: "  ▫️",
    font: 'Courier New',
    timeout: 6 * 60,
    kineticRate: 5,
    startTime: 0,
  },
  {
    message:
      "👽 WE ARE CRASHING! My dog and I need to evacuate NOW!  Our emergency suits have pretty small air tanks.  I will need to come up with something quickly...",
    barDoodad: "",
    timeout: 10 * 60,
    kineticRate: 2,
    startTime: 0,
  },
  {
    message:
      "🐶 Arf!",
    barDoodad: "",
    timeout: 2 * 60,
    kineticRate: 0.5,
    startTime: 0,
    
  },
  {
    message: 
      "BOOM!",
    font: 'Courier New',
    barDoodad: "",
    timeout: 2 * 60,
    kineticRate: 11,
    startTime: 0,
    
  },
  {
    message:
      "👽 Help me run away from the Hellgrimite ship and get my dog back! Click and hold anywhere to start playing.",
    barDoodad: "",
  timeout: 60*60,
  kineticRate: 2,
  startTime: 0,
  },
];

let currentPhaseIndex = 0;
let goToNextPhase = false;

let dragging = false

function mouseDragged (){
  dragging = true
}

function mouseClicked(){
  if (dragging) {
    dragging = false;
  }
  else{
    goToNextPhase = true;
  }
}


function drawText() {

  let currentPhase = phases[currentPhaseIndex];
  if (
    goToNextPhase ||
    frameCount > currentPhase.timeout + currentPhase.startTime
  ) {
    currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
    currentPhase = phases[currentPhaseIndex];
    currentPhase.startTime = frameCount
    goToNextPhase = false;
  }

  const elapsed = frameCount - currentPhase.startTime;
  const numChars = elapsed / currentPhase.kineticRate;
  const txt = currentPhase.message.slice(0, numChars);
  
  push();
  if(currentPhase.font){
    textFont(currentPhase.font)
  }
  else{textFont("Times New Roman")}
  fill(34, 81, 73);
  textSize(17);
  strokeWeight(1);
  stroke(72, 116, 99);
  text(txt + currentPhase.barDoodad, 800 / 3.5, 800 / 15, 800 - 800 / 3);
  pop();

}



function drawWinGame(){
  push();
  textAlign(CENTER);
  textFont("Times New Roman");
  fill(242, 166, 73);
  textSize(30);
  text('You won!', 70, 50)
  pop();
}


function drawStarfield1() {
  let offset = width / 15;
  for (let i = 0; i < 15; i++) {
    let x = offset / 2 + i * offset;
    for (let j = 0; j < 15; j++) {
      let y = offset / 2 + j * offset;
      let stagger = 0;
      if (j % 2 == 1) {
        stagger = offset / 2;
      }
      drawStar(x + stagger, y, 5, 2.5);
    }
  }
}


function drawStar(x, y, radI, radO) {
  push();
  k++
  if(40%k){
    fill (242, 166, 73, random(10,30))
  }
  

  noStroke();
  translate(x + random(-1, +1), y + random(-1, +1));
  let angle = 0;
  const deltaAngle = (2 * PI) / 10;
  beginShape();
  for (let i = 0; i < 10; i++) {
    let angle = i * deltaAngle;
    const rad = i % 2 ? radI : radO; //ternary operation
    //for example if q is odd, q=3, else if q is even, q=4

    let x = rad * cos(angle);
    let y = rad * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);

  pop();
}

function drawDog() {
  push();
  beginShape();
  stroke(72, 116, 99);
  strokeWeight(1.7);
  fill(34, 81, 73);
  ellipseMode(CENTER);
  ellipse (50, 400, 12, 8);
  arc (50-10, 400-5, 5, 5, 0.8*PI, 0.25*PI)
  ellipse (50-6, 400-3, 7, 7);
  line (50+6, 400+3, 50+6.5, 400+6)
  line (50-4, 400+3, 50-4.5, 400+6)
  line (50-1.5, 400+4, 50-1, 400+6)
  line (50+3.5, 400+3, 50+4, 400+6)
  arc (50+9, 400-3, 7, 5, 0.15*PI, 0.75*PI)
  arc (50-2, 400-4, 5, 5, 1.2*PI, 0.25*PI)
  endShape();
  
  pop();
}

function drawSpaceship() {
  push();
  //frameRate(60);
  stroke(5, 16, 14);
  strokeWeight(0.75);
  rectMode(CENTER);
  //fill(53, 91, 140);
  fill(242,166,73)
  rect(posI.x, posI.y, 10, 10);
  arc(posI.x + 5, posI.y, 20, 10, -0.5 * PI, 0.5 * PI);
  arc(posI.x - 5, posI.y, 20, 10, 0.5 * PI, -0.5 * PI);
  fill(163, 201, 250);
  arc(posI.x, posI.y - 5, 20, 10, PI, 0);
  fill(242, 104, 73);
  triangle(posI.x, posI.y + 15, posI.x + 4, posI.y + 8, posI.x - 4, posI.y + 8);
  fill(242, 166, 73);
  triangle(
    posI.x + 8,
    posI.y + 12,
    posI.x + 10,
    posI.y + 6,
    posI.x + 6,
    posI.y + 8
  );
  triangle(
    posI.x - 8,
    posI.y + 12,
    posI.x - 10,
    posI.y + 6,
    posI.x - 6,
    posI.y + 8
  );
  pop();
}

function drawPlanet() {
  push();
  noStroke();
  ellipseMode(CENTER);
  fill(242, 104, 73);
  ellipse(50, 50, 200, 200);
  fill(242, 132, 68);
  ellipse(50, 50, 175, 175);
  //fill(242, 166, 73);
  ellipse(50, 50, 150, 150);
  fill(191, 65, 54);
  ellipse(50, 50, 100, 100);
  fill(242, 104, 73);
  ellipse(50, 50, 75, 75);
  fill(242, 132, 68);
  ellipse(50, 50, 25, 25);
  fill(242, 166, 73);
  ellipse(50, 50, 5, 5);
  fill(242, 166, 73);
  pop();
}

function moveSpaceship() {
  if (mouseIsPressed) {
    let toMouse = createVector(mouseX - posI.x, mouseY - posI.y).setMag(8);
    vel = toMouse;
  } else {
    let toHome = createVector(50 - posI.x, 50 - posI.y).setMag(3);
    vel = toHome;
  }
  posI.add(vel);
}

function drawAlien() {
  push();
  stroke(72, 116, 99);
  strokeWeight(2);
  fill(34, 81, 73);
  ellipse(mouseX, mouseY, 9, 11); //body
  line(mouseX + 5.5, mouseY, mouseX + 8, mouseY - 3);
  line(mouseX - 5.5, mouseY, mouseX - 8, mouseY - 3);
  line(mouseX + 5.5, mouseY + 4, mouseX + 4, mouseY + 6);
  line(mouseX - 5.5, mouseY + 4, mouseX - 4, mouseY + 6);
  ellipse(mouseX, mouseY - 6, 8, 9);
  pop();
  push();
  stroke(145, 176, 157, 50);
  fill(163, 201, 250, 50);
  ellipse(mouseX, mouseY - 6, 10, 10);
  pop();
}

function drawOGship() {
  textAlign(CENTER);
  textSize(50);
  text('🚀', mouseX, mouseY)
}