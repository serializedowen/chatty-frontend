import * as React from "react";
import { Switch, Route } from "react-router";
import routes from "./constants/routes.json";
import App from "./containers/App";
import HomePage from "./containers/HomePage";
import CounterPage from "./containers/CounterPage";
import LoginPage from "./containers/LoginPage";
import { Link, withRouter } from "react-router-dom";

import { BottomNavigation } from "@material-ui/core";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SignUpIcon from "@material-ui/icons/PersonAddOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import ChatIcon from "@material-ui/icons/ForumOutlined";
import RoomPage from "./containers/RoomPage";
import isElectron from "./utils/isElectron.js";
import ipcActions from "./ipcActions";
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
    icon: <SignUpIcon />,
    component: Link,
    to: routes.LOGIN
  }
];

export { navigationItems };
export default withRouter(props => {
  console.log(isElectron());
  if (isElectron()) {
    React.useEffect(() => {
      const { ipcRenderer } = require("electron");
      ipcRenderer.on(ipcActions.CHANGE_ROUTE, (e, route) =>
        props.history.push(route)
      );

      return () => {
        ipcRenderer.removeAllListeners(ipcActions.CHANGE_ROUTE);
      };
    }, []);
  }

  return (
    <App>
      <Switch>
        <Route path={routes.LOGIN} component={LoginPage} />
        <Route path={routes.ROOM} component={RoomPage}></Route>
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
        {/* <BottomNavigationAction
        label="主页"
        value="主页"
        icon={<HomeIcon />}
        component={Link}
        to="/"
      />

      <BottomNavigationAction
        label="房间"
        value="房间"
        icon={<ChatIcon />}
        component={Link}
        to={routes.ROOM}
      />
      <BottomNavigationAction
        label="注册"
        value="Sign Up"
        icon={<SignUpIcon />}
        component={Link}
        to="/signup"
      />
      <BottomNavigationAction
        label="登陆"
        value="Log In"
        icon={<SignUpIcon />}
        component={Link}
        to={routes.LOGIN}
      /> */}
      </BottomNavigation>
    </App>
  );
});
