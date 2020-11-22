import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BottomNav from "../BottomNav";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useCurrentLocation from "./CurrentLocation";
import Grid from "@material-ui/core/Grid";
import { PrettoSlider } from "./slider";
import ApiCaller from "../../api/ApiCaller";
import Alert from "@material-ui/lab/Alert";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
  grid: {
    flexGrow: 1,
    maxWidth: "90%",
    margin: "auto",
  },
  mainGrid: {
    paddingBottom: "56px",
    flexGrow: 1,
    maxWidth: "90%",
    margin: "auto",
  },
  img: {
    padding: theme.spacing(2),
    margin: "auto",
  },
  button: {
    width: "100%",
  },
  header: {
    textAlign: "center",
    margin: "auto",
    padding: "10px",
  },
  toast: {
    position: "fixed",
    width: "90%",
    zIndex: 10,
    top: "10px"
  },
}));

const reportDog = (id) => {};

const ImgMediaCard = ({
  classes,
  id,
  breed,
  coat_colour,
  filepath,
  location,
}) => {
  // const classes = useStyles();
  const [showAlert, setShowAlert] = useState(false);
  return (
    <>
      {showAlert && (
        <Alert
          iconMapping={{
            success: <CheckCircleOutlineIcon fontSize="inherit" />,
          }} className={classes.toast}
        >
          Your request was submitted! Thank you for your help!
        </Alert>
      )}
      <Grid item xs={12} md={6} lg={2}>
        <Card className={classes.img}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Dog photo"
              height="100%"
              image={filepath}
            />
            <CardContent>
              {breed && (
                <>
                  <Typography variant="body1">{breed}</Typography>
                </>
              )}
              {coat_colour && (
                <>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Coat colour: {coat_colour} {id}
                  </Typography>
                </>
              )}
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={async () => {
                // Handle button onClick
                setShowAlert(true);
                await ApiCaller.found_lost_dog(
                  location.latitude,
                  location.longitude,
                  id
                );
                console.log("Reported");
                setTimeout(() => {
                 setShowAlert(false);
                }, 1000);
              }}
            >
              I can see this dog!
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

const geolocationOptions = {
  timeout: 1000 * 60 * 5, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
};

const DogsNearby = (props) => {
  const classes = useStyles();
  const { location, error } = useCurrentLocation(geolocationOptions);
  // const location = { latitude: 54, longitude: 23 };

  const [dogs, setDogs] = useState([]);

  const [maxDist, setMaxDist] = useState(5);
  useEffect(() => {
    const getData = async () => {
      const response = await ApiCaller.all_lost_dogs_nearby(
        location.latitude,
        location.longitude,
        maxDist
      );
      const lost_dogs_data = await response.json();
      setDogs(lost_dogs_data["lost_dogs"]);
    };
    if (location && maxDist) {
      getData();
    }
  }, [location, location.latitude, location.longitude, maxDist, setDogs]);

  return (
    <>
      <div>
        <Typography variant="h4" className={classes.header}>
          Lost dogs nearby
        </Typography>

        <Grid
          container
          className={classes.grid}
          direction="row"
          justify="center"
          alignItems="stretch"
        >
          <Grid item xs={12} md={6} lg={2}>
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              value={maxDist}
              defaultValue={5}
              min={1}
              max={20}
              step={1}
              marks={[
                { value: 5, label: "5 km" },
                { value: 10, label: "10 km" },
                { value: 15, label: "15 km" },
              ]}
              onChange={(e, val) => {
                if (val) {
                  console.log(val);
                  setMaxDist(val);
                }
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          className={classes.mainGrid}
          direction="row"
          justify="center"
          alignItems="stretch"
          spacing={2}
        >
          <>
            {dogs.map((d) => (
              <ImgMediaCard
                id={d.id}
                breed={d.breed}
                coat_colour={d.coat_colour}
                filepath={d.picture}
                location={location}
                classes={classes}
              />
            ))}
          </>
        </Grid>
      </div>
      <BottomNav />
    </>
  );
};

DogsNearby.propTypes = {};

export default DogsNearby;
