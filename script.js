const game = document.getElementById("game");
const player = document.getElementById("player");
const over = document.getElementById("over");
const scoreText = document.getElementById("scoreText");
const scoreBox = document.getElementById("score");

let playerX = 140;
let score = 0;
let speed = 3;
let playing = true;

/* TOUCH MOVE (finger follow) */
game.addEventListener("touchmove", e => {
  const rect = game.getBoundingClientRect();
  const touchX = e.touches[0].clientX - rect.left;
  playerX = touchX - 20;

  playerX = Math.max(0, Math.min(280, playerX));
  player.style.left = playerX + "px";
});

/* Desktop mouse move (bonus) */
game.addEventListener("mousemove", e => {
  const rect = game.getBoundingClientRect();
  playerX = e.clientX - rect.left - 20;
  playerX = Math.max(0, Math.min(280, playerX));
  player.style.left = playerX + "px";
});

function spawnEnemy(){
  if(!playing) return;

  const enemy = document.createElement("div");
  enemy.className = "enemy";
  enemy.style.left = Math.random() * 280 + "px";
  game.appendChild(enemy);

  let y = -60;

  const fall = setInterval(()=>{
    if(!playing){
      clearInterval(fall);
      return;
    }

    y += speed;
    enemy.style.top = y + "px";

    // 🔥 COLLISION (plane hits ball)
    const dx = Math.abs(parseInt(enemy.style.left) - playerX);
    if(y > 380 && dx < 30){
      crash();
      clearInterval(fall);
    }

    if(y > 480){
      score++;
      scoreBox.innerText = "Score: " + score;
      speed += 0.05;
      enemy.remove();
      clearInterval(fall);
    }
  },16);
}

function crash(){
  playing = false;
  scoreText.innerText = "Final Score: " + score;
  over.style.display = "flex";
}

setInterval(spawnEnemy, 900);
