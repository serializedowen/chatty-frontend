import * as React from "react";
import { Switch, Route } from "react-router";
import routes from "./constants/routes.json";
import App from "./containers/App";
import HomePage from "./containers/HomePage";
import CounterPage from "./containers/CounterPage";
import LoginPage from "./containers/LoginPage";
import { Link, withRouter } from "react-router-dom";
import SignupPage from "./containers/SignupPage";
import { BottomNavigation } from "@material-ui/core";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SignUpIcon from "@material-ui/icons/PersonAddOutlined";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import ChatIcon from "@material-ui/icons/ForumOutlined";
import RoomPage from "./containers/RoomPage";
import isElectron from "./utils/isElectron.js";
import ipcActions from "./ipcActions";
import AuthenticationRequired from "./hoc/AuthenticationRequired";
const navigationItems = [
  {
    label: "主页",
    value: "主页",
    icon: <HomeIcon />,
    component: Link,
    to: "/"
  },
  {
    label: "房间",
    value: "房间",
    icon: <ChatIcon />,
    component: Link,
    to: routes.ROOM
  },
  {
    label: "注册",
    value: "注册",
    icon: <SignUpIcon />,
    component: Link,
    to: routes.SIGNUP
  },
  {
    label: "登录",
    value: "登录",
    icon: <ArrowUpwardIcon />,
    component: Link,
    to: routes.LOGIN
  },
  {
    label: "注销",
    value: "注销",
    icon: <ArrowDownwardIcon />,
    component: Link,
    to: routes.LOGOUT
  }
];

export { navigationItems };
export default withRouter(props => {
  if (isElectron()) {
    React.useEffect(() => {
      const { ipcRenderer } = require("electron");
      ipcRenderer.on(ipcActions.CHANGE_ROUTE, (e: any, route: string) =>
        props.history.push(route)
      );

      return () => {
        ipcRenderer.removeAllListeners(ipcActions.CHANGE_ROUTE);
      };
    }, [props.history]);
  }

  return (
    <App>
      <Switch>
        <Route path={routes.LOGIN} component={LoginPage} />
        <Route path={routes.LOGOUT} component={LoginPage} />
        <Route path={routes.SIGNUP} component={SignupPage} />

        <AuthenticationRequired>
          <Route path={routes.ROOM} component={RoomPage} />
        </AuthenticationRequired>
        <Route path={routes.COUNTER} component={CounterPage} />

        <Route path={routes.HOME} component={HomePage} />
      </Switch>

      <BottomNavigation
        showLabels

        //   value={value}
        //   onChange={handleChange}
        //   className={classes.root}
      >
        {navigationItems.map(item => {
          return (
            <BottomNavigationAction
              {...item}
              key={item.value}
            ></BottomNavigationAction>
          );
        })}
      </BottomNavigation>
    </App>
  );
});
