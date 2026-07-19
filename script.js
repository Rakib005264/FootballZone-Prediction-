const API_KEY = "1db6f76e7e16451244f6a725a02582ab";const API_KEY = "তোমার_API_KEY";

fetch("https://v3.football.api-sports.io/fixtures?live=all", {
  method: "GET",
  headers: {
    "x-apisports-key": API_KEY
  }
})
.then(res => res.json())
.then(data => {

  let matches = data.response;

  let html = "";

  if(matches.length === 0){
    html = "No Live Matches Found";
  } else {

    matches.forEach(match => {

      html += `
      <div class="match">
        <h3>
        ${match.teams.home.name} 
        vs 
        ${match.teams.away.name}
        </h3>

        <p>
        Kick Off: ${match.fixture.date}
        </p>

        <p>
        Score: ${match.goals.home} - ${match.goals.away}
        </p>

      </div>
      `;

    });

  }

  document.getElementById("matches").innerHTML = html;

})
.catch(error => {
 console.log(error);
});<script src="script.js"></script>
