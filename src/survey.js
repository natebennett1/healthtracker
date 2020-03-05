import React, { useState, useEffect } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Toolbar,
  Typography,
  Radio
} from "@material-ui/core";
import VerySad from "@material-ui/icons/SentimentVeryDissatisfied";
import Sad from "@material-ui/icons/SentimentDissatisfied";
import Happy from "@material-ui/icons/SentimentSatisfied";
import VeryHappy from "@material-ui/icons/SentimentSatisfiedAlt";
import { Link, Route } from "react-router-dom";
import { db, functions } from "./firebase";

export default function Survey(props) {
  const [sleep, setSleep] = useState("");
  const [happiness, setHappiness] = useState(0);
  const [scriptures, setScriptures] = useState("");
  const [exercise, setExercise] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState(
    "Hey, check out my cool health tracker app! https://healthtracker-62372.firebaseio.com"
  );

  const handleSave = () => {
    db.collection("users")
      .doc(props.user.uid)
      .collection("surveys")
      .add({
        sleep: sleep,
        happiness: happiness,
        scriptures: scriptures,
        exercise: exercise,

        date: new Date()
      })
      .then(() => {
        setSleep("");
        setHappiness(0);
        setScriptures("");
        setExercise("");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSendInvite = () => {
    const sendInvite = functions.httpsCallable("sendInvite");
    sendInvite({ number: phoneNumber, message: message }).then(function(
      result
    ) {});
  };

  return (
    <div style={{ display: "flex", justifyContent: "align-items" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <paper
          style={{ padding: 12, marginTop: 30, width: "100", maxWidth: 400 }}
        >
          <Typography variant="h4">Survey</Typography>
          <Typography style={{ marginTop: 16 }}>
            How many hours of sleep did you get last night?
          </Typography>
          <TextField
            fullWidth
            value={sleep}
            onChange={e => setSleep(e.target.value)}
          ></TextField>
          <Typography style={{ marginTop: 16 }}>
            How many hours of exercise?
          </Typography>
          <TextField
            fullWidth
            value={exercise}
            onChange={e => setExercise(e.target.value)}
          ></TextField>
          <Typography style={{ marginTop: 16 }}>
            How many hours of scripture study?
          </Typography>
          <TextField
            fullWidth
            value={scriptures}
            onChange={e => setScriptures(e.target.value)}
          ></TextField>
          <Typography style={{ marginTop: 16 }}>
            How happy were you today?
          </Typography>
          <div style={{ display: "flex" }}>
            <Radio
              checked={happiness === 1}
              checkedIcon={<VerySad />}
              icon={<VerySad />}
              onChange={() => setHappiness(1)}
            ></Radio>
            <Radio
              checked={happiness === 2}
              checkedIcon={<Sad />}
              icon={<Sad />}
              onChange={() => setHappiness(2)}
            ></Radio>
            <Radio
              checked={happiness === 3}
              checkedIcon={<Happy />}
              icon={<Happy />}
              onChange={() => setHappiness(3)}
            ></Radio>
            <Radio
              checked={happiness === 4}
              checkedIcon={<VeryHappy />}
              icon={<VeryHappy />}
              onChange={() => setHappiness(4)}
            ></Radio>
          </div>

          <Button
            onClick={handleSave}
            style={{ marginTop: 16 }}
            variant="outlined"
            color="primary"
          >
            Save
          </Button>
        </paper>
      </div>
      ); };
      <div>
        <Paper
          style={{ padding: 12, marginTop: 80, width: "100", maxWidth: 400 }}
        >
          <Typography variant="h4">Invite User</Typography>
          <Typography style={{ marginTop: 16 }}>Phone Number</Typography>
          <TextField
            fullWidth
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
          ></TextField>
          <Typography style={{ marginTop: 16 }}>Message</Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={e => setMessage(e.target.value)}
          ></TextField>
          <Typography style={{ marginTop: 16 }}></Typography>

          <Button
            onClick={handleSave}
            style={{ marginTop: 16 }}
            variant="outlined"
            color="primary"
          >
            Save
          </Button>
        </Paper>
      </div>
    </div>
  );
}
