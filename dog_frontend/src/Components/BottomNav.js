import React, { useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { useHistory, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { House } from "@material-ui/icons";

const useStyles = makeStyles({
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
  background: {},
});
const BottomNav = (props) => {
  const classes = useStyles(props);

  const history = useHistory();

  const [value, setValue] = useState("home");

  return (
    <BottomNavigation
      onChange={(event, newValue) => {
        setValue(newValue);
        switch (newValue) {
          case "home":
            setTimeout(() => history.push("/"), 250);
            break;
          case "lost":
            setTimeout(() => history.push("/lost"), 250);
            break;
          default:
            break;
        }
      }}
      showLabels
      value={value}
      className={classes.stickToBottom}
    >
      <BottomNavigationAction value="home" label="Home" icon={<House />} />
      <BottomNavigationAction
        value="lost"
        label="Lost"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        value="nearby"
        label="Nearby"
        icon={<LocationOnIcon />}
      />
    </BottomNavigation>
  );
};

BottomNav.propTypes = {};

export default withRouter(BottomNav);
