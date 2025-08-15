const BIN_URL = "https://api.jsonbin.io/v3/b/689b302443b1c97be91c6ed6";
const MASTER_KEY = "$2a$10$IKI.MuTNot33ocK335Ynie2Rnj/x3BrG3RpcIdgGdq7dTDUCGWzai";


function updateTitle(level) {
    document.getElementById("leaderboard-title").textContent = `Leaderboard - ${level}`;
}

function loadLeaderboard(level) {
    updateTitle(level);

function loadLeaderboard(level) {
    const tbody = document.querySelector(".leaderboard tbody");
    const loading = document.getElementById("loading");
    
    tbody.innerHTML = "";
    loading.style.display = "block";

    fetch(BIN_URL, { headers: { "X-Master-Key": MASTER_KEY } })
        .then(res => res.json())
        .then(data => {
            loading.style.display = "none";
            let players = Array.isArray(data.record) ? data.record : [];
            players.sort((a, b) => (b[`hits_${level}`] || 0) - (a[`hits_${level}`] || 0));

            if (players.length === 0) {
                tbody.innerHTML = `<tr><td colspan="4">Нет данных</td></tr>`;
                return;
            }

            players.forEach((p, idx) => {
                const hits = p[`hits_${level}`] || 0;
                const misses = p[`misses_${level}`] || 0;
                const row = `<tr>
                    <td>${idx + 1}</td>
                    <td>${p.username}</td>
                    <td>${hits}</td>
                    <td>${misses}</td>
                </tr>`;
                tbody.innerHTML += row;
            });
        })
        .catch(err => {
            loading.style.display = "none";
            tbody.innerHTML = `<tr><td colspan="4">Ошибка загрузки данных</td></tr>`;
            console.error("Error:", err.message);
        });
}

function goBack() {
    window.location.href = "index.html";
}
