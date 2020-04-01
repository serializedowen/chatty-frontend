import * as React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import routes from "../constants/routes.json";
import Axios from "axios";
import { Button } from "@material-ui/core";
import isElectron from "../utils/isElectron.js";
const styles = require("./Home.css");

type Props = {};

export default class Home extends Component<Props> {
  props!: Props;

  changeButton = () => {
    let element = null;
    if (isElectron()) {
      const { ipcRenderer } = require("electron");

      const listener = () =>
        ipcRenderer.send("TOUCHBAR_SET", Math.floor(Math.random() * 7 + 1));
      element = (
        <Button variant="contained" color="primary" onClick={listener}>
          Change
        </Button>
      );
    }

    return element;
  };

  render() {
    Axios.get("http://localhost:3000/api/user");
    return (
      <div className={styles.container} data-tid="container">
        <h2>Home</h2>
        {this.changeButton()}
        <Link to={routes.COUNTER}>to Counter</Link>
        <br />
        <Link to={routes.LOGIN}>to Login</Link>
      </div>
    );
  }
}
