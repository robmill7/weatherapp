import { DateTime } from "luxon";

const apiCall = process.env.REACT_APP_apiCall;
const BASE_URL = process.env.REACT_APP_BASE_URL; 

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType); // will replace weather
    url.search = new URLSearchParams({ ...searchParams, appid:apiCall});

console.log(url)
        return fetch(url)
        .then((res) => res.json());

       
};

const formatCurrentWeather = (data) => {
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, pressure, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed},
        timezone
    } = data 

    const { main: details, icon } = weather[0]
    

    return { lat, lon, temp, feels_like,
       temp_min, temp_max, pressure,
    humidity, name, dt, country, sunrise,
     sunset, details, icon, speed, timezone 
  };
}
// not getting daily and hourly in api change daily to main 

const formatForcastWeather = (data) => {
    let { timezone, main, hourly } = data;
    let dataArray = [data]
    console.log(dataArray)
    
      main = dataArray.slice(1, 6).map((d) => {
        return {
          title: formatToLocalTime(d.dt, timezone, 'ccc'),
          temp: d.main.temp,
          icon: d.weather[0].icon,
        };
      });
    
    
    hourly = (hourly?.slice(1, 6) ?? []).map((d) => {
      return {
        title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
        temp: d.temp,
        icon: d.weather[0].icon,
      };
    });
  
    return { timezone, main, hourly };
  };
  

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
        'weather', 
        searchParams
        ).then(formatCurrentWeather)
        const {lat, lon} = formattedCurrentWeather

        const formattedForcastWeather = await getWeatherData('weather', {
            lat, 
            lon, 
            exclude: 'current, minutely, alerts', 
            units: searchParams.units,
        }).then(formatForcastWeather); 

    return {...formattedCurrentWeather, ...formattedForcastWeather};  
};

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") =>
DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData

export {formatToLocalTime, iconUrlFromCode}  ;