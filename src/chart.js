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
import { Line } from "react-chartjs-2";
import { db } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default function Chart(props) {
  const [surveys, setSurveys] = useState([]);
  const [labels, setLabels] = useState([]);
  const [dataSets, setDataSets] = useState([]);
  const moment = require("moment");

  useEffect(() => {
    const unsub = db
      .collection("users")
      .doc(props.user.uid)
      .collection("surveys")
      .onSnapshot(snapshot => {
        const surveys = snapshot.docs.map(doc => {
          const survey = {
            sleep: doc.data().sleep,
            exercise: doc.data().exercise,
            scriptures: doc.data().scriptures,
            happiness: doc.data().happiness,
            date: new Date(doc.data().date.seconds * 1000),
            id: doc.id
          };
          return survey;
        });

        const sorted = surveys.sort((a, b) => {
          if (a.date > b.date) {
            return 1;
          } else {
            return -1;
          }
        });
        setSurveys(surveys);
      });
  }, []);

  useEffect(() => {
    const lbls = surveys.map(survey => {
      return moment(survey.date).format("M/D/YY");
    });
    setLabels(lbls);

    const sets = [];

    const sleep = {
      label: "Hours of sleep",
      data: surveys.map(s => s.sleep),
      borderColor: "red",
      borderWidth: 1
    };
    sets.push(sleep);

    const exercise = {
      label: "Hours of Exercise",
      data: surveys.map(s => s.exercise),
      borderColor: "green",
      borderWidth: 1
    };
    sets.push(exercise);

    const scriptures = {
      label: "Hours of scripture study",
      data: surveys.map(s => s.scriptures),
      borderColor: "yellow",
      borderWidth: 1
    };
    sets.push(scriptures);

    const happiness = {
      label: "Happiness",
      data: surveys.map(s => s.happiness),
      borderColor: "blue",
      borderWidth: 1
    };
    sets.push(happiness);

    setDataSets(sets);
  }, [surveys]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <paper
        style={{ padding: 12, marginTop: 30, width: "200", maxWidth: 400 }}
      >
        <Typography variant="h4">Survey</Typography>
        <Line
          data={{
            labels: labels,
            datasets: dataSets
          }}
        />
          <TableContainer component={Paper}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Survey Data</TableCell>
              <TableCell align="right">date</TableCell>
              <TableCell align="right">sleep</TableCell>
              <TableCell align="right">Exercise</TableCell>
              <TableCell align="right">scriptures</TableCell>
              <TableCell align="right">happiness</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {surveys.map(survey => (
              <TableRow key={survey.id}>

              
                <TableCell align="right">{moment(survey.date).format("M/D/YY")}</TableCell>
                <TableCell align="right">{survey.sleep}</TableCell>
                <TableCell align="right">{survey.exercise}</TableCell>
                <TableCell align="right">{survey.scriptures}</TableCell>
                <TableCell align="right">{survey.happiness}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </paper>
    </div>
    );
  }

      
