import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimAndLocation from './components/TimAndLocation';
import TemperaturAndDetails from './components/TemperaturAndDetails';
import Forcast from './components/Forcast';
import getFormattedWeatherData from './services/weatherService';





function App() {
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

    <TimAndLocation />
    <TemperaturAndDetails />
    <Forcast title='hourly forcast'/>
    <Forcast title='daily forcast'/>

  </div>
);
 
}
export default App;
