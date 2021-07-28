import React from "react"
import { Typography, AppBar } from '@material-ui/core';
import useStyles from './style'
const App=()=> {
  return (
    <div className={useStyles.App}>
     <AppBar className={useStyles.appBar }position="static" color="inherit">
        <Typography variant="h2" align="center">Video Chat</Typography>
      </AppBar>
      </div>
  );
}

export default App;
