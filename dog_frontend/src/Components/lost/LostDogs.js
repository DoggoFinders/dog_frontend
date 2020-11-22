import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BottomNav from "../BottomNav";
import { DisplayMapClass } from "../DisplayMapClass";
import ApiCaller, { useLoggedIn } from "../../api/ApiCaller";
import { Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  rootContainer: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  dogSelection: {
    width: 175,
    justifyContent: "center",
  },
  control: {
    padding: theme.spacing(2),
  },
  title: {
    color: "#3f51b5",
    flexGrow: 1,
  },
  loader: {},
}));

const LostDogs = (props) => {
  const { login } = useLoggedIn();
  const classes = useStyles();

  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const load = async () => {
      const notif = await ApiCaller.getDogNotifications();
      const data = await notif.json();
      setDogs(data.dogs);
      console.log(data.dogs);
    };
    if (login) {
      load();
    }
  }, [login]);

  return (
    <>
      {/* <Grid container className={classes.root} spacing={2}>  */}
      <Grid item xs={12}>
        <Typography variant="h6">Notifications matching dogs</Typography>
        {!login && <Typography variant="h5">Please login first</Typography>}
        {login && (
          <DisplayMapClass
            height="450px"
            dogs={dogs}
            onLocationChange={() => {}}
          />
        )}
        {/* </Grid> */}
      </Grid>
      <BottomNav />
    </>
  );
};

LostDogs.propTypes = {};

export default LostDogs;
