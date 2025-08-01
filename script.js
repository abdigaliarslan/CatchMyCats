if (!document.referrer.includes("Start/start.html")) {
        window.location.href = "Start/start.html";
        }

        let score = 0;
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
            score++;
            document.getElementById('score').textContent = score;
            RandomCat();
        }
        

        const maxSpeed = localStorage.getItem('maxSpeed');
        if (!maxSpeed){
            document.getElementById('info').textContent = 'Please set your max speed';
        }
        else{
            document.getElementById('info').textContent = `Your max speed is ${maxSpeed} seconds`;
        }
         
        window.onload = RandomCat;
        setInterval(RandomCat, maxSpeed * 1000);