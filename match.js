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

   }


        else if(name.includes("H2H")){


            content.innerHTML =
