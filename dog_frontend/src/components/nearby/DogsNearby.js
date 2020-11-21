import React, { useState } from "react";
import PropTypes from "prop-types";
import BottomNav from "../BottomNav";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useCurrentLocation from "./CurrentLocation";


const useStyles = makeStyles({
  root: {
    maxWidth: "40%",
  },
});


function ImgMediaCard(filepath) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Dog photo"
          height="100"
          image={filepath}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            breed and colour description2
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Report finding
        </Button>
      </CardActions>
    </Card>
  );
}

const all_lost_dogs_in_neighbourhood = (location) => {
  console.log(location)
  return ["https://i.insider.com/5df126b679d7570ad2044f3e?width=1100&format=jpeg&auto=webp"]
}

const geolocationOptions = {
  timeout: 1000 * 60 * 1 // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
};

const DogsNearby = (props) => {
  const { location, error } = useCurrentLocation(geolocationOptions);

  return (
    <>
      <div>
        <p>Dogs nearby</p>
        {all_lost_dogs_in_neighbourhood(location).map(d => ImgMediaCard(d))}
      </div>
      <BottomNav />
    </>
  );
};

DogsNearby.propTypes = {};

export default DogsNearby;
