function endGame() {
  clearInterval(gameTimer);  

  const popup = document.getElementById("gameOverPopup");
    const scoreText = document.getElementById("finalScoreText");
    scoreText.textContent = `Hits: ${scoreVal} | Misses: ${missVal}`;
    popup.classList.remove("hidden");
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

