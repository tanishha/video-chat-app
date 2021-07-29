import React from "react";
import useStyles from "../style";
import { SocketContext } from "../socket";
const MainComponent = () => {
  return (
    <div className={useStyles.App}>
      <AppBar className={useStyles.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center">
          Video Chat
        </Typography>
      </AppBar>
    </div>
  );
};

export default MainComponent;
