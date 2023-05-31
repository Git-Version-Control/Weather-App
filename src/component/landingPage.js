import React from "react";
import { Grid, Box } from "@mui/material";
import Cards from "./Cards";

const LandingPage = (props) => {
  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <h2>
            {props.weather.city}, {props.weather.country}
          </h2>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={6}>
          <h3>{props.currentDate}</h3>
        </Grid>
      </Grid>

      <Grid container>
        {/* <Grid item xs={6}> */}
          <Grid item xs={6}>
            <img
              src={`http://openweathermap.org/img/w/${props.weather.icon}.png`}
              alt={props.weather.main}
            />
            <Grid/>
            <Grid item xs={6}>
              <h1>{props.weather.main}</h1>
              <h3>{props.weather.temperature}&deg;C</h3>
            </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <h3>
              Latitude: {props.weather.lat} &emsp; Longitude:{" "}
              {props.weather.lon}
            </h3>
          </Grid>
          <Grid item xs={12}>
            <h3>
              Humidity: {props.weather.humidity}% &emsp; Visibility:{" "}
              {props.weather.visibility}km
            </h3>
          </Grid>
        </Grid>
      </Grid>

      {/* <Box width="500px"> */}
      <Box display="flex" flexDirection="row" overflowx="scroll" width="100%">
        {props.forecast.slice(0, 18).map((fc) => (
          <Box
            // flexDirection="column"
            justify="space-between"
            alignItems="center"
            key={fc.dt}
          >
            <Cards
              key={fc.dt}
              date={new Date(fc.dt * 1000).toLocaleDateString()}
              icon={fc.weather[0].icon}
              main={fc.weather[0].main}
              temperature={Math.round(fc.main.temp)}
            />
          </Box>
        ))}
      </Box>
      {/* </Box> */}
    </div>
  );
};

export default LandingPage;
