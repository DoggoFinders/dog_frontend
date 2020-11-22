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
  Typography,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";

import ApiCaller from "../../api/ApiCaller";
import BreedList from "./BreedList";

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

const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(undefined);
  const [breedData, setBreedData] = useState(undefined);

  const [loading, setLoading] = useState(false);

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

  let imgPreview = (
    <Typography variant="body2">Please select an image for preview</Typography>
  );
  if (imagePreviewUrl) {
    imgPreview = (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={6} md={4}>
          <img src={imagePreviewUrl} alt="icon" width="200" />
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h5" className={classes.title}>
            Inferred breeds
          </Typography>
          {loading && <CircularProgress className={classes.loader} />}
          {breedData && <BreedList data={breedData} />}
        </Grid>
      </Grid>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <UploadButtons onChange={fileChangedHandler} />
        <Divider variant="fullWidth" />
        {imgPreview}
      </Box>
    </Container>
  );
};

export default ImageUpload;
