const API_KEY = "1db6f76e7e16451244f6a725a02582ab";

fetch("https://v3.football.api-sports.io/fixtures?live=all", {
  method: "GET",
  headers: {
    "x-apisports-key": API_KEY
  }
})
.then(res => res.json())
.then(data => {
  console.log(data);
  alert("API Connected Successfully!");
})
.catch(error => {
  console.error(error);
  alert("API Error!");
});
