const API_KEY = "1db6f76e7e16451244f6a725a02582ab";

// URL থেকে fixture id নাও
const params = new URLSearchParams(window.location.search);
const fixtureId = params.get("id");

if (!fixtureId) {
    document.getElementById("content").innerHTML =
        "<h2>❌ Match ID Not Found</h2>";
    throw new Error("No Fixture ID");
}

// ম্যাচের তথ্য লোড
fetch(`https://v3.football.api-sports.io/fixtures?id=${fixtureId}`, {
    method: "GET",
    headers: {
        "x-apisports-key": API_KEY
    }
})
.then(res => res.json())
.then(data => {

    if (!data.response || data.response.length === 0) {
        document.getElementById("content").innerHTML =
            "<h2>❌ Match Not Found</h2>";
        return;
    }

    const match = data.response[0];

    // League
    document.getElementById("league").innerHTML =
        `${match.league.country} • ${match.league.name}`;

    // Home Team
    document.getElementById("homeTeam").textContent =
        match.teams.home.name;

    document.getElementById("homeLogo").src =
        match.teams.home.logo;

    // Away Team
    document.getElementById("awayTeam").textContent =
        match.teams.away.name;

    document.getElementById("awayLogo").src =
        match.teams.away.logo;

    // Match Time
    const date = new Date(match.fixture.date);

    document.getElementById("matchTime").textContent =
        "🕒 " + date.toLocaleString();

    // Prediction অংশে আপাতত ম্যাচের তথ্য দেখাও
    document.getElementById("content").innerHTML = `
        <h2>🎯 Prediction</h2>

        <p><b>${match.teams.home.name}</b> vs <b>${match.teams.away.name}</b></p>

        <p>🏆 ${match.league.country} • ${match.league.name}</p>

        <p>⏳ Prediction Module Coming Soon...</p>
    `;

})
.catch(err => {
    console.error(err);

    document.getElementById("content").innerHTML =
        "<h2>❌ API Error</h2>";
});
