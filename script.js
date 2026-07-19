const API_KEY = "1db6f76e7e16451244f6a725a02582ab";

// ===============================
// Show Matches
// ===============================

function showMatches(matches, elementId) {

    let html = "";

    if (!matches || matches.length === 0) {
        document.getElementById(elementId).innerHTML =
            "<p>No Matches Found</p>";
        return;
    }

    matches.forEach(match => {

        const status = match.fixture.status.short;

        let score = "";

        if (
            status === "FT" ||
            status === "1H" ||
            status === "2H" ||
            status === "HT"
        ) {

            score = `
                <p class="score">
                    ⚽ ${match.goals.home ?? 0} - ${match.goals.away ?? 0}
                </p>
            `;

        } else {

            score = `
                <p class="score">
                    ⏳ Match Not Started
                </p>
            `;
        }

        html += `
<a href="match.html?id=${match.fixture.id}" class="match-link" style="text-decoration:none;color:white;">

<div class="match">

<div class="league">
🌍 ${match.league.country} • 🏆 ${match.league.name}
</div>

<div class="teams">

<div>
<img src="${match.teams.home.logo}" width="45">
<br>
<b>${match.teams.home.name}</b>
</div>

<h3>🆚</h3>

<div>
<img src="${match.teams.away.logo}" width="45">
<br>
<b>${match.teams.away.name}</b>
</div>

</div>

<p class="time">
🕒 ${new Date(match.fixture.date).toLocaleString()}
</p>

${score}

</div>

</a>
`;
    });

    document.getElementById(elementId).innerHTML = html;
}// ===============================
// Get Matches
// ===============================

function getMatches(url, elementId, filter = "") {

    fetch(url, {
        method: "GET",
        headers: {
            "x-apisports-key": API_KEY
        }
    })

    .then(res => res.json())

    .then(data => {
console.log(data);
        let matches = data.response || [];

        // Today Matches থেকে Live ও Finished ম্যাচ বাদ দাও
        if (filter === "today") {

            matches = matches.filter(match => {

                const status = match.fixture.status.short;

                return (
                    status !== "FT" &&
                    status !== "1H" &&
                    status !== "2H" &&
                    status !== "HT"
                );

            });

        }

        showMatches(matches, elementId);

    })

    .catch(error => {

        console.error(error);

        document.getElementById(elementId).innerHTML =
            "<p>❌ API Error</p>";

    });

}// ===============================
// Load Live Matches
// ===============================

getMatches(
    "https://v3.football.api-sports.io/fixtures?live=all",
    "liveMatches"
);

// ===============================
// Load Today's Matches
// ===============================

const today = new Date().toLocaleDateString('en-CA');

getMatches(
    `https://v3.football.api-sports.io/fixtures?date=${today}`,
    "todayMatches",
    "today"
);

// ===============================
// Load Upcoming Matches
// ===============================

getMatches(
    "https://v3.football.api-sports.io/fixtures?next=10",
    "upcomingMatches"
);
