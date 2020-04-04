import * as React from "react";
import { Component } from "react";
import { ConnectedRouter } from "connected-react-router";
import Routes from "../Routes";
import { History } from "history";
import { withSnackbar, WithSnackbarProps } from "notistack";
import cookie from "src/utils/cookie";
import { connect } from "react-redux";
import { compose, Dispatch, bindActionCreators } from "redux";
// import { AuthActionKeys, storeCredential } from "src/store/actions/auth";
import AuthActions from "src/store/actions/auth";

class Root extends Component<
  WithSnackbarProps & {
    history: History<any>;
    storeCredential: typeof AuthActions.storeCredential;
  }
> {
  componentDidMount() {
    this.props.storeCredential(cookie.getCookie("chattytoken"));
  }

  render() {
    const { history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    );
  }
}

export default compose(
  connect(null, (dispatch: Dispatch) =>
    bindActionCreators(AuthActions, dispatch)
  ),
  withSnackbar
)(Root);
