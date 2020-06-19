import {
  ADD_LABOUR_BY_COORDINATOR,
  ADD_LABOUR_BY_COORDINATOR_SUCCESS,
  COORDINATOR_COMPANY_SELECTION,
  COORDINATOR_COMPANY_SELECTION_SUCCESS,
  COORDINATOR_ACTIVE_JOB_STAT,
  COORDINATOR_ACTIVE_JOB_STAT_SUCCESS,
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
  COORDINATOR_UPDATE_DETAILS_SUCCESS,
  CLEAR_ALL,
} from "../actions/constants";

const initialState = {
  stateName: "",
  cityName: "",
  relocationCost: "",
  minimumDurationOfWork: "",
  maximumWagePerHour: "",
  labourRequired: "",
  skillsNeeded: "",
  loading: false,
  labourSelectionLoading: false,
  labourSelection: {},
  labourName: "",
  companySelectionResult: {},
  activeJobStatResult: {},
  labourLookingForResult: {},
  jobAvailableStat: {},
  editableLabourDetails: {},
};

const coordinatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LABOUR_BY_COORDINATOR:
      return {
        ...state,
        loading: true,
      };
    case ADD_LABOUR_BY_COORDINATOR_SUCCESS: {
      return {
        loading: false,

        ...action.payload,
      };
    }
    case COORDINATOR_LABOUR_NAME_SUCCESS:
      return {
        ...state,
        labourName: action.payload,
      };
    case COORDINATOR_COMPANY_SELECTION:
      return {
        ...state,
        labourSelectionLoading: true,
      };
    case COORDINATOR_COMPANY_SELECTION_SUCCESS:
      return {
        ...state,
        labourSelectionLoading: false,
        companySelectionResult: action.payload,
      };
    case COORDINATOR_LABOUR_LOOKING_FOR_SUCCESS:
      return {
        ...state,
        labourLookingForResult: action.payload.result,
      };
    case COORDINATOR_EDIT_DETAILS_SUCCESS:
      return {
        ...state,
        editableLabourDetails: action.payload,
      };
    case COORDINATOR_JOB_AVAILABLE_STATS_SUCCESS:
      return {
        ...state,
        jobAvailableStat: action.payload,
      };
    case CLEAR_ALL: {
      return {
        ...state,
        labourName: "",
      };
    }
    default:
      return state;
  }
};

export default coordinatorReducer;
