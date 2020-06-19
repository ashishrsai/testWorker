import { call, put, takeLatest } from "redux-saga/effects";
import { v4 as uuidv4 } from "uuid";
import {
  ADD_LABOUR_BY_COORDINATOR,
  COORDINATOR_COMPANY_SELECTION,
  COORDINATOR_LABOUR_LOOKING_FOR,
  COORDINATOR_LABOUR_NAME,
  COORDINATOR_JOB_AVAILABLE_STATS,
  DELETE_COORDINATOR,
  COORDINATOR_EDIT_DETAILS,
  COORDINATOR_UPDATE_DETAILS,
  REGISTER_COORDINATOR,
} from "../actions/constants";

import {
  addLabourCoordinatorSuccess,
  coordinatorCompanySelectionSuccess,
  coordinatorLabourLookingForSuccess,
  coordinatorLabourNameSuccess,
  coordinatorJobAvailableStatSuccess,
  coordinatorEditDetails,
  coordinatorLabourName,
  coordinatorEditDetailsSuccess,
} from "../actions/coordinatorActions";

import {
  fetchCoordinatorNameApi,
  fetchCoordinatorJobAvailableApi,
  coordinatorAddLabourApi,
  coordinatorDeleteApi,
  coordinatorEditWorkerApi,
  coordinatorUpdateApi,
  coordinatorLookingForApi,
  coordinatorCompanySelectionApi,
  registerCoordinatorApi,
} from "../api/coordinatorApi";

import { setAlert } from "../actions/alertActions";

function* addLabourCoordinatorSaga(action) {
  try {
    const { data } = yield call(coordinatorAddLabourApi, action.body);
    yield put(setAlert(data.message, "success", { id: uuidv4() }));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield call(
        errors.map((error) =>
          put(setAlert(error.msg, "error", { id: uuidv4() }))
        )
      );
    }
  }
}

function* registerCoordinatorSaga(action) {
  try {
    const { data } = yield call(registerCoordinatorApi, action.body);
    yield put(setAlert(data.message, "success", { id: uuidv4() }));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield call(
        errors.map((error) =>
          put(setAlert(error.msg, "error", { id: uuidv4() }))
        )
      );
    }
  }
}

function* coordinatorCompanySelSaga(action) {
  try {
    const { data } = yield call(coordinatorCompanySelectionApi);
    yield put(coordinatorCompanySelectionSuccess(data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield call(
        errors.map((error) =>
          put(setAlert(error.msg, "error", { id: uuidv4() }))
        )
      );
    }
  }
}

function* coordinatorLabourLookingSaga(action) {
  try {
    const { data } = yield call(coordinatorLookingForApi);
    yield put(coordinatorLabourLookingForSuccess(data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield call(
        errors.map((error) =>
          put(setAlert(error.msg, "error", { id: uuidv4() }))
        )
      );
    }
  }
}

function* coordinatorLabourNameSaga(action) {
  try {
    const { data } = yield call(fetchCoordinatorNameApi);
    yield put(coordinatorLabourNameSuccess(data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield call(
        errors.map((error) =>
          put(setAlert(error.msg, "error", { id: uuidv4() }))
        )
      );
    }
  }
}

function* coordinatorAvailabeStatSaga(action) {
  try {
    const { data } = yield call(fetchCoordinatorJobAvailableApi);
    yield put(coordinatorJobAvailableStatSuccess(data));
    yield put(coordinatorLabourNameSuccess(data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield call(
        errors.map((error) =>
          put(setAlert(error.msg, "error", { id: uuidv4() }))
        )
      );
    }
  }
}

function* deleteCoordinatorSaga(action) {
  try {
    yield call(coordinatorDeleteApi);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield call(
        errors.map((error) =>
          put(setAlert(error.msg, "error", { id: uuidv4() }))
        )
      );
    }
  }
}

function* editCoordinatorSaga(action) {
  try {
    const { data } = yield call(coordinatorEditWorkerApi);
    yield put(coordinatorEditDetailsSuccess(data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield call(
        errors.map((error) =>
          put(setAlert(error.msg, "error", { id: uuidv4() }))
        )
      );
    }
  }
}

function* coordinatorUpdateSaga(action) {
  try {
    const { data } = yield call(coordinatorUpdateApi, action.body);
    yield put(coordinatorEditDetails());
    yield put(coordinatorLabourName());
    yield put(setAlert(data.message, "success", { id: uuidv4() }));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield call(
        errors.map((error) =>
          put(setAlert(error.msg, "error", { id: uuidv4() }))
        )
      );
    }
  }
}

function* coordinatorSaga() {
  yield takeLatest(ADD_LABOUR_BY_COORDINATOR, addLabourCoordinatorSaga);
  yield takeLatest(REGISTER_COORDINATOR, registerCoordinatorSaga);
  yield takeLatest(COORDINATOR_COMPANY_SELECTION, coordinatorCompanySelSaga);
  yield takeLatest(
    COORDINATOR_LABOUR_LOOKING_FOR,
    coordinatorLabourLookingSaga
  );
  yield takeLatest(COORDINATOR_LABOUR_NAME, coordinatorLabourNameSaga);
  yield takeLatest(
    COORDINATOR_JOB_AVAILABLE_STATS,
    coordinatorAvailabeStatSaga
  );
  yield takeLatest(DELETE_COORDINATOR, deleteCoordinatorSaga);
  yield takeLatest(COORDINATOR_EDIT_DETAILS, editCoordinatorSaga);
  yield takeLatest(COORDINATOR_UPDATE_DETAILS, coordinatorUpdateSaga);
}

export default coordinatorSaga;
