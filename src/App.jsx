import { useState,useEffect } from 'react'
import './App.css'
import searchIcon from "./assets/search.png"
import cloudIcon from "./assets/cloud.png"
import bothIcon from "./assets/both.png"
import normalIcon from "./assets/normal.png"
import rainingIcon from "./assets/raining.png"
import snowIcon from "./assets/snow.png"
import stormIcon from "./assets/storm.png"
import sunIcon from "./assets/sun.png"
import windIcon from "./assets/wind.png"
import humidityIcon from "./assets/humidity.png"



const WeatherDetails = ({icon , temp , city , country , lat , log , humidity , windspeed}) => {

  return(
  <>
  <div className='image'>
  <img src={icon} alt='sunny'/>
  </div>
  <div className="temperature">{temp}*C</div>
  <div className="city">{city}</div>
  <div className="country">{country}</div>
  <div className="coordinate">
    <div >
      <span className="latitude">Latitude</span>
      <span>{lat}</span>
    </div>
    <div >
      <span className="longitude">Longitude</span>
      <span>{log}</span>
    </div>
   
  </div>
  <div className="data-container">
    <div className="element">
      <img className='icon' src={humidityIcon} alt='humidity' />
     <div className="data">
      <div className="humiditypercent">{humidity}</div>
      <div className="text">Humidity</div>
     </div>
    </div>
    <div className="element">
      <img className='icon' src={windIcon} alt='windspeed' />
     <div className="data"> 
     <div className="windspeedpercent">{windspeed}</div>
     <div className="text">Humidity</div>
     </div>
    </div>
    
  </div>

  

  </>
  );
};

function App() {
  
  let api_id='e6add5cd18f72b602d1d13906113b0b8';

  const [icon,setIcon]=useState(sunIcon);
  const [temp,setTemp]=useState();
  const [city,setCity]=useState("CHENNAI");
  const [country,setCountry]=useState("INDIA");
  const [lat,setLat]=useState(0);
  const [log,setLog]=useState(0);
  const [humidity,setHumidity]=useState(0);
  const [windspeed,setWindspeed]=useState(0);
  const [text,setText]=useState("Chennai");
  const [loading,setLoading]=useState(false);
  const [citynotfound,setCitynotfound]=useState(false);
  const [error,setError]=useState(null);

  const weatherIconMap={
    "01d":sunIcon,
    "01n":sunIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":bothIcon,
    "03n":bothIcon,
    "04d":normalIcon,
    "04n":normalIcon,
    "09d":rainingIcon,
    "09n":rainingIcon,
    "010d":stormIcon,
    "010n":stormIcon,
    "013d":snowIcon,
    "013n":snowIcon,
  }

  const search = async () =>{
    
    setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_id}&units=Metric`;

    try{
    let res = await fetch(url);
    let data = await res.json();
    //console.log(data)
    if(data.cod=="404"){
      console.error("City Not Found")
      setCitynotfound(true);
      setLoading(false);
      return;
    }
     
    setHumidity(data.main.humidity);
    setTemp(Math.floor(data.main.temp));
    setWindspeed(data.wind.speed);
    setCity(data.name);
    setCountry(data.sys.country);
    setLat(data.coord.lat);
    setLog(data.coord.lon);
    const weatherIconCode=data.weather[0].icon;
    setIcon(weatherIconMap[weatherIconCode] || normalIcon);
    setCitynotfound(false);

    }
    catch(error){
    console.error("error message",error.message);
    setError("An error occured during fetching the data.");
    }finally{
    setLoading(false);
    }

  };

  const handlecity=(e)=>{
    setText(e.target.value);
  };
  
  const handlekeydown=(e)=>{
   if(e.key== "Enter")
    search();
  };

  useEffect(function(){
    search();
  },[]);

  return (
    <>
   <div className="container">
    <div className="input-container">
      <input type='text' 
             placeholder='Enter the city' 
             className='input-city'
             onChange={handlecity}
             value={text}
             onKeyDown={handlekeydown}
             />
    <div className="search" onClick={() => search()}>
      <img src={searchIcon} alt='search' width='16px' height='16px' />
    </div>        
    </div>
  
   {loading && <div className="loading">Loading...</div>}
   {error && <div className="error">{error}</div>}
   {citynotfound && <div className="city-not-found">City Not Found</div>}

   {!loading && !citynotfound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} 
    lat={lat} log={log} humidity={humidity} windspeed={windspeed}/>  }

   <p className='copyright'>
      Designed by <span>AKSHAY G</span>
     </p>
   </div>
   
    </>
  )
}

export default App
