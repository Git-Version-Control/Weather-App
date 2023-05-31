import React from 'react'
import {Grid} from "@mui/material"
import {Card,CardActionArea,CardMedia,CardContent,} from "@mui/material"

const Cards = (props) => {
  return (
   
    <Card sx={{ maxWidth: 150 }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="100"
        image={`http://openweathermap.org/img/w/${props.icon}.png`}
        alt={props.main}
      />
      <CardContent>
        <h5>{props.date}</h5>
        <p>{props.temperature}&deg;C</p>
      </CardContent>
    </CardActionArea>
  </Card>

  )
}

export default Cards