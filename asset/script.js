const apiKey = '80e28d196e1af97d4b106db3b8a1ecb5';
const cityNameInput=$('#city-name');
const searchBUtton=$('#search-button');
const weatherInfo=$('#weather-info');
const cityList=$('#city-list');
const weatherList=$('#weather-list');


let filteredOutData = new Map();
// city name,temeperature,humidity,wind
let filterHelper = [];

let searchHistory=[]
// this part is for clicking and inputting  a text and triggering an event  which is getweather of a current date
// and getting forecast weather of the city
searchBUtton.click(function(event){
    
    event.preventDefault();
    const cityName=cityNameInput.val()
    if (cityName) {
        getWeather(cityName)}

     else{alert(`plese enter a city name`)}
    if(!searchHistory.includes(cityName)){
        searchHistory.push(cityName)
        updateSearchHistory()
    }
    cityNameInput.val('');

})
// this will trigger the get weather function and display the five day forecast of the city

//     function getWeather(cityName){
    
//     //     const currentWeatherURl=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
//     //     // console.log(currentWeatherURl)
//     // // const forecastWeatherURL=`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
//     // function getUrl(lat,lon){ 
//     // return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
//     // }

//     // const forecastWeatherURL = 
//     // // console.log(forecastWeatherURL)
//     // fetch(currentWeatherURl)
//     // .then(function(response){
//     //     if(response.ok){
//     //         response.json()
//     //         .then(function(data){
//     //             console.log("current weather data :",data)
//     //             displayCurrentWeather(data)
function getWeather(cityName){
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
    
    function getUrl(lat,lon){ 
        return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        }


    fetch(currentWeatherUrl)
    .then(function(response){
       if (response.ok){
        response.json()
        .then(function(data){
            console.log(data)
            displayCurrentWeather(data)
            
        })
        }})
        // code above is only for fetching a current weatjer city
        // code below will help me to get the forecast for upcoming 5 days
        fetch(forecastWeatherUrl)
        .then(function(response){
            if(response.ok){
                response.json()
                .then(function(data){
                    console.log(data)
                    data.list.forEach(function(item){
                    if (item.dt_txt.includes("12:00:00")){
                        console.log(item)
                        displayForecastWeather(item)

// i want to create like a list to dispaly the upcoming forecast weather
                        
            }
            })

            })
}
 } )
            
        
    
    // Append the string to the weatherInfo element
};
    
//    things we need to display
// name,date,icon,image of weather condition,temperature,humidity,wind speed

   
    function displayCurrentWeather(data) {
    const { name, weather, main, wind, dt } = data;

    const date = new Date(dt * 1000).toLocaleDateString();

    const weatherHtml = `
      <div class="border-top"
        <h2><span class="fw-bold fst=italic"> ${name}(${date})</span><img src="http://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${weather[0].description}"></h2>
    
        <p>Temperature: ${main.temp} °C</p>
        <p>Humidity: ${main.humidity} %</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
        </div>
    
    `;
    console.log(weatherHtml);
    weatherInfo.append(weatherHtml);
}

function displayForecastWeather(item) {
   
// weather list is the id and list-group is the class where i want to populate this section
    
// weatherlist
    const { dt, main, weather, wind } = item;
    const date = new Date(item.dt_txt).toLocaleDateString();
    const foreCast=`
    <div class="forecast">
    <h2><span class="fw-bold fst=italic">${date})</span><img src="http://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${weather[0].description}"></h2>
    <p>Temperature: ${main.temp} °C</p>
        <p>Humidity: ${main.humidity} %</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
        </div>
    `
    console.log(foreCast)
    weatherList.append(foreCast)
    
    
  


   
}

function updateSearchHistory() {
    cityList.html = searchHistory.map(city => `<li>${city}</li>`).join('');
    cityList.find('li').each(function(){
        $(this).click(() => getWeather($(this).text()));
    })
    // cityList.querySelectorAll('li').forEach(item => {
    //     item.addEventListener('click', () => getWeather(item.textContent));
    
}



