import React from "react";
import { Typography, AppBar } from "@material-ui/core";
import useStyles from "./style";
import NotificationComponent from "./Components/notification.component";
import SidebarComponent from "./Components/sidebar.component";
import VidePlayerComponent from "./Components/videPlayer.component";
const App = () => {
  return (
    <div className={useStyles.App}>
      <AppBar className={useStyles.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center">
          Video Chat
        </Typography>
      </AppBar>
      <VidePlayerComponent />
      <SidebarComponent>
        {" "}
        <NotificationComponent />
      </SidebarComponent>
    </div>
  );
};

export default App;
