const BIN_URL = "https://api.jsonbin.io/v3/b/689b302443b1c97be91c6ed6";
const MASTER_KEY = "$2a$10$IKI.MuTNot33ocK335Ynie2Rnj/x3BrG3RpcIdgGdq7dTDUCGWzai";

 function updateTitle(level) {
    const titleEl = document.getElementById("leaderboard-title");
    if (titleEl) {
        titleEl.textContent = `TOP-5 - ${capitalize(level)}`;
    }
}

function loadLeaderboard(level) {
    updateTitle(level);
    const tbody = document.querySelector(".leaderboard tbody");
    const loading = document.getElementById("loading");
    tbody.innerHTML = "";
    loading.style.display = "block";

    fetch(BIN_URL, { headers: { "X-Master-Key": MASTER_KEY } })
        .then(res => res.json())
        .then(data => {
            loading.style.display = "none";
            const allPlayers = Array.isArray(data.record) ? data.record : [];

            // Фильтруем по уровню
            const players = allPlayers.filter(p => p.level === level);

            if (players.length === 0) {
                tbody.innerHTML = `<tr><td colspan="4">No data</td></tr>`;
                return;
            }

           
            const top5 = players.sort((a, b) => b.hits - a.hits).slice(0, 5);

            tbody.innerHTML = top5.map((p, i) => `
                <tr>
                    <td>${i + 1}</td>
                    <td>${p.username}</td>
                    <td>${p.hits}</td>
                    <td>${p.misses}</td>
                </tr>
            `).join('');
        })
        .catch(err => {
            loading.style.display = "none";
            tbody.innerHTML = `<tr><td colspan="4">Error loading data</td></tr>`;
            console.error(err);
        });
}


 function goBack() {
    window.location.href = "index.html";
}

 function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

 document.addEventListener("DOMContentLoaded", () => {
    loadLeaderboard("easy");
});
