const apiCall = '9c638ce65dc1196037bf2ef5a71835f3';
const BASE_URL = 'http://api.openweathermap.org/geo/1.0';

const getWeatherData = (infotype, searchParams) => {
    const url = new URL(BASE_URL + '/' +infotype);
    url.search = new URLSearchParams({...searchParams, appid:apiCall}
        )
        return fetch(url).then((res) => res.json());
};

