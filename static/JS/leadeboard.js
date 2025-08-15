const BIN_URL = "https://api.jsonbin.io/v3/b/689b302443b1c97be91c6ed6";
const MASTER_KEY = "$2a$10$IKI.MuTNot33ocK335Ynie2Rnj/x3BrG3RpcIdgGdq7dTDUCGWzai";

 function updateTitle(level) {
    const titleEl = document.getElementById("leaderboard-title");
    if (titleEl) {
        titleEl.textContent = `Leaderboard - ${capitalize(level)}`;
    }
}

 function loadLeaderboard(level) {
    updateTitle(level);

    const tbody = document.querySelector(".leaderboard tbody");
    const loading = document.getElementById("loading");

    if (!tbody || !loading) return;

    tbody.innerHTML = "";
    loading.style.display = "block";

    fetch(BIN_URL, { headers: { "X-Master-Key": MASTER_KEY } })
        .then(res => {
            if (!res.ok) throw new Error(`Read error: ${res.status}`);
            return res.json();
        })
        .then(data => {
            loading.style.display = "none";

            const players = Array.isArray(data.record) ? data.record : [];

             players.sort((a, b) => (b[`hits_${level}`] || 0) - (a[`hits_${level}`] || 0));

            if (players.length === 0) {
                tbody.innerHTML = `<tr><td colspan="4">No data</td></tr>`;
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
            tbody.innerHTML = `<tr><td colspan="4">Error loading data</td></tr>`;
            console.error("Error:", err.message);
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
