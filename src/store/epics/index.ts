import { combineEpics } from "redux-observable";
import auth from "./auth";

const rootEpics = combineEpics(auth);
export default rootEpics;
