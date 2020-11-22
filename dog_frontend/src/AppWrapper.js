import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Landing from "./components/landing/Landing";
import LostDogs from "./components/lost/LostDogs";
import BottomNav from "./components/BottomNav";
import TopBar from "./components/TopBar";
import DogsNearby from "./components/nearby/DogsNearby";
import ImageUpload from "./components/upload/ImageUpload";
import { makeStyles, Typography } from "@material-ui/core";
import ApiCaller, { useLoggedIn } from "./api/ApiCaller";

const useStyles = makeStyles((theme) => ({
  copyright: {
    width: "100%",
  },
}));

function Copyright() {
  const styles = useStyles();
  return (
    <>
      <Typography
        className={styles.copyright}
        variant="body2"
        color="textSecondary"
        align="center"
      >
        {"Copyright © DoggoFinder "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}

const AppWrapper = (props) => {

  const onReportDog = async (dog) => {
    let fd = new FormData();
    Object.keys(dog).forEach((k) => {
      fd.append(k, dog[k]);
    });
    const result = await ApiCaller.reportDog(fd);
    const data = await result.json();
    console.log(data);
    console.log(dog);
  };

  const onReportLost = async (dog) => {
    let fd = new FormData();
    Object.keys(dog).forEach((k) => {
      fd.append(k, dog[k]);
    });
    const result = await ApiCaller.submitLostDog(fd);
    const data = await result.json();
    console.log(data);
    console.log(dog);
  };


  return (
    <div>
      <TopBar />
      <Switch>
        <Route path="/lost" exact>
          <LostDogs />
        </Route>
        <Route path="/nearby">
          <DogsNearby />
        </Route>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/report" exact>
          <ImageUpload isOwner={false} onSubmit={onReportDog} />
        </Route>
        <Route path="/reportLost" exact>
          <ImageUpload isOwner={true} onSubmit={onReportLost} />
        </Route>
      </Switch>
      <BottomNav />
      <Copyright />
    </div>
  );
};

AppWrapper.propTypes = {};

export default withRouter(AppWrapper);
