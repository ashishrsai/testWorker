import authSagas from "./authSagas";
import companySagas from "./companySagas";
import labourSaga from "./labourSaga";
import coordinatorSaga from "./coordinatorSaga";

import { all } from "redux-saga/effects";

function* rootSaga() {
  yield all([authSagas(), companySagas(), labourSaga(), coordinatorSaga()]);
}

export default rootSaga;
