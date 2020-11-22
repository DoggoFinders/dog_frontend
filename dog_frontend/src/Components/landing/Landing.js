import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import ProTip from "./ProTip";
import BottomNav from "../BottomNav";
import ButtonBases from "../buttons/ButtonBases";
import { Divider, makeStyles } from "@material-ui/core";
import LandingCard from "../LandingCard";
import { useHistory, withRouter } from "react-router-dom";
import { useLoggedIn } from "../../api/ApiCaller";

const imagesLost = [
  {
    url: "/static/map.jpg",
    title: "Find your lost dog",
    width: "100%",
  },
];

const imagesPhoto = [
  {
    url: "/static/camera.jpg",
    title: "Photograph a stray dog",
    width: "100%",
  },
];

const Landing = (props) => {
  const history = useHistory();

  const { login } = useLoggedIn();
  console.log("login: ", login);

  return (
    <>
      <Container maxWidth="sm">
        <Box my={4}>
        {!login && <Typography variant="body2">Not logged in! Not able to track your dogs.</Typography>}
          {login && (
            <>
              <Typography variant="body2">Logged in as: {login}</Typography>
              <LandingCard
                disabled={!login}
                images={imagesLost}
                onClick={() => {
                  setTimeout(() => history.push("/reportLost"), 250);
                }}
                text="Thousands of dogs are reported by caring people every day, submit
            information about your lost dog and we guarantee it will be found."
              />

              <Divider variant="middle" />
            </>
          )}
          <LandingCard
            images={imagesPhoto}
            onClick={() => {
              setTimeout(() => history.push("/report"), 250);
            }}
            text="If you encounter any dog that seems like it could have an owner, observe it carefully. If there seems to be nobody present at the time, you can quickly take a photo and we'll try to match it to missing ones in the area!"
          />
        </Box>
      </Container>
      <BottomNav />
    </>
  );
};

Landing.propTypes = {};

export default withRouter(Landing);
