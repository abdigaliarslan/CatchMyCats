 function endGame() {
  clearInterval(gameTimer);  

  const popup = document.getElementById("gameOverPopup");
  const scoreText = document.getElementById("finalScoreText");
  scoreText.textContent = `Hits: ${scoreVal} | Misses: ${missVal}`;
  popup.classList.remove("hidden");

  appendResult(localStorage.getItem("username"), scoreVal, missVal);
}
  

function showGameOverPopup(hits, misses) {
  const modal = document.getElementById("gameOverModal");
  const resultText = document.getElementById("resultText");

  resultText.textContent = `Hits: ${hits}\nMisses: ${misses}`;
  modal.classList.remove("hidden");

  appendResult(localStorage.getItem("username"), hits, misses);
}

function restartGame() {
  window.location.reload();
}

function goToMenu() {
  window.location.href = "../index.html";
}

const BIN_URL = "https://api.jsonbin.io/v3/b/689b302443b1c97be91c6ed6";
const MASTER_KEY = "$2a$10$IKI.MuTNot33ocK335Ynie2Rnj/x3BrG3RpcIdgGdq7dTDUCGWzai";

function appendResult(username, hits, misses) {
    const level = localStorage.getItem("level"); // Берём текущий уровень
    const newEntry = {
        username,
        hits,
        misses,
        level
    };

    fetch(BIN_URL, {
        headers: { "X-Master-Key": MASTER_KEY }
    })
    .then(res => {
        if (!res.ok) throw new Error(`Read error: ${res.status}`);
        return res.json();
    })
    .then(readData => {
        let existingArray = Array.isArray(readData.record) ? readData.record : [];
        existingArray.push(newEntry); // Просто добавляем новую запись

        return fetch(BIN_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": MASTER_KEY
            },
            body: JSON.stringify(existingArray)
        });
    })
    .then(updateRes => updateRes.json())
    .then(updated => {
        console.log("Updated JSON:", updated);
    })
    .catch(err => {
        console.error("Error:", err.message);
    });
}

