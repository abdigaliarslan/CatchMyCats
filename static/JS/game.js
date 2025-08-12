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

  appendResults(localStorage.getItem("username), hits, misses);
}

function restartGame() {
  window.location.reload();
}

function goToMenu() {
  window.location.href = "../index.html";
}

const BIN_URL = "https://api.jsonbin.io/v3/b/689b302443b1c97be91c6ed6";
const MASTER_KEY = "$2a$10$IKI.MuTNot33ocK335Ynie2Rnj/x3BrG3RpcIdgGdq7dTDUCGWzai";

async function appendResult(username, hits, misses) {
  try {
    const readRes = await fetch(BIN_URL, {
      headers: { "X-Master-Key": MASTER_KEY }
    });
    if (!readRes.ok) throw new Error(`Read error: ${readRes.status}`);
    const readData = await readRes.json();

    const existingArray = Array.isArray(readData.record) ? readData.record : [];

    existingArray.push({ username, hits, misses });

    const updateRes = await fetch(BIN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY
      },
      body: JSON.stringify(existingArray)
    });
    if (!updateRes.ok) throw new Error(`Update error: ${updateRes.status}`);
    const updated = await updateRes.json();

    console.log("Updated JSON:", updated);
  } catch (err) {
    console.error("Error:", err.message);
  }
}
