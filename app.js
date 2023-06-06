//declaracion variables 
const API_KEY = "73ac1f031d2bc7c0be5b5725642b3935";
const form = document.querySelector("form");
const weatherDiv = document.querySelector("#weather");
const chartDiv = document.querySelector("#weather-chart");

//ubicacion buscada 
const lastLocation = localStorage.getItem("lastLocation");
if (lastLocation) {
  form.elements.location.value = lastLocation;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const location = form.elements.location.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
  
    fetch(url)
      .then((devolver) => devolver.json())
      .then((data) => {
        const { temp_min, temp_max, humidity, feels_like, pressure } = data.main;
        const { speed } = data.wind;
        const { main, icon } = data.weather[0];
  
        // Mostrar información climática
        const weatherHTML = `
      <div class="cubos mb-2">
        <p>Temperatura maxima: ${temp_max} °C</p>
        </div>
        <div class="cubos mb-2">
        <p>Temperatura minima: ${temp_min} °C</p>
        </div>
        <div class="cubos mb-2">
        <p>Humedad: ${humidity}%</p>
        </div>
        <div class="cubos mb-2">
        <p>Sensación termica: ${feels_like} °C</p>
        </div>
        <div class="cubos mb-2">
        <p>Presion atmosferica: ${pressure} hPa</p>
        </div>
        <div class="cubos mb-2">
        <p>Velocidad de viento: ${speed} km/h</p>
        </div>
        
      `;
        weatherDiv.innerHTML = weatherHTML;
  
        // Mostrar gráfico del clima
        const chartHTML = `<img src="https://openweathermap.org/img/w/${icon}.png" alt="${main}">`;
        chartDiv.innerHTML = chartHTML;

        const borrarDiv = document.querySelector(".borrar");
        borrarDiv.innerHTML = "";
  
        
      })
      
  
      .catch((error) => {
        weatherDiv.textContent = "No se pudo obtener información climática";
      });
  });


  //traigo el mapa 
const apiKey = "qlV8LVWiQOvvVjpNBj4GxGumHU4yK3sz";
const mapDiv = document.getElementById("map");
const width = 400;
const height = 300;
const zoom = 8;
const ciudadguradado = document.querySelector("#ciudad");


form.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = form.elements.location.value;
  const mapUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=${apiKey}&center=${encodeURIComponent(location)}&size=${width},${height}&zoom=${zoom}`;

  
  mapDiv.innerHTML = `<img  src="${mapUrl}" alt="Mapa de ${location}">`;
  console.log (mapDiv)

  const ciudadHTML = `
        <p>EL DESTINO ELEGIDO ES: ${location}</p>
        
        
      `;
      ciudadguradado.innerHTML = ciudadHTML;
});
  
  
  