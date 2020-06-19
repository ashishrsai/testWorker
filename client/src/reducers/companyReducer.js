import {
  ADD_COMPANY,
  ADD_COMPANY_SUCCESS,
  GET_COMPANY_NAME,
  GET_COMPANY_NAME_SUCCESS,
  LOOKING_FOR_TEXT_SUCCESS,
  COMPANY_REQUESTS,
  COMPANY_REQUESTS_SUCCESS,
  FETCH_ADD_LOCATION_SUCCESS,
  FETCH_EDITABLE_NAMES_SUCCESS,
  FETCH_LABOUR_SUPPLY_SUCCESS,
  FETCH_LABOUR_DEMAND_SUCCESS,
  FETCH_AVERAGE_WAGE_SUCCESS,
  FETCH_AVERAGE_WORK_TIME_SUCCESS,
  CLEAR_ALL,
} from "../actions/constants";

const initialState = {
  companyName: "",
  contactPersonName: "",
  state: "",
  city: "",
  loading: false,
  lookingFor: { isLoading: false },
  activeLabours: {},
  companyRequestResult: {},
  addLocationResult: {},
  editableNamesResult: {},
  labourSupplyStats: {},
  labourDemandStats: {},
  avgWageResult: {},
  avgWorkTimeResult: {},
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMPANY:
      return {
        ...state,
        loading: true,
      };
    case ADD_COMPANY_SUCCESS: {
      return {
        loading: false,
        ...action.payload,
      };
    }
    case GET_COMPANY_NAME:
      return {
        ...state,
      };
    case GET_COMPANY_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        companyName: action.payload.companyName,
      };
    case LOOKING_FOR_TEXT_SUCCESS: {
      return {
        ...state,
        lookingForResult: action.payload.result,
      };
    }
    case COMPANY_REQUESTS:
      return {
        ...state,
        loading: true,
      };
    case COMPANY_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        companyRequestResult: action.payload,
      };
    case FETCH_ADD_LOCATION_SUCCESS:
      return {
        ...state,
        addLocationResult: action.payload,
      };
    case FETCH_EDITABLE_NAMES_SUCCESS: {
      return {
        ...state,
        editableNamesResult: action.payload,
      };
    }
    case FETCH_LABOUR_SUPPLY_SUCCESS:
      return {
        ...state,
        labourSupplyStats: action.payload,
      };
    case FETCH_LABOUR_DEMAND_SUCCESS:
      return {
        ...state,
        labourDemandStats: action.payload,
      };
    case FETCH_AVERAGE_WAGE_SUCCESS:
      return {
        ...state,
        avgWageResult: action.payload,
      };
    case FETCH_AVERAGE_WORK_TIME_SUCCESS:
      return {
        ...state,
        avgWorkTimeResult: action.payload,
      };
    case CLEAR_ALL:
      return {
        ...state,
        companyName: "",
      };
    default:
      return state;
  }
};

export default companyReducer;
