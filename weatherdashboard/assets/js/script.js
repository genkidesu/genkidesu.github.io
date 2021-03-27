
let searchBtn = document.querySelector('#search-button');
let searchTxt = document.querySelector('#search');
let cityNameEl = document.querySelector('#city-name');
let tempEl = document.querySelector('#temp');
let humidityEl = document.querySelector('#humidity');
let windspeedEl = document.querySelector('#windspeed');
let ultraVEl = document.querySelector('#uv');
let errorEl = document.querySelector("#error-display");
let todayEl = document.querySelector(".border-div");
let fcHeader = document.querySelector('.forecast-area');
let pastSearchEl = document.querySelector('#previous-searches');
let pastSearchVal = document.getElementsByClassName('previous');
let forecastDisplay = document.getElementsByClassName('forecast-display');

let lat = [];
let lon = [];

// The code below stores the saved searches and presents them on the page
let savedSearches = JSON.parse(localStorage.getItem("pastSearches")) || []
for (let i = 0; i < savedSearches.length; i++) {

    let previous = document.createElement('div');
    previous.className = "previous";
    previous.innerText = savedSearches[i];
    pastSearchEl.appendChild(previous);
}




// This function does 3 main things: 
// 1. calls the weather API
// 2. Pushes the city name to saved searches if it is not already there 
// 3. Presents data from weather API to the page
function getWeather(location) {
    let criteria = location;
    let requestURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + criteria + "&appid=9abb85e5e8b5d2bab38c26eda29213c4"

    fetch(requestURL)
        .then(function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                throw Error(response.statusText);
            }
        })
        .then(function (data) {
            if (savedSearches.indexOf(criteria) == -1) {
                savedSearches.unshift(criteria);
                localStorage.setItem('pastSearches', JSON.stringify(savedSearches));
            }
            console.log(data);
            let city = data.city.name;
            let cTemp = Math.floor(data.list[0].main.temp - 273.15);
            let cHumidity = data.list[0].main.humidity;
            let wind = data.list[0].wind.speed;
            let description = data.list[0].weather[0].description;
            let date = data.list[0].dt_txt;
            let iconCode = data.list[0].weather[0].icon;
            let iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
            let icon = document.createElement('img');
            icon.setAttribute("src", iconURL);
            icon.setAttribute("alt", "Weather Icon");
            icon.setAttribute("class", "icon");

            lat = data.city.coord.lat;
            lon = data.city.coord.lon;

            todayEl.style["border-style"] = "solid";
            cityNameEl.innerText = city + " - (" + moment(date).format('DD/MM/YYYY') + ")";
            cityNameEl.appendChild(icon);
            tempEl.innerText = "Temperature: " + cTemp + " °C";
            humidityEl.innerText = "Humidity: " + cHumidity + " %";
            windspeedEl.innerText = "Wind Speed: " + (wind * 3.6).toFixed(1) + "km/h";

            // calls to seperate function for fetching UV.
            getUV();

            // Clear previous 5-day forecast if applicable
            for (let i = 0; i < forecastDisplay.length; i++) {
                forecastDisplay[i].innerHTML = '';
            }

            // Present the 5-day forecast
            let j = -1;
            for (let i = 0; i < forecastDisplay.length; i++) {
                j += 8;
                let dayPlus = data.list[j].dt_txt;
                let tempPlus = Math.floor(data.list[j].main.temp - 273.15);
                let humidityPlus = data.list[j].main.humidity;
                let iconCodePlus = data.list[j].weather[0].icon;
                let iconPlusURL = "http://openweathermap.org/img/w/" + iconCodePlus + ".png";
                let iconPlus = document.createElement('img');
                iconPlus.setAttribute("src", iconPlusURL);
                iconPlus.setAttribute("alt", "Weather Icon");
                iconPlus.setAttribute("class", "icon-future");

                let dateEl1 = document.createElement('li');
                let iconEl = document.createElement('li');
                let tempEl1 = document.createElement('li');
                let humidityEl1 = document.createElement('li');

                dateEl1.innerText = moment(dayPlus).format('DD/MM/YY');
                iconEl.appendChild(iconPlus);
                dateEl1.setAttribute("class", "forecast-line1");
                tempEl1.setAttribute("class", "forecast-line2");
                humidityEl1.setAttribute("class", "forecast-line2");
                tempEl1.innerText = "Temp: " + tempPlus + " °C";
                humidityEl1.innerText = "Humidity: " + humidityPlus + " %";

                fcHeader.style.display = "flex";
                forecastDisplay[i].appendChild(dateEl1);
                forecastDisplay[i].appendChild(iconEl);
                forecastDisplay[i].appendChild(tempEl1);
                forecastDisplay[i].appendChild(humidityEl1);
            }
        })
        .catch((error) => {
            errorEl.style.display = "block";
            errorEl.innerText = "Error - City not found";
            console.log(error);
            return 'fail'
        })
}

// Seperate fetch to get UV - UV data no longer included in the 5 day forecast as of april 1 '21
function getUV() {
    let requestURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=9abb85e5e8b5d2bab38c26eda29213c4";

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let uv = data.value;
            ultraVEl.innerText = "UV Index: " + uv + "  ";
            let scale = document.createElement('div');
            if (uv < 5) {
                scale.setAttribute("class", "uv-low");
            } else if (uv <= 7) {
                scale.setAttribute("class", "uv-moderate");
            } else {
                scale.setAttribute("class", "uv-severe");
            }

            ultraVEl.appendChild(scale);
            console.log(uv);
        })
}

//  Calls the getWeather function when search button is clicked
searchBtn.addEventListener('click', function () {
    errorEl.style.display = "none";
    getWeather(searchTxt.value)
})

// Calls the getWeather function when a previous search is clicked
function addListener() {

    for (let i = 0; i < pastSearchVal.length; i++) {
        pastSearchVal[i].addEventListener('click', function () {
            errorEl.style.display = "none";
            getWeather(pastSearchVal[i].innerText);
            console.log(pastSearchVal[i].innerText);
        })
    }
}
addListener();

function refreshDiv() {

    $("#previous-searches").load("https://genkidesu.github.io/weatherdashboard/dashboard.html", savedSearches);

}