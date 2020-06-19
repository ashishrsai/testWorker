import {
  ADD_LABOUR_REQUIREMENT,
  ADD_LABOUR_REQUIREMENT_SUCCESS,
  FETCH_ACTIVE_LABOURS,
  FETCH_ACTIVE_LABOURS_SUCCESS,
  FETCH_LABOUR_SELECTION,
  FETCH_LABOUR_SELECTION_SUCCESS,
  ADD_LABOUR,
  COMPANY_SELECTION,
  ADD_LABOUR_SUCCESS,
  COMPANY_SELECTION_SUCCESS,
  FETCH_ACTIVE_JOB_STATS,
  FETCH_ACTIVE_JOB_STATS_SUCCESS,
  LABOUR_LOOKING_FOR,
  LABOUR_LOOKING_FOR_SUCCESS,
  FETCH_LABOUR_NAME,
  FETCH_LABOUR_NAME_SUCCESS,
  FETCH_JOB_AVAILABLE_STATS,
  FETCH_JOB_AVAILABLE_STATS_SUCCESS,
  DELETE_LABOUR,
  DELETE_LABOUR_SUCCESS,
  FETCH_EDITABLE_LABOUR,
  FETCH_EDITABLE_LABOUR_SUCCESS,
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
  activeLabourLoading: false,
  activeLaboursResults: {},
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

const labourRequirementReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LABOUR_REQUIREMENT:
      return {
        ...state,
        loading: true,
      };
    case ADD_LABOUR_REQUIREMENT_SUCCESS: {
      return {
        loading: false,

        ...action.payload,
      };
    }
    case FETCH_ACTIVE_LABOURS: {
      return {
        ...state,
        activeLabourLoading: true,
      };
    }
    case FETCH_ACTIVE_LABOURS_SUCCESS: {
      return {
        ...state,
        activeLabourLoading: false,
        activeLaboursResults: action.payload,
      };
    }
    case FETCH_LABOUR_SELECTION: {
      return {
        ...state,
        labourSelectionLoading: true,
      };
    }
    case FETCH_LABOUR_SELECTION_SUCCESS: {
      return {
        ...state,
        labourSelectionLoading: false,
        labourSelection: action.payload,
      };
    }
    case FETCH_LABOUR_NAME_SUCCESS:
      return {
        ...state,
        labourName: action.payload,
      };
    case COMPANY_SELECTION_SUCCESS:
      return {
        ...state,
        companySelectionResult: action.payload,
      };
    case FETCH_ACTIVE_JOB_STATS_SUCCESS:
      return {
        ...state,
        activeJobStatResult: action.payload,
      };
    case LABOUR_LOOKING_FOR_SUCCESS:
      return {
        ...state,
        labourLookingForResult: action.payload.result,
      };
    case FETCH_EDITABLE_LABOUR_SUCCESS:
      return {
        ...state,
        editableLabourDetails: action.payload,
      };
    case FETCH_JOB_AVAILABLE_STATS_SUCCESS:
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

export default labourRequirementReducer;
