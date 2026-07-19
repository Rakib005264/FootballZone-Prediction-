const API_KEY = "তোমার_API_KEY";

fetch("https://v3.football.api-sports.io/fixtures?live=all", {
  method: "GET",
  headers: {
    "x-apisports-key": API_KEY
  }
})
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(error => console.error(error));
