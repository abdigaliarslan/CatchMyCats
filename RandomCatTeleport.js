let intervalId;
let scoreVal = 0;
let missVal =0;
const score = document.getElementById('score');
const miss = document.getElementById('miss');
const images = [
            "source/cat1.png",
            "source/cat2.png",
            "source/cat3.png",
            "source/cat4.png",
            "source/cat5.png",
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

 window.onload = () => {
            RandomCat();
            intervalId = setInterval(RandomCat, 1000 * maxSpeed);
        }