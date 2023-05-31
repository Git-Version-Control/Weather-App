import React, { useState, useEffect, useContext } from "react";
import weatherContext from "../context/weatherContext";
import LandingPage from "../component/landingPage";
import {Grid,Box,IconButton,TextField} from "@mui/material"
import background from "../image/bg.png"
import SearchIcon from '@mui/icons-material/Search';

const WeatherApp = () => {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("");
  const context = useContext(weatherContext);
  const { getWeather, searchCity } = context;
  const [currentDate, setCurrentDate] = useState('');
  const [forecast,setForecast]=useState([]);

    const dateAndTime=() => {
      const date = new Date();
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const dayOfWeek = daysOfWeek[date.getDay()];
      const month = monthsOfYear[date.getMonth()];
      const dayOfMonth = date.getDate();
  
      setCurrentDate(`${dayOfWeek}, ${dayOfMonth} ${month}`);   
    }

  const fetchDetails=async(lat,lon)=>{
    const data = await getWeather(lat, lon);
    setWeather({
      lat: data.city.coord.lat,
      lon: data.city.coord.lon,
      city: data.city.name,
      temperature: Math.round(data.list[0].main.temp- 273.15),
      humidity: data.list[0].main.humidity,
      main: data.list[0].weather[0].main,
      country: data.city.country,
      icon:data.list[0].weather[0].icon,
      visibility:data.list[0].visibility/1000
    });
    setForecast(data.list);
  }

  const fetchData = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
         await fetchDetails(position.coords.latitude,position.coords.longitude);
      },
      (error) => { console.error(error); }
    );
}

  const onChange = (e) => {
    setCity(e.target.value);
  };

  const search = async () => {
    city!="" && await searchCity(city).then(async (res) => {
       await fetchDetails(res[0].lat, res[0].lon);
    });
  };

  useEffect(() => {
    fetchData();
    search();
    dateAndTime();
  }, [getWeather, city]);
  
  return (
    <div className="App">
      <Box
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          height: "100vh",
          color: "black",
        }}
      >
      <Grid container>
        <Grid item xs={12} sx={{fontSize:40}}>Weather App</Grid>
      </Grid>
        
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="standard-basic"
              label="Search City"
              variant="filled"
              onChange={(e)=>{ setCity(e.target.value);}}
              value={city}
              InputProps={{
                endAdornment: (
                  <IconButton aria-label="search">
                    <SearchIcon />
                    </IconButton>
                )}}
              sx={{my:4,width:400,borderRadius: 25, }}
            />
          </Grid>
        </Grid>
        {weather && <LandingPage weather={weather} currentDate={currentDate} forecast={forecast}/>}
      </Box>
    </div>
  );
};

export default WeatherApp;