import {
  REGISTER_COORDINATOR,
  ADD_LABOUR_BY_COORDINATOR,
  ADD_LABOUR_BY_COORDINATOR_SUCCESS,
  COORDINATOR_COMPANY_SELECTION,
  COORDINATOR_COMPANY_SELECTION_SUCCESS,
  COORDINATOR_LABOUR_LOOKING_FOR,
  COORDINATOR_LABOUR_LOOKING_FOR_SUCCESS,
  COORDINATOR_LABOUR_NAME,
  COORDINATOR_LABOUR_NAME_SUCCESS,
  COORDINATOR_JOB_AVAILABLE_STATS,
  COORDINATOR_JOB_AVAILABLE_STATS_SUCCESS,
  DELETE_COORDINATOR,
  COORDINATOR_EDIT_DETAILS,
  COORDINATOR_EDIT_DETAILS_SUCCESS,
  COORDINATOR_UPDATE_DETAILS,
  CLEAR_ALL,
} from "../actions/constants";

export const registerCoordinator = (body) => ({
  type: REGISTER_COORDINATOR,
  body,
});
export const addLabourCoordinator = (body) => ({
  type: ADD_LABOUR_BY_COORDINATOR,
  body,
});

export const addLabourCoordinatorSuccess = (payload) => ({
  type: ADD_LABOUR_BY_COORDINATOR_SUCCESS,
  payload,
});

export const coordinatorCompanySelection = () => ({
  type: COORDINATOR_COMPANY_SELECTION,
});

export const coordinatorCompanySelectionSuccess = (payload) => ({
  type: COORDINATOR_COMPANY_SELECTION_SUCCESS,
  payload,
});

export const coordinatorLookingFor = () => ({
  type: COORDINATOR_LABOUR_LOOKING_FOR,
});

export const coordinatorLabourLookingForSuccess = (payload) => ({
  type: COORDINATOR_LABOUR_LOOKING_FOR_SUCCESS,
  payload,
});

export const coordinatorLabourName = () => ({
  type: COORDINATOR_LABOUR_NAME,
});

export const coordinatorLabourNameSuccess = (payload) => ({
  type: COORDINATOR_LABOUR_NAME_SUCCESS,
  payload,
});

export const coordinatorJobAvailableStat = () => ({
  type: COORDINATOR_JOB_AVAILABLE_STATS,
});

export const coordinatorJobAvailableStatSuccess = (payload) => ({
  type: COORDINATOR_JOB_AVAILABLE_STATS_SUCCESS,
  payload,
});

export const deleteCoordinator = () => ({
  type: DELETE_COORDINATOR,
});

export const coordinatorEditDetails = () => ({
  type: COORDINATOR_EDIT_DETAILS,
});

export const coordinatorEditDetailsSuccess = (payload) => ({
  type: COORDINATOR_EDIT_DETAILS_SUCCESS,
  payload,
});

export const coordinatorUpdateDetails = (body) => ({
  type: COORDINATOR_UPDATE_DETAILS,
  body,
});

export const clearAllCoordinator = () => ({
  type: CLEAR_ALL,
});
