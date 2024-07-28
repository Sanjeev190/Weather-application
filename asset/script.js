const apiKey = '14096714152bcd5ab617f6a737bee857';
const city = 'Atlanta'; // You can replace 'London' with any city
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

