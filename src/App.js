import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimAndLocation from './components/TimAndLocation';
import TemperaturAndDetails from './components/TemperaturAndDetails';
import Forcast from './components/Forcast';
import getFormattedWeatherData from './services/weatherService';
import {useEffect, useState } from 'react';





function App() {

  const [query,setQuery] = useState ({q: 'berlin'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(()=> {
    const fetchWeather = async () => {
       await getFormattedWeatherData({...query, units}).then((data) =>{
        setWeather(data);
       });
    };
    
    fetchWeather();
  }, [query, units])


const fetchWeather = async () => {
  const data = await getFormattedWeatherData( {q: 'london'});
  console.log(data);
};

fetchWeather();

return(
  <div className='mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br
   from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400'>
    <TopButtons />
    <Inputs />
    {weather && (
      <div>
        <TimAndLocation weather = {weather}/>
    <TemperaturAndDetails />
    <Forcast title='hourly forcast'/>
    <Forcast title='daily forcast'/>
      </div>
    )}
    

  </div>
);
 
}
export default App;
