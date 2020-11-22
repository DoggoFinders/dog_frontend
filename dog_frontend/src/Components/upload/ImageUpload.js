import React, { useEffect, useState } from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";

import ApiCaller from "../../api/ApiCaller";
import BreedList from "./BreedList";
import UploadStepper from "./UploadStepper";
import BreedRadio from "./BreedRadio";
import { DisplayMapClass } from "../DisplayMapClass";

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

const UploadButtons = ({ onChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        onChange={onChange}
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        // accept="image/*;capture=camera"
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
      <input
        onChange={onChange}
        className={classes.input}
        id="icon-button-file"
        accept="image/*;capture=camera"
        type="file"
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
  );
};

const ImageUpload = ({ isOwner, onSubmit }) => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(undefined);
  const [breedData, setBreedData] = useState(undefined);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // form data
  const [formBreed, setFormBreed] = useState(undefined);
  const [coatColor, setCoatColor] = useState(undefined);
  const [long, setLong] = useState(undefined);
  const [lat, setLat] = useState(undefined);
  const [details, setDetails] = useState(undefined);

  console.log(formBreed);
  console.log(coatColor);

  const fileChangedHandler = (event) => {
    setSelectedFile(event.target.files[0]);

    let reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  useEffect(() => {
    const load = async () => {
      var fd = new FormData();
      setLoading(true);
      fd.append("image", selectedFile);
      const result = await ApiCaller.inferBreed(fd);
      const data = await result.json();
      setBreedData(data.breed);
      setLoading(false);
    };
    if (imagePreviewUrl && selectedFile) {
      load();
    }
  }, [selectedFile, imagePreviewUrl]);

  const submit = () => {
    onSubmit({
      breed: formBreed,
      image: selectedFile,
      coat_colour: coatColor,
      details: details,
      latitude: lat,
      longitude: long,
    })
  };

  const steps = {
    1: (
      <>
        {!imagePreviewUrl && (
          <Typography variant="body2">
            Please select an image or take a photo directly.
          </Typography>
        )}
        {imagePreviewUrl && (
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12} md={4}>
              <img
                src={imagePreviewUrl}
                alt="dog"
                className={classes.dogSelection}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" className={classes.title}>
                Is one of these the right breed?
              </Typography>
              {loading && <CircularProgress className={classes.loader} />}
              {breedData && (
                <BreedList data={breedData} onSelectBreed={setFormBreed} />
              )}
            </Grid>
          </Grid>
        )}
      </>
    ),
    2: (
      <>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.title}>
              Your location
            </Typography>
            <DisplayMapClass
              onLocationChange={(l) => {
                setLat(l.lat);
                setLong(l.lng);
              }}
              height="250px"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.title}>
              Choose a color
            </Typography>
            <BreedRadio onChange={setCoatColor} />
          </Grid>
        </Grid>
      </>
    ),
    3: (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          {isOwner && (
            <>
              <Typography variant="h6" className={classes.title}>
                Extra details (e.g. name, accessories)
              </Typography>
              <form className={classes.textRoot} noValidate autoComplete="off">
                <TextField
                  label="Your input"
                  onChange={(e) => setDetails(e.target.value)}
                />
              </form>
            </>
          )}
          {!isOwner && (
            <Typography variant="h6" className={classes.title}>
              We're done! Click the finish button to submit.
            </Typography>
          )}
        </Grid>
      </Grid>
    ),
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        {!imagePreviewUrl && <UploadButtons onChange={fileChangedHandler} />}
        {imagePreviewUrl && (
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12} md={4}>
              <UploadStepper
                onComplete={submit}
                onStep={() => setStep(step + 1)}
              />
            </Grid>
          </Grid>
        )}
        <Divider variant="fullWidth" />
        {steps[step]}
      </Box>
    </Container>
  );
};

export default ImageUpload;
