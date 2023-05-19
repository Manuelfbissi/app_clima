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
          <p>Temperatura maxima: ${temp_max} °C</p>
          <p>Temperatura minima: ${temp_min} °C</p>
          <p>Humedad: ${humidity}%</p>
          <p>Sensación termica: ${feels_like} °C</p>
          <p>Presion atmosferica: ${pressure} hPa</p>
          <p>Velocidad de viento: ${speed} km/h</p>
          
        `;
        weatherDiv.innerHTML = weatherHTML;
  
        // Mostrar gráfico del clima
        const chartHTML = `<img src="https://openweathermap.org/img/w/${icon}.png" alt="${main}">`;
        chartDiv.innerHTML = chartHTML;
  
        
      })
  
      .catch((error) => {
        weatherDiv.textContent = "No se pudo obtener información climática";
      });
  });
  
  
  