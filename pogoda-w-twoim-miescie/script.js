notifElement = document.querySelector('.notif');
iconElement = document.querySelector('.icon');
tempElement = document.querySelector('.temp');
descElement = document.querySelector('.desc');
locationElement = document.querySelector('.location');
currentElement = document.querySelector('btn-current');
mapElement = document.querySelector('btn-map');
btn1Element = document.getElementById('btn1');
btn2Element = document.getElementById('btn2');
btn3Element = document.getElementById('btn3');
btn4Element = document.getElementById('btn4');
btn5Element = document.getElementById('btn5');

const api_key = '951f2db4dd247480792190366a2ed928';

function getPosition()
 {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunc, errorFunc)
    }
}

function successFunc(position)
{
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;

    getWeather(longitude, latitude);
    displayMap(longitude, latitude);

}

function errorFunc()
{
    alert('Geolokacja na twoim komputerze jest niewspierana bądź zablokowana.')
}

function getWeather(longitude, latitude)
{
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`

    fetch(api)
    .then(function(response)
    {
        let data = response.json()
        return data
    })
    .then(function(data)
    {

        let data_object = 
        {
            icon: data.weather[0].icon,
            temp: Math.round((data.main.temp) - 273), // K --> C
            desc: data.weather[0].description,
            location: {
                country: data.sys.country,
                city: data.name
            }
        };

        displayData(data_object);
       
    });

}

function displayData(data_object)
{
    iconElement.innerHTML = `<img src='./icons/${data_object.icon}.png'></img>`;
    tempElement.innerHTML = `${data_object.temp} °C `;
    descElement.innerHTML = data_object.desc;
    locationElement.innerHTML = `${data_object.location.city}, ${data_object.location.country}`;

    map_location = `${data_object.location.city}, ${data_object.location.country}`;
}

getPosition();

function displayMap(longitude, latitude)
{
    mapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    tempUrl = `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${api_key}`;
    windUrl = `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${api_key}`;
    precipitationUrl = `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${api_key}`;
    pressureUrl = `https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${api_key}`;
    cloudsUrl =  `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${api_key}`;

    var map = L.map('map', 
    {
    center: [latitude, longitude],
    zoom: 3,
    });

    const layers = 
    {
        "maps": L.tileLayer(mapUrl), 
        "temp": L.tileLayer(tempUrl),
        "wind": L.tileLayer(windUrl),
        "precipitation": L.tileLayer(precipitationUrl),
        "pressure": L.tileLayer(pressureUrl),
        "cloud": L.tileLayer(cloudsUrl)
    }

    layers['maps'].addTo(map);

    btn1Element.addEventListener("click", function()
    { 
        layers['temp'].addTo(map);

        layers['wind'].remove();
        layers['precipitation'].remove();
        layers['pressure'].remove();
        layers['cloud'].remove();

        document.getElementById('legend_title').innerHTML = 'Temperatura (°C)'
        document.getElementById('legend').style.display = "block";
        document.getElementById('color_legend').style.background = "linear-gradient(to right, rgba(252, 128, 20, 0.800) 9%, rgba(255, 194, 40, 0.800), rgba(255, 240, 40, 0.8), rgba(194, 255, 40, 0.8), rgba(35, 221, 221, 0.8), rgba(32, 196, 232, 0.8), rgba(32, 140, 236, 0.8), rgba(130, 87, 219, 0.8), rgba(130, 22, 146, 0.8) 90%)";
        document.getElementById('legend_text').innerHTML = '40 20 0 -20 -40';
        document.getElementById('legend_text').style.wordSpacing = '30px';
    });

    btn2Element.addEventListener("click", function()
    { 
        layers['wind'].addTo(map);

        layers['temp'].remove();
        layers['precipitation'].remove();
        layers['pressure'].remove();
        layers['cloud'].remove();

        document.getElementById('legend_title').innerHTML = 'Prędkość wiatru (m/s)'
        document.getElementById('legend').style.display = "block";
        document.getElementById('color_legend').style.background = "linear-gradient(to right, rgba(255,255,255, 0), rgba(238,206,206, 0.4), rgba(179,100,188, 0.7), rgba(116,76,172, 0.9) , rgba(70,0,175,1) 80%, rgba(13,17,38,1) 95%)";
        document.getElementById('legend_text').innerHTML = '0 50 100';
        document.getElementById('legend_text').style.wordSpacing = '70px';


    });

    btn3Element.addEventListener("click", function()
    { 
        layers['precipitation'].addTo(map);

        layers['temp'].remove();
        layers['wind'].remove();
        layers['pressure'].remove();
        layers['cloud'].remove();


        document.getElementById('legend_title').innerHTML = 'Opady (mm)'
        document.getElementById('legend').style.display = "block";
        document.getElementById('color_legend').style.background = "linear-gradient(to right, rgba(225, 200, 100, 0), rgba(200, 150, 150, 0), rgba(150, 150, 170, 0), rgba(120, 120, 190, 0), rgba(110, 110, 205, 0.3), rgba(80,80, 225, 0.7), rgba(20, 20, 255, 0.9))";

        document.getElementById('legend_text').innerHTML = '0 1 140';
        document.getElementById('legend_text').style.wordSpacing = '70px';
    });

    btn4Element.addEventListener("click", function()
    { 
        layers['pressure'].addTo(map);

        layers['temp'].remove();
        layers['wind'].remove();
        layers['precipitation'].remove();
        layers['cloud'].remove();

        document.getElementById('legend_title').innerHTML = 'Ciśnienie (Pa)'
        document.getElementById('legend').style.display = "block";
        document.getElementById('color_legend').style.background = "linear-gradient(to right, rgba(0,115,255,0.6), rgba(0,170,255,0.6), rgba(75,208,214,0.6), rgba(141,231,199,0.6) , rgba(176,247,32,0.6), rgba(240,184,0,0.6),  rgba(251,85,21,0.6),rgba(243,54,59,0.6), rgba(198,0,0,0.6))"

        document.getElementById('legend_text').innerHTML = '950 1010 1070';
        document.getElementById('legend_text').style.wordSpacing = '55px';
    });

    btn5Element.addEventListener("click", function()
    { 
        layers['cloud'].addTo(map);

        layers['temp'].remove();
        layers['wind'].remove();
        layers['precipitation'].remove();
        layers['pressure'].remove();

        document.getElementById('legend_title').innerHTML = 'Zachmurzenie (0-100%)'
        document.getElementById('legend').style.display = "block";
        document.getElementById('color_legend').style.background = "linear-gradient(to left, rgba(120, 180, 208, 0.864), rgba(253, 253, 255, 0.1) 60%, rgba(252, 251, 255, 0.2), rgba(250, 250, 255, 0.3) 10%, rgba(249, 248, 255, 0.4), rgba(247, 247, 255, 0.5) 20%, rgba(246, 245, 255, 0.75))"

        document.getElementById('legend_text').innerHTML = '0 50 100';
        document.getElementById('legend_text').style.wordSpacing = '70px';

    });

    map.attributionControl.addAttribution('Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>');

    var myIcon = L.icon({
        iconUrl: './icons/marker.png',
        iconSize: [40, 40],
    });
    var pin = L.marker([latitude, longitude], {icon: myIcon}).addTo(map);

    pin.bindPopup(`Jesteś tutaj!`).openPopup();
    
}
