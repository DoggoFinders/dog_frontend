import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import ApiCaller, { useLoggedIn } from "../api/ApiCaller";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  small: {
    display: "inline-block",
    marginRight: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: "white",
    flexGrow: 1,
  },
}));

const TopBar = (props) => {
  const classes = useStyles(props);

  const [bdropOpen, setBdropOpen] = useState(false);

  const { login, setLogin } = useLoggedIn();

  const logout = async () => {
    setBdropOpen(true);
    await ApiCaller.logout();
    setLogin(undefined);
    setBdropOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <Menu />
        </IconButton>
        <Avatar className={classes.small} alt="Doggo" src="/static/doge.png" />
        <Typography variant="h5" className={classes.title}>
          Finder
        </Typography>
        {!login && (
          <Button
            color="inherit"
            onClick={() => setBdropOpen(true)}
            href="http://localhost:5001/auth/login"
          >
            Login
          </Button>
        )}
        {login && (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        )}
        <Backdrop className={classes.backdrop} open={bdropOpen}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {};

export default withRouter(TopBar);
