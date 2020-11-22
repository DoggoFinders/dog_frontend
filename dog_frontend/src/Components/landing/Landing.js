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

  return (
    <>
      <Container maxWidth="sm">
        <Box my={4}>
          <LandingCard
            images={imagesLost}
            text="Thousands of dogs are reported by caring people every day, submit
            information about your lost dog and we guarantee he will be found."
          />

          <Divider variant="middle" />
          <LandingCard
            images={imagesPhoto}
            onClick={() => {
              setTimeout(() => history.push("/imageUp"), 250);
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
