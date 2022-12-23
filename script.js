const api = {

    key: "8e7199d7bab355e224bf4e301120cba8",
    baseurl: "https://api.openweathermap.org/data/2.5/"

};

const searchbox = document.querySelector('.search-bar');

searchbox.addEventListener('keypress', setQuery);

function setQuery(e) {

    if (e.keyCode == 13) {
        getResults(searchbox.value);
        console.log(searchbox.value);
    }

}

function getResults(query) {

    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((weather) => {
            return weather.json();
        })
        .then(displayResults);

}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.description');
    date.innerHTML = dateBuilder(now);

    document.querySelector('.icon').src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}°C`;

    let weatherEl = document.querySelector('.humidity');
    weatherEl.innerHTML = weather.weather[0].main;

    let spind = document.querySelector('.wind');
    spind.innerHTML = `${weather.wind.speed}`;

    let weathMax = document.querySelector('.weath-max');
    weathMax.innerHTML = `${Math.round(weather.main.temp_min)} / ${Math.round(weather.main.temp_max)}`;

}

function dateBuilder(b) {

    let months = [
        "Yanvar",
        'Fevral',
        'Mart',
        'Aprel',
        'May',
        'Iyun',
        'Iyul',
        'Avgust',
        'Sentabr',
        'Oktabr',
        'Noyabr',
        'Dekabr'
    ];

    let days = [
        'Dushanba',
        'Seshanba',
        'Chorshanba',
        'Juma',
        'Shanba',
        'Yakshanba'
    ];

    let day = days[b.getDay()];
    let date = b.getDate();
    let month = months[b.getMonth()];
    let year = b.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}