import React from "react";
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
});
const BottomNav = (props) => {
  const classes = useStyles(props);

  const history = useHistory();

  return (
    <BottomNavigation
      onChange={(event, newValue) => {
        switch (newValue) {
          case 0:
            setTimeout(() => history.push("/"), 250);
            break;
          case 1:
            setTimeout(() => history.push("/lost"), 250);
            break;
          default:
            break;
        }
      }}
      showLabels
      className={classes.stickToBottom}
    >
      <BottomNavigationAction label="Home" icon={<House />} />
      <BottomNavigationAction label="Lost" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
    </BottomNavigation>
  );
};

BottomNav.propTypes = {};

export default withRouter(BottomNav);
