import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import ApiCaller from "../api/ApiCaller";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

  const [email, setEmail] = useState(undefined);

  useEffect(() => {
    const load = async () => {
      const resp = await ApiCaller.isLoggedIn();
      if (resp.ok) {
        const data = await resp.json();
        setEmail(data.email);
      }
    };
    load();
  }, []);

  const logout = async () => {
    await ApiCaller.logout();
    setEmail(undefined);
  }

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
        <Typography variant="h6" className={classes.title}>
          DoggoFinder
        </Typography>
        {!email && (
          <Button color="inherit" href="http://localhost:5001/auth/login">
            Login
          </Button>
        )}
        {email && <Button color="inherit" onClick={logout}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {};

export default TopBar;
