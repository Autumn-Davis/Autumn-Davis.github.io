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

// Create a new enemy (to simulate different levels of difficulty)
function spawnEnemy() {
  // Add code here to create enemy objects based on level
  let enemy = { x: Math.random() * canvasElement.width, y: 0, speed: level * 0.5 };
  enemies.push(enemy);
}

// Handle key presses (move the player)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    player.x -= 10;
  } else if (e.key === "ArrowRight") {
    player.x += 10;
  }
});

// Draw everything on the canvas
function draw() {
  canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);
  
  // Draw player
  canvas.fillRect(player.x, player.y, 30, 30);
  
  // Draw enemies
  enemies.forEach(enemy => {
    canvas.fillRect(enemy.x, enemy.y, 30, 30);
    enemy.y += enemy.speed;
    if (enemy.y > canvasElement.height) {
      enemies.splice(enemies.indexOf(enemy), 1);
      lives -= 1;
      updateDisplay();
    }
  });
  
  // Win/Loss condition
  if (lives <= 0) {
    clearInterval(gameInterval);
    messageDiv.innerText = "You Lost!";
  } else if (score >= 100) {
    clearInterval(gameInterval);
    messageDiv.innerText = "You Won!";
  }
}

// Game loop
function gameLoop() {
  player = { x: canvasElement.width / 2, y: canvasElement.height - 40 };
  gameInterval = setInterval(() => {
    draw();
    spawnEnemy();
  }, 1000 / 60);  // 60 FPS
}

// Start the game when the button is clicked
startBtn.addEventListener("click", startGame);
