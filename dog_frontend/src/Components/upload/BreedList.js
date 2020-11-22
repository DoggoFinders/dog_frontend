import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import { Pets } from "@material-ui/icons";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  textRoot: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function BreedList({ data, onSelectBreed }) {
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = useState(undefined);

  const select = (i) => {
    console.log(i);
    setSelectedIndex(i);
    if (i < data.length) {
      onSelectBreed(data[i].human_label);
    }
  };

  const onType = (v) => {
    onSelectBreed(v);
  };

  return (
    <>
      <List component="nav" className={classes.root}>
        {data.map((d, i) => (
          <ListItem
            onClick={(event) => select(i)}
            selected={selectedIndex === i}
            button
            key={d.human_label}
          >
            <ListItemAvatar>
              <Avatar>
                <Pets />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={d.human_label.replace("_", " ").replace("-", " ")}
              secondary={`Prob.: ${(d.probability * 100).toFixed(3)}%`}
            />
          </ListItem>
        ))}
        <ListItem
          onClick={(event) => select(data.length)}
          selected={selectedIndex === data.length}
          button
        >
          <ListItemAvatar>
            <Avatar>
              <Pets />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={"Something else"} />
        </ListItem>
      </List>
      {selectedIndex === data.length && (
        <form className={classes.textRoot} noValidate autoComplete="off">
          <TextField
            label="Your input"
            onChange={(e) => onType(e.target.value)}
          />
        </form>
      )}
    </>
  );
}

export default BreedList;
