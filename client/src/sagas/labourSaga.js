import { takeLatest, call, put, all } from "redux-saga/effects";
import { v4 as uuidv4 } from "uuid";
import {
  ADD_LABOUR_REQUIREMENT,
  FETCH_ACTIVE_LABOURS,
  FETCH_LABOUR_SELECTION,
  ADD_LABOUR,
  COMPANY_SELECTION,
  FETCH_ACTIVE_JOB_STATS,
  LABOUR_LOOKING_FOR,
  FETCH_LABOUR_NAME,
  FETCH_JOB_AVAILABLE_STATS,
  DELETE_LABOUR,
  FETCH_EDITABLE_LABOUR,
  UPDATE_LABOUR_PHONE_CONTACT,
} from "../actions/constants";

import {
  addLabourRequirementApi,
  activeLabourStatsApi,
  labourSelectionApi,
  addLabourApi,
  companySelectionApi,
  activeJobStatApi,
  labourLookingForApi,
  labourNameApi,
  jobsAvailableStatsApi,
  deleteLabourApi,
  editableLabourApi,
  updateLabourContactDetailsApi,
} from "../api/labourApi";

import {
  addLabourRequirementsSuccess,
  activeLabourSuccess,
  fetchLabourSelectionSucces,
  addLabourSuccess,
  companySelectionSuccess,
  fetchActiveJobStatSuccess,
  labourLookingForSuccess,
  fetchLabourNameSuccess,
  fetchEditableLabour,
  fetchEditableLabourSuccess,
  fetchJobAvailableStatSuccess,
  fetchLabourName,
} from "../actions/labourActions";

import { setAlert } from "../actions/alertActions";

function* addLabourRequirementSaga(action) {
  const body = action.body;
  try {
    const { data } = yield call(addLabourRequirementApi, body);
    yield put(addLabourRequirementsSuccess(data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert(error.msg, "error", { id: uuidv4() }))
        )
      );
    }
  }
}

function* fetchActiveLabourSaga(action) {
  try {
    const { data } = yield call(activeLabourStatsApi);
    yield put(activeLabourSuccess(data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert(error.msg, "error", { id: uuidv4() }))
        )
      );
    }
  }
}

function* fetchLabourSelectionSaga(action) {
  try {
    const { data } = yield call(labourSelectionApi);
    yield put(fetchLabourSelectionSucces(data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert(error.msg, "error", { id: uuidv4() }))
        )
      );
    }
  }
}

function* addLabourSaga(action) {
  try {
    const { data } = yield call(addLabourApi, action.body);
    yield put(addLabourSuccess(data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert(error.msg, "error", { id: uuidv4() }))
        )
      );
    }
  }
}

function* companySelectionSaga(action) {
  try {
    const { data } = yield call(companySelectionApi);
    yield put(companySelectionSuccess(data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert(error.msg, "error", { id: uuidv4() }))
        )
      );
    }
  }
}

function* fetchActiveJobStatSaga(action) {
  try {
    const { data } = yield call(activeJobStatApi);
    yield put(fetchActiveJobStatSuccess(data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert(error.msg, "error", { id: uuidv4() }))
        )
      );
    }
  }
}

function* labourLookingForSaga(action) {
  try {
    const { data } = yield call(labourLookingForApi);
    yield put(labourLookingForSuccess(data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert(error.msg, "error", { id: uuidv4() }))
        )
      );
    }
  }
}

function* fetchLabourNameSaga(action) {
  try {
    const { data } = yield call(labourNameApi);
    yield put(fetchLabourNameSuccess(data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert(error.msg, "error", { id: uuidv4() }))
        )
      );
    }
  }
}

function* deleteLabourSaga(action) {
  try {
    yield call(deleteLabourApi);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert(error.msg, "error", { id: uuidv4() }))
        )
      );
    }
  }
}

function* fetchEditableLabourSaga(action) {
  try {
    const { data } = yield call(editableLabourApi);
    yield put(fetchEditableLabourSuccess(data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert(error.msg, "error", { id: uuidv4() }))
        )
      );
    }
  }
}

function* updatePhoneContactSaga(action) {
  try {
    const { data } = yield call(updateLabourContactDetailsApi, action.body);
    yield put(fetchEditableLabour());
    yield put(fetchLabourName());
    yield put(setAlert(data.message, "success", { id: uuidv4() }));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert(error.msg, "error", { id: uuidv4() }))
        )
      );
    }
  }
}

function* fetchAvailableJobStatSaga(action) {
  try {
    const { data } = yield call(jobsAvailableStatsApi);
    yield put(fetchJobAvailableStatSuccess(data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert(error.msg, "error", { id: uuidv4() }))
        )
      );
    }
  }
}

function* labourSaga() {
  yield takeLatest(ADD_LABOUR_REQUIREMENT, addLabourRequirementSaga);
  yield takeLatest(FETCH_ACTIVE_LABOURS, fetchActiveLabourSaga);
  yield takeLatest(FETCH_LABOUR_SELECTION, fetchLabourSelectionSaga);

  yield takeLatest(ADD_LABOUR, addLabourSaga);
  yield takeLatest(COMPANY_SELECTION, companySelectionSaga);
  yield takeLatest(FETCH_ACTIVE_JOB_STATS, fetchActiveJobStatSaga);
  yield takeLatest(LABOUR_LOOKING_FOR, labourLookingForSaga);
  yield takeLatest(FETCH_LABOUR_NAME, fetchLabourNameSaga);
  yield takeLatest(FETCH_JOB_AVAILABLE_STATS, fetchAvailableJobStatSaga);
  yield takeLatest(DELETE_LABOUR, deleteLabourSaga);
  yield takeLatest(FETCH_EDITABLE_LABOUR, fetchEditableLabourSaga);
  yield takeLatest(UPDATE_LABOUR_PHONE_CONTACT, updatePhoneContactSaga);
}

export default labourSaga;
