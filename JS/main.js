


// ! today variables
let todayName = document.getElementById("today-date-name");
let todayNumber = document.getElementById("today-date-day-number");
let todayMounth = document.getElementById("today-date-day-mounth");
let todayLocation = document.getElementById("today-location");
let todayTemp = document.getElementById("today-temp");
let todayConditionImg = document.getElementById("today-condation-img");
let todayConditionText = document.getElementById("today-condation-text");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("wind-direction");

// ^ search input 
let searchInput = document.getElementById("search");

//? next variables 
let nextDay = document.querySelectorAll(".next-day-name");
let nextMaxTemp = document.querySelectorAll(".next-max-temp");
let nextMinTemp = document.querySelectorAll(".next-min-temp");
let nextConditionImg = document.querySelectorAll(".next-img-contaition");
let nextConditionText = document.querySelectorAll(".next-condation-text");




//^ function get api ..........



async function getApiWeather(name) {
    let data;

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=81a655689b2b433b9fb131653233012&q=${name}&days=3`);

        if (!response.ok) {
            throw new Error(`Failed to fetch weather data: ${response.status}`);
        }

        data = await response.json();

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }

    return data;
}

//^ function display today........



function showTodayData(data) {


    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleString("en-us" , {weekday : "long"})
    todayMounth.innerHTML = todayDate.toLocaleString("en-us" , {month : "long"})
    todayNumber.innerHTML = todayDate.getDate()



    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;

    let iconUrl = data.current.condition.icon;
    if (!iconUrl.startsWith("http://") && !iconUrl.startsWith("https://")) {
        iconUrl = "https://" + iconUrl;
    }

    todayConditionImg.setAttribute("src", iconUrl);

    todayConditionText.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + "%";
    wind.innerHTML = data.current.wind_kph;
    windDirection.innerHTML = data.current.wind_dir;
}

//^ function display next data...........



function showNextData(data) {
    for (let i = 0; i < 2; i++) {

        let nextDate = new Date(data.forecast.forecastday[i+1].date)

       nextDay[i].innerHTML = nextDate.toLocaleString("en-us" , {weekday : "long"})


        nextMaxTemp[i].innerHTML = data.forecast.forecastday[i + 1].day.maxtemp_c;
        nextMinTemp[i].innerHTML = data.forecast.forecastday[i + 1].day.mintemp_c;
        let iconUrl = data.forecast.forecastday[i + 1].day.condition.icon;
        if (!iconUrl.startsWith("http://") && !iconUrl.startsWith("https://")) {
            iconUrl = "https://" + iconUrl;
        }
        nextConditionImg[i].setAttribute("src", iconUrl);
        nextConditionText[i].innerHTML = data.forecast.forecastday[i+1].day.condition.text
    }
}


async function StartApp(cityName = "alex") {
    try {
        let weatherData = await getApiWeather(cityName);
        if (weatherData) {
            showTodayData(weatherData);
            showNextData(weatherData);
        } else {
            console.error("No weather data available.");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

StartApp();




//^ addEvenet for search...........


searchInput.addEventListener("keyup" , function()
{
   StartApp(searchInput.value)

})