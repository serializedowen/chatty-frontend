import React, { useRef } from "react";
import { withRouter } from "react-router-dom";
import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";

import Login from "../components/Login";

function AuthenticationRequired({ children, isAuthenticated, ...rest }) {
  const ref = useRef(undefined);

  return isAuthenticated ? (
    children
  ) : (
    <Dialog open>
      <DialogContent>
        <Login
          portal={ref}
          callback={() => {
            rest.history.push("/");
          }}
        />
      </DialogContent>
      <DialogActions>
        <div ref={ref} />
      </DialogActions>
    </Dialog>
  );
}

export default compose(
  connect(state => ({ isAuthenticated: !!state.auth.credential })),
  withRouter
)(AuthenticationRequired);
