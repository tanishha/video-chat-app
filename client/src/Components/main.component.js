import React, { useState, useContext } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";

import useStyles from "../style";
import { SocketContext } from "../socket";
const MainComponent = () => {
  const {
    name,
    setName,
    my_id,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    callUser,
    leaveCall,
    receivingCall,
    answerCall,
    username,
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");

  const useStyle = useStyles();
  return (
    <div className={useStyle.App}>
      <Container className={useStyle.container}>
        <Paper elevation={10} className={useStyle.paper}>
          <form className={useStyle.root} noValidate autoComplete="off">
            <Grid container className={useStyle.gridContainer}>
              <Grid item xs={12} md={6} className={useStyle.padding}>
                <Typography gutterBottom variant="h6">
                  Account Info
                </Typography>
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />
                <CopyToClipboard text={my_id} className={useStyle.margin}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<Assignment fontSize="large" />}
                  >
                    Copy Your ID
                  </Button>
                </CopyToClipboard>
              </Grid>
              <Grid item xs={12} md={6} className={useStyle.padding}>
                <Typography gutterBottom variant="h6">
                  Make a call
                </Typography>
                <TextField
                  label="ID to call"
                  value={idToCall}
                  onChange={(e) => setIdToCall(e.target.value)}
                  fullWidth
                />
                {callAccepted && !callEnded ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<PhoneDisabled fontSize="large" />}
                    fullWidth
                    onClick={leaveCall}
                    className={useStyle.margin}
                  >
                    Hang Up
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Phone fontSize="large" />}
                    fullWidth
                    onClick={() => callUser(idToCall)}
                    className={useStyle.margin}
                  >
                    Call
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
          {receivingCall && !callAccepted && (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h1>{username} is calling:</h1>
              <Button variant="contained" color="primary" onClick={answerCall}>
                Answer
              </Button>
            </div>
          )}
        </Paper>
      </Container>

      {/* //Video */}
      <Grid container className={useStyle.gridContainer}>
        {stream && (
          //our video
          <Paper className={useStyle.paper}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                {name || "Name"}
              </Typography>
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                className={useStyle.video}
              />
            </Grid>
          </Paper>
        )}
        {callAccepted && !callEnded && (
          //user's video
          <Paper className={useStyle.paper}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                {username}
              </Typography>
              <video
                playsInline
                ref={userVideo}
                autoPlay
                className={useStyle.video}
              />
            </Grid>
          </Paper>
        )}
      </Grid>
      {/* //Video */}
    </div>
  );
};

export default MainComponent;
