if (!document.referrer.includes("Start/start.html")) {
        window.location.href = "Start/start.html";
        }

        let score = 0;
        let lives = 3;
        let intervalId;
        const images = [
            "source/cat1.png",
            "source/cat2.png",
            "source/cat3.png",
            "source/cat4.png",
            "source/cat5.png",
        ];
        const image = document.getElementById('image');
        const livesDisplay = document.getElementById('lives');
        const gameOver = document.getElementById('game-over');
        


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

        function updateLives(){
            livesDisplay.textContent = "❤️".repeat(lives);
            if (lives==0){
                alert("Game Over");
                location.reload();
            }
        }

        function handleClick(e){
            e.stopPropagation();    
            score++;
            document.getElementById('score').textContent = score;
            RandomCat();
        }

        image.addEventListener('click', handleClick);

        function updateLives() {
            livesDisplay.innerText = "❤️".repeat(Math.max(0, lives));
            livesDisplay.style.color = "red";
            livesDisplay.style.transition = "0.2s";
            if (lives == 0) {
                GameOver()
            }};
            


        document.addEventListener('click', function (e) {
            if (e.target !== image) {
                lives--;
                updateLives();
            }
        });
        
        function GameOver(){
            console.log(">>> GameOver CALLED");
            document.getElementById('game-over').classList.remove('hidden');
            clearInterval(intervalId)
            if(image) image.remove();
        }

        function restartGame(){
            location.reload();
        }

        const maxSpeed = localStorage.getItem('maxSpeed');
        const info = document.getElementById('info');
        if (!maxSpeed){
            info.textContent = 'Please set your max speed';
        }
        else{
            info.textContent = `Your max speed is ${maxSpeed} seconds`;
        }

        
        window.onload = () => {
            RandomCat();
            intervalId = setInterval(RandomCat, 1000 * maxSpeed);
        }