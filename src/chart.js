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
import { auth } from "./firebase";

export default function Chart(props) {
  const [surveys, setSurveys] = useState([]);
  const [labels, setLabels] = useState([]);
  const [dataSets, setDataSets] = useState([]);

  useEffect(() => {
    const unsub = db
      .collection("users")
      .doc(props.user.uid)
      .collection("surveys")
      .onSnapshot(snapshot => {
        const surveys = snapshot.docs.map(doc => {
          const survey = {
            sleep: doc.data().sleep,
            happiness: doc.data().happiness,
            date: new Date(doc.data().date.seconds * 1000),
            id: doc.id
          };
          return survey;
        });
        setSurveys(surveys);
      });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <paper
        style={{ padding: 12, marginTop: 30, width: "100", maxWidth: 400 }}
      >
        <Typography variant="h4">Survey</Typography>
      </paper>
    </div>
  );
}
