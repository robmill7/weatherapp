const apiCall = process.env.REACT_APP_apiCall;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const getWeatherData = (infotype, searchParams) => {
    const url = new URL(BASE_URL + '/' + infotype); // will replace weather
    url.search = new URLSearchParams({...searchParams, appid:apiCall});

        return 
        fetch(url)
        .then((res) => res.json())

       
};

const formatCurrentWeather = (data) => {
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        wind: {speed}
    } = data 

    const {main: details, icon } = weather[0]
    
    return { lat, lon, temp, feels_like, temp_min, temp_max, 
    humidity, name, dt, country, sunrise, sunset, details, icon, speed }
}

//export default getWeatherData;
//  getFormattedWeatherData = (searchParams) => {
//     const formattedCurrentWeather = await getWeatherData
//     ('weather', searchParams).then(formatCurrentWeather)

//     return formattedCurrentWeather
// }