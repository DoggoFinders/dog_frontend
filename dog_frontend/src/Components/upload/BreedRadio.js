import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { colors, makeStyles } from "@material-ui/core";

const colours = [
  "brown",
  "red",
  "gold",
  "cream",
  "black",
  "grey",
  "white",
  "other",
];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

export default function BreedRadio({ onChange }) {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl} component="fieldset">
      <RadioGroup row aria-label="position" name="position" defaultValue="top">
        {colours.map((c) => (
          <FormControlLabel
            key={c}
            value={c}
            control={<Radio color="primary" />}
            label={c}
            onClick={() => onChange(c)}
            labelPlacement="top"
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
