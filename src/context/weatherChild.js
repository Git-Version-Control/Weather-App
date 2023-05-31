import React from 'react'
import weatherContext from './weatherContext';
import {API_KEY} from './apiCall';

const weatherChild = (props) => {
    const getWeather=async(lat,lon)=>{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data=await response.json();
        console.log(data);
        return data;   
    }
  return (
    <weatherContext.Provider values={{getWeather}}>
        {props.children}
    </weatherContext.Provider>
  )
}

export default weatherChild;