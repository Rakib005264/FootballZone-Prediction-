const API_KEY = "1db6f76e7e16451244f6a725a02582ab";


// Match Show Function

function showMatches(matches, elementId){

    let html = "";


    if(!matches || matches.length === 0){

        html = "<p>No Matches Found</p>";

    }else{


        matches.forEach(match => {


            let status = match.fixture.status.short;


            let score = "";


            if(
                status === "FT" ||
                status === "1H" ||
                status === "2H" ||
                status === "HT"
            ){

                score = `
                <p>
                ⚽ Score:
                ${match.goals.home ?? 0}
                -
                ${match.goals.away ?? 0}
                </p>`;

            }else{

                score = `
                <p>
                ⏳ Match Not Started
                </p>`;

            }



            html += `

            <div class="match">

            <div class="team">

            ${match.teams.home.name}

            🆚

            ${match.teams.away.name}

            </div>


            <p class="time">

            🕒 ${new Date(match.fixture.date).toLocaleString()}

            </p>


            ${score}


            </div>

            `;


        });


    }


    document.getElementById(elementId).innerHTML = html;


}





// API Fetch Function

function getMatches(url, elementId, filterType){


fetch(url, {

method:"GET",

headers:{

"x-apisports-key": API_KEY

}

})


.then(res=>res.json())


.then(data=>{


let matches = data.response;


// Today Match থেকে Live এবং Finished বাদ

if(filterType === "today"){


matches = matches.filter(match=>{


let status = match.fixture.status.short;


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


.catch(error=>{


console.log(error);


document.getElementById(elementId).innerHTML =
"API Error";


});


}





// 🔴 Live Matches

getMatches(

"https://v3.football.api-sports.io/fixtures?live=all",

"liveMatches"

);





// 📅 Today Upcoming Matches Only

let today = new Date().toISOString().split("T")[0];


getMatches(

`https://v3.football.api-sports.io/fixtures?date=${today}`,

"todayMatches",

"today"

);





// 🔜 Upcoming Matches

getMatches(

"https://v3.football.api-sports.io/fixtures?next=10",

"upcomingMatches"

);
