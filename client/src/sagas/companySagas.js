import { takeLatest, call, put, all } from "redux-saga/effects";
import { v4 as uuidv4 } from "uuid";
import {
  ADD_COMPANY,
  GET_COMPANY_NAME,
  LOOKING_FOR_TEXT,
  COMPANY_REQUESTS,
  FETCH_ADD_LOCATION,
  ADD_NEW_LOCATION,
  FETCH_EDITABLE_NAMES,
  DELETE_ACCOUNT,
  FETCH_LABOUR_SUPPLY,
  FETCH_LABOUR_DEMAND,
  FETCH_AVERAGE_WAGE,
  FETCH_AVERAGE_WORK_TIME,
  UPDATE_CONTACT_DETAILS,
} from "../actions/constants";

import {
  addCompanyApi,
  getCompanyNameApi,
  lookingForApi,
  getLocationApi,
  currentRequestsApi,
  addNewLocationApi,
  getEditableNamesApi,
  deleteCompanyApi,
  fetchLabourSupplyApi,
  fetchLabourDemandApi,
  fetchAvgWageApi,
  fetchAvgWorkTimeApi,
  updateContactDetailsApi,
} from "../api/companyApi";

import {
  addCompanySuccess,
  getCompanyNameSucess,
  companyLookingForSuccess,
  companyRequestSuccess,
  addLocation,
  addLocationSuccess,
  fetchEditableNames,
  fetchEditableNamesSuccess,
  fetchLabourSupplySuccess,
  fetchLabourDemandSuccess,
  fetchAvgWageSuccess,
  fetchAvgWorkTimeSuccess,
} from "../actions/companyActions";

import { setAlert } from "../actions/alertActions";

function* addCompanySaga(action) {
  const body = action.body;
  try {
    const { data } = yield call(addCompanyApi, body);
    yield put(addCompanySuccess(data));
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

function* getCompanyNameSaga(action) {
  try {
    const { data } = yield call(getCompanyNameApi);
    yield put(getCompanyNameSucess(data));
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

function* lookingForTextSaga(action) {
  try {
    const { data } = yield call(lookingForApi);
    yield put(companyLookingForSuccess(data));
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

function* companyRequestSaga(action) {
  try {
    const { data } = yield call(currentRequestsApi);
    yield put(companyRequestSuccess(data));
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

function* addLocationSaga(action) {
  try {
    const { data } = yield call(getLocationApi);
    yield put(addLocationSuccess(data));
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

function* addNewLocationSaga(action) {
  try {
    yield call(addNewLocationApi, action.body);
    yield put(addLocation());
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

function* fetchEditableNameSaga(action) {
  try {
    const { data } = yield call(getEditableNamesApi);
    yield put(fetchEditableNamesSuccess(data));
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

function* deleteAccountSaga(action) {
  try {
    yield call(deleteCompanyApi);
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

function* labourSupplySaga(action) {
  try {
    const { data } = yield call(fetchLabourSupplyApi);
    yield put(fetchLabourSupplySuccess(data));
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

function* labourDemandSaga(action) {
  try {
    const { data } = yield call(fetchLabourDemandApi);
    yield put(fetchLabourDemandSuccess(data));
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

function* averageWageSaga(action) {
  try {
    const { data } = yield call(fetchAvgWageApi);
    yield put(fetchAvgWageSuccess(data));
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

function* averageWorkTimeSaga(action) {
  try {
    const { data } = yield call(fetchAvgWorkTimeApi);
    yield put(fetchAvgWorkTimeSuccess(data));
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

function* updateContactDetailSaga(action) {
  try {
    yield call(updateContactDetailsApi, action.body);
    yield put(fetchEditableNames());
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

function* companySagas() {
  yield takeLatest(ADD_COMPANY, addCompanySaga);
  yield takeLatest(GET_COMPANY_NAME, getCompanyNameSaga);
  yield takeLatest(LOOKING_FOR_TEXT, lookingForTextSaga);
  yield takeLatest(COMPANY_REQUESTS, companyRequestSaga);
  yield takeLatest(FETCH_ADD_LOCATION, addLocationSaga);
  yield takeLatest(ADD_NEW_LOCATION, addNewLocationSaga);
  yield takeLatest(FETCH_EDITABLE_NAMES, fetchEditableNameSaga);
  yield takeLatest(DELETE_ACCOUNT, deleteAccountSaga);
  yield takeLatest(FETCH_LABOUR_SUPPLY, labourSupplySaga);
  yield takeLatest(FETCH_LABOUR_DEMAND, labourDemandSaga);
  yield takeLatest(FETCH_AVERAGE_WAGE, averageWageSaga);
  yield takeLatest(FETCH_AVERAGE_WORK_TIME, averageWorkTimeSaga);
  yield takeLatest(UPDATE_CONTACT_DETAILS, updateContactDetailSaga);
}

export default companySagas;
