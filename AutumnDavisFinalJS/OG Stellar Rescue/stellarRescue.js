let posI;
let vel;
let k;


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60)
  posI = createVector(50, 50); //spaceship
  vel = createVector(1.5, 1.5);
  print(vel.mag());
  vel.setMag(8);
  noCursor();
  k=0;
}


function draw() {
  background(26, 40, 40);
  moveSpaceship();
  drawWinGame();
  
  if (mouseIsPressed) {
    drawAlien();
  } else {
    drawOGship();
  }
  
  if (dist(mouseX, mouseY, 50, 400) < 15){
    drawWinGame();
    drawAlien();
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
      "Fergus: I am passing through enemy territory... there might be some hungry VOID REAPERS around.",
    barDoodad: "👽",
    timeout: 7 * 60,
    kineticRate: 2,
    startTime: 0,
  },
  {
    message:
      "Ship: CRITICAL SYSTEM FAILURE, ENGINES HAVE BEEN HIT BY VOID REAPERS.",
    barDoodad: "  ▫️",
    font: 'Courier New',
    timeout: 6 * 60,
    kineticRate: 5,
    startTime: 0,
  },
  {
    message:
      "Fergus: I am crashing! I need to evacuate NOW!  I will need your help to come up with something quickly...",
    barDoodad: "👽",
    timeout: 10 * 60,
    kineticRate: 2,
    startTime: 0,
  },
  {
    message: 
      "BOOM!",
    font: 'Courier New',
    barDoodad: "💥",
    timeout: 2 * 60,
    kineticRate: 11,
    startTime: 0,
    
  },
  {
    message:
      "Help FERGUS run away from the evil Void Reapers and get back to his ship! Click and hold anywhere on the mousepad to start playing, but BE CAREFUL NOT TO LET THE VOID SHIP GET TOO CLOSE TO YOU!",
    font: 'Courier New',
    barDoodad: "",
  timeout: 15*60,
  kineticRate: 3,
  startTime: 0,
  },
  {
    message:
      "",
    barDoodad: "",
  timeout: 500*60,
  kineticRate: 100,
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
  fill(50, 93, 65);
  textSize(30);
  strokeWeight(1);
  stroke(37, 72, 50);
  text(txt + currentPhase.barDoodad, windowWidth / 3.5, windowHeight / 15, windowWidth - windowWidth / 3);
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
      drawStar(x + stagger, y, 7.5, 3.5);
    }
  }
}


function drawStar(x, y, radI, radO) {
  push();
  k++
  if(40%k){
    fill (242, 157, 75, random(5, 50))
  }
  

  noStroke();
  translate(x + random(-0.5, +0.5), y + random(-0.5, +0.5));
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

function drawSpaceship() {
  push();
    // Void
    push();
    stroke(81, 97, 94);
    strokeWeight(2);
    ellipseMode(CENTER);
    fill(0,0,0);
    ellipse (posI.x, posI.y, 45, 40)
    pop();
  stroke(81, 97, 94);
  strokeWeight(0.75);
  rectMode(CENTER);
  fill(22, 40, 40)
  rect(posI.x, posI.y, 10, 10);
  arc(posI.x + 5, posI.y, 20, 10, -0.5 * PI, 0.5 * PI);
  arc(posI.x - 5, posI.y, 20, 10, 0.5 * PI, -0.5 * PI);
  fill(81, 97, 94);
  arc(posI.x, posI.y - 5, 20, 10, PI, 0);
  fill(37, 72, 50);
  triangle(posI.x, posI.y + 15, posI.x + 4, posI.y + 8, posI.x - 4, posI.y + 8);
  fill(50, 93, 65);
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
  // ellipseMode(CENTER);
  // stroke(5, 16, 14);
  // fill(163, 201, 250, 120);
  // ellipse(mouseX, mouseY, 20, 25);
  
}
