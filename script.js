if (!document.referrer.includes("Start/start.html")) {
        window.location.href = "Start/start.html";
        }


        

        window.onload = () => {
            RandomCat();
            intervalId = setInterval(RandomCat, 1000 * maxSpeed);
        }