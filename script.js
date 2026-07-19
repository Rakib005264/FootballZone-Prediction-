const API_KEY = 1db6f76e7e16451244f6a725a02582ab

const headers = {
  "x-apisports-key": API_KEY
};

async function loadFixtures() {
  try {
    const response = await fetch(
      "https://v3.football.api-sports.io/fixtures?live=all",
      {
        method: "GET",
        headers: headers
      }
    );

    const data = await response.json();

    const matches = data.response;

    let html = "<h2>⚽ Live Matches</h2>";

    if (matches.length === 0) {
      html += "<p>No live matches now.</p>";
    } else {
      matches.forEach(match => {
        html += `
        <div style="border:1px solid #ddd;padding:10px;margin:10px;border-radius:10px;">
          <h3>${match.teams.home.name} vs ${match.teams.away.name}</h3>
          <p>Score: ${match.goals.home} - ${match.goals.away}</p>
          <p>Status: ${match.fixture.status.short}</p>
        </div>
        `;
      });
    }

    document.body.innerHTML += html;

  } catch (err) {
    console.log(err);
  }
}

loadFixtures();
