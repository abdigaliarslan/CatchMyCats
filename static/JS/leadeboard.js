const BIN_URL = "https://api.jsonbin.io/v3/b/689b302443b1c97be91c6ed6";
const MASTER_KEY = "$2a$10$IKI.MuTNot33ocK335Ynie2Rnj/x3BrG3RpcIdgGdq7dTDUCGWzai";

let allData = [];

function fetchData() {
    fetch(BIN_URL, { headers: { "X-Master-Key": MASTER_KEY } })
        .then(res => res.json())
        .then(data => {
            allData = data.record || [];
            changeLevel('easy');  
        })
        .catch(err => console.error(err));
}

function changeLevel(level) {
    const hitsKey = `hits_${level}`;
    const missesKey = `misses_${level}`;

    const sorted = [...allData]
        .sort((a, b) => (b[hitsKey] || 0) - (a[hitsKey] || 0))
        .slice(0, 5);

    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = "";

    sorted.forEach((player, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${player.username}</td>
                <td>${player[hitsKey] || 0}</td>
                <td>${player[missesKey] || 0}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

fetchData();
