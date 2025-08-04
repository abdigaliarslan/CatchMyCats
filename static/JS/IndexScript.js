if (window.location.pathname === "index.html"){ 
  window.location.href = "start.html"}

let gameTimer;
let scoreVal = 0;
let missVal = 0;

const score = document.getElementById('score');
const miss = document.getElementById('miss');
const images = [
            "static/images/cat1.png",
            "static/images/cat2.png",
            "static/images/cat3.png",
            "static/images/cat4.png",
            "static/images/cat5.png",
            "static/images/cat6.png",
            "static/images/cat7.png",
            "static/images/cat8.png",
            "static/images/cat9.png",
        ];
        const image = document.getElementById('image');

 function RandomCoordinates(){
            const imgW = image.offsetWidth || 150;
            const imgH = image.offsetHeight || 150;
            const maxX = window.innerWidth - imgW;  
            const maxY = window.innerHeight - imgH;
            
            const x = Math.floor(Math.random() * maxX);
            const y = Math.floor(Math.random() * maxY); 
            
            return {x, y};
        }

function RandomCat(){
            const index = Math.floor(Math.random() * images.length);
            image.src = images[index];
            const {x,y} = RandomCoordinates();
            image.style.left = `${x}px`;
            image.style.top = `${y}px`;
        }

function handleClick(){
            scoreVal++;
            score.textContent = `Hits: ${scoreVal}`;
            RandomCat();
        }

function handleMiss(e){
    if (e.target != image){
        missVal++;
        miss.textContent = `Misses: ${missVal}`;
        }
    }
image.addEventListener('click', handleClick);
document.body.addEventListener('click', handleMiss);

const maxSpeed = localStorage.getItem('maxSpeed');
        const maxLives = localStorage.getItem('maxLives');
        const info = document.getElementById('info');
        if (!maxSpeed){
            info.textContent = 'Speed';
        }
        else{
            info.textContent = `Speed: ${maxSpeed}`;
        }

function startTimer() {
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = `Time: ${timeLeft}`;

  gameTimer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}`;

    if (timeLeft <= 0) {
      clearInterval(gameTimer);
      endGame();
    }
  }, 1000);
}

let timeLeft = parseInt(localStorage.getItem("gameTime")) || 30;
startTimer();



 window.onload = () => {
            RandomCat();
            intervalId = setInterval(RandomCat, 1000 * maxSpeed);
        }

    