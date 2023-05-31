import { createContext } from "react";
import {API_KEY} from '../apiCall';

const weatherContext=createContext({
    getWeather:async(lat,lon)=>{
        // const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const response=await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&limit=5`);
        const data=await response.json();
        return data;   
    },
    searchCity:async(city)=>{
        const res=await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${API_KEY}`);
        const cdata=await res.json();
        return cdata;   
    },
    
});

export default weatherContext;