import {
  ADD_COMPANY,
  ADD_COMPANY_SUCCESS,
  GET_COMPANY_NAME_SUCCESS,
  GET_COMPANY_NAME,
  LOOKING_FOR_TEXT,
  LOOKING_FOR_TEXT_SUCCESS,
  COMPANY_REQUESTS,
  COMPANY_REQUESTS_SUCCESS,
  FETCH_ADD_LOCATION,
  FETCH_ADD_LOCATION_SUCCESS,
  ADD_NEW_LOCATION,
  FETCH_EDITABLE_NAMES,
  FETCH_EDITABLE_NAMES_SUCCESS,
  DELETE_ACCOUNT,
  FETCH_LABOUR_SUPPLY,
  FETCH_LABOUR_SUPPLY_SUCCESS,
  FETCH_LABOUR_DEMAND,
  FETCH_LABOUR_DEMAND_SUCCESS,
  FETCH_AVERAGE_WAGE,
  FETCH_AVERAGE_WAGE_SUCCESS,
  FETCH_AVERAGE_WORK_TIME,
  FETCH_AVERAGE_WORK_TIME_SUCCESS,
  UPDATE_CONTACT_DETAILS,
  CLEAR_ALL,
} from "./constants";

export const addCompany = ({ companyName, contactPersonName, state, city }) => {
  return {
    type: ADD_COMPANY,
    body: { companyName, contactPersonName, state, city },
  };
};

export const addCompanySuccess = (payload) => ({
  type: ADD_COMPANY_SUCCESS,
  payload,
});

export const getCompanyName = () => ({
  type: GET_COMPANY_NAME,
});

export const companyLookingFor = () => ({
  type: LOOKING_FOR_TEXT,
});

export const companyLookingForSuccess = (payload) => ({
  type: LOOKING_FOR_TEXT_SUCCESS,
  payload,
});

export const getCompanyNameSucess = (payload) => ({
  type: GET_COMPANY_NAME_SUCCESS,
  payload,
});

export const companyRequests = () => ({
  type: COMPANY_REQUESTS,
});

export const companyRequestSuccess = (payload) => ({
  type: COMPANY_REQUESTS_SUCCESS,
  payload,
});

export const addLocation = () => ({
  type: FETCH_ADD_LOCATION,
});

export const addLocationSuccess = (payload) => ({
  type: FETCH_ADD_LOCATION_SUCCESS,
  payload,
});

export const addNewLocation = (body) => ({
  type: ADD_NEW_LOCATION,
  body,
});

export const fetchEditableNames = () => ({
  type: FETCH_EDITABLE_NAMES,
});

export const fetchEditableNamesSuccess = (payload) => ({
  type: FETCH_EDITABLE_NAMES_SUCCESS,
  payload,
});

export const deleteAccount = () => ({
  type: DELETE_ACCOUNT,
});

export const fetchLabourSupply = () => ({
  type: FETCH_LABOUR_SUPPLY,
});

export const fetchLabourSupplySuccess = (payload) => ({
  type: FETCH_LABOUR_SUPPLY_SUCCESS,
  payload,
});

export const fetchLabourDemand = () => ({
  type: FETCH_LABOUR_DEMAND,
});

export const fetchLabourDemandSuccess = (payload) => ({
  type: FETCH_LABOUR_DEMAND_SUCCESS,
  payload,
});

export const fetchAvgWage = () => ({
  type: FETCH_AVERAGE_WAGE,
});

export const fetchAvgWageSuccess = (payload) => ({
  type: FETCH_AVERAGE_WAGE_SUCCESS,
  payload,
});

export const fetchAvgWorkTime = () => ({
  type: FETCH_AVERAGE_WORK_TIME,
});

export const fetchAvgWorkTimeSuccess = (payload) => ({
  type: FETCH_AVERAGE_WORK_TIME_SUCCESS,
  payload,
});

export const updateContactDetails = (body) => ({
  type: UPDATE_CONTACT_DETAILS,
  body,
});

export const clearAll = () => ({
  type: CLEAR_ALL,
});
