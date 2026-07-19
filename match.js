const API_KEY = "1db6f76e7e16451244f6a725a02582ab";


// Get Fixture ID from URL

const urlParams = new URLSearchParams(window.location.search);

const fixtureId = urlParams.get("id");


if(!fixtureId){

    document.getElementById("content").innerHTML =
    "<h2>❌ Match ID Missing</h2>";

}else{


fetch(`https://v3.football.api-sports.io/fixtures?id=${fixtureId}`,{

method:"GET",

headers:{
"x-apisports-key":API_KEY
}

})


.then(res=>res.json())


.then(data=>{


const match = data.response[0];


if(!match){

document.getElementById("content").innerHTML =
"<h2>❌ Match Not Found</h2>";

return;

}



// League

document.getElementById("league").innerHTML =
`${match.league.country} • ${match.league.name}`;



// Home Team

document.getElementById("homeTeam").innerHTML =
match.teams.home.name;


document.getElementById("homeLogo").src =
match.teams.home.logo;



// Away Team

document.getElementById("awayTeam").innerHTML =
match.teams.away.name;


document.getElementById("awayLogo").src =
match.teams.away.logo;



// Time

let matchDate = new Date(match.fixture.date);


document.getElementById("matchTime").innerHTML =
"🕒 " + matchDate.toLocaleString();



})



.catch(error=>{


console.log(error);
// ===============================
// Tab System
// ===============================

const tabs = document.querySelectorAll(".tab");
const content = document.getElementById("content");


tabs.forEach(tab => {

    tab.addEventListener("click", function(){


        // Active Tab Change

        tabs.forEach(t => {
            t.classList.remove("active");
        });


        this.classList.add("active");



        let name = this.innerText;



        if(name.includes("Prediction")){

            content.innerHTML = `

            <h2>🎯 Prediction</h2>

            <p>🏠 Home Win: Coming Soon</p>

            <p>🤝 Draw: Coming Soon</p>

            <p>🚩 Away Win: Coming Soon</p>

            <hr>

            <p>⚽ Over/Under & BTTS Data Coming Soon</p>

            `;


        }


        else if(name.includes("Statistics")){


            content.innerHTML = `

            <h2>📊 Statistics</h2>

            <p>
            Match Statistics Coming Soon...
            </p>

            `;


        }


        else if(name.includes("H2H")){


            content.innerHTML = `

            <h2>🤝 Head To Head</h2>

            <p>
            Previous Matches Coming Soon...
            </p>

            `;


        }


        else if(name.includes("Team Form")){


            content.innerHTML = `

            <h2>📈 Team Form</h2>

            <p>
            Last 5 Matches Coming Soon...
            </p>

            `;


        }


        else if(name.includes("Lineups")){


            content.innerHTML = `

            <h2>👥 Lineups</h2>

            <p>
            Starting Lineups Coming Soon...
            </p>

            `;


        }


        else if(name.includes("Standings")){


            content.innerHTML = `

            <h2>🏆 Standings</h2>

            <p>
            League Table Coming Soon...
            </p>

            `;


        }


    });


});

document.getElementById("content").innerHTML =
"<h2>❌ API Error</h2>";


});


}
