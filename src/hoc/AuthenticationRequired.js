import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';

import Login from '../components/Login';

let isAuthenticated = true;

function AuthenticationRequired({ children, ...rest }) {
  const ref = useRef(undefined);

  console.log(rest);
  return isAuthenticated ? (
    children
  ) : (
    <Dialog open>
      <DialogContent>
        <Login
          portal={ref}
          callback={() => {
            isAuthenticated = true;
            rest.history.push('/rooms');
          }}
        />
      </DialogContent>
      <DialogActions>
        <div ref={ref} />
      </DialogActions>
    </Dialog>
  );
}

export default withRouter(AuthenticationRequired);
