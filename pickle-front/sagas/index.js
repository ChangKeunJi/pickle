import { all, fork } from "redux-saga/effects";
import axios from "axios";

import urlSaga from "./url";
import userSaga from "./user";
import { backUrl } from "../config/config";

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(urlSaga), fork(userSaga)]);
}
