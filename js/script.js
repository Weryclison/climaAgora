const apiKey = "7b9f422f661e150887983c462ee8dd15";
const apiCountryURL = "https://flagsapi.com/PT/flat/64.png";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");
const sensacao = document.querySelector("#sensacao");
const tempMax = document.querySelector("#temp-max");
const tempMin = document.querySelector("#temp-min");
const diaSemana = document.querySelector("#dia-semana");
const hora = document.querySelector(".hora");
//
//
const diasDaSemana = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];
const hoje = new Date();
const diaDaSemanaString = diasDaSemana[hoje.getDay()];

const dataDeHoje = new Date();
const horaAtual = dataDeHoje.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});
const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();
  return data;
};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  countryElement.setAttribute(
    "src",
    ` https://flagsapi.com/${data.sys.country.toUpperCase()}/flat/64.png
  `
  );
  umidityElement.innerText = `Humidade de ${data.main.humidity}%`;
  windElement.innerText = `Vento à ${data.wind.speed}km/h`;
  let sensacaoTratada = data.main.feels_like;
  sensacaoTratada = Math.round(sensacaoTratada);
  sensacao.innerText = `Sensação térmica de ${sensacaoTratada} °C`;
  diaSemana.innerText = diaDaSemanaString;
  hora.innerText = horaAtual;
  let horaMaxTratada = data.main.temp_max;
  horaMaxTratada = Math.round(horaMaxTratada) + 2;
  tempMax.innerText = `Temp max: ${horaMaxTratada} °C`;
  let horaMinTratada = data.main.temp_min;
  horaMinTratada = Math.round(horaMinTratada) - 2;
  tempMin.innerText = `Temp min: ${horaMinTratada} °C`;
  weatherContainer.classList.remove("hide");
};
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value;
  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;
    showWeatherData(city);
  }
});
