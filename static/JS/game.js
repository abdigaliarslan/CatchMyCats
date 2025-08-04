function endGame() {
  clearInterval(gameTimer);  

  const username = localStorage.getItem("username");
  const maxSpeed = parseInt(localStorage.getItem("maxSpeed"));
  const level = maxSpeed === 1 ? "easy" : maxSpeed === 3 ? "medium" : "hard";

  const data = {
    username: username,
    [`hits_${level}`]: scoreVal,
    [`misses_${level}`]: missVal
  };

  fetch("/save_score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(response => {
    console.log("Results saved:", response);

     
    const popup = document.getElementById("gameOverPopup");
    const scoreText = document.getElementById("finalScoreText");
    scoreText.textContent = `Hits: ${scoreVal} | Misses: ${missVal}`;
    popup.classList.remove("hidden");
  })
  .catch(error => {
    console.error("Error saving score:", error);
  });
}


function showGameOverPopup(hits, misses) {
  const modal = document.getElementById("gameOverModal");
  const resultText = document.getElementById("resultText");

  resultText.textContent = `Hits: ${hits}\nMisses: ${misses}`;
  modal.classList.remove("hidden");
}

function restartGame() {
  window.location.reload();
}

function goToMenu() {
  window.location.href = "/start";
}

