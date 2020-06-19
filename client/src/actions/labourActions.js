import {
  ADD_LABOUR_REQUIREMENT,
  ADD_LABOUR_REQUIREMENT_SUCCESS,
  FETCH_ACTIVE_LABOURS,
  FETCH_ACTIVE_LABOURS_SUCCESS,
  FETCH_LABOUR_SELECTION,
  FETCH_LABOUR_SELECTION_SUCCESS,
  COMPANY_SELECTION,
  ADD_LABOUR,
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
  UPDATE_LABOUR_PHONE_CONTACT,
  UPDATE_LABOUR_PHONE_CONTACT_SUCCESS,
  CLEAR_ALL,
} from "./constants";

export const addLabourRequirements = ({
  stateName,
  cityName,
  relocationCost,
  minimumDurationOfWork,
  maximumWagePerHour,
  labourRequired,
  skillsNeeded,
}) => {
  return {
    type: ADD_LABOUR_REQUIREMENT,
    body: {
      stateName,
      cityName,
      relocationCost,
      minimumDurationOfWork,
      maximumWagePerHour,
      labourRequired,
      skillsNeeded,
    },
  };
};

export const addLabourRequirementsSuccess = (payload) => ({
  type: ADD_LABOUR_REQUIREMENT_SUCCESS,
  payload,
});

export const activeLabours = () => ({
  type: FETCH_ACTIVE_LABOURS,
});

export const activeLabourSuccess = (payload) => ({
  type: FETCH_ACTIVE_LABOURS_SUCCESS,
  payload,
});

export const fetchLabourSelection = () => ({
  type: FETCH_LABOUR_SELECTION,
});

export const fetchLabourSelectionSucces = (payload) => ({
  type: FETCH_LABOUR_SELECTION_SUCCESS,
  payload,
});

export const addLabour = (body) => ({
  type: ADD_LABOUR,
  body,
});

export const addLabourSuccess = (payload) => ({
  type: ADD_LABOUR_SUCCESS,
  payload,
});

export const companySelection = () => ({
  type: COMPANY_SELECTION,
});

export const companySelectionSuccess = (payload) => ({
  type: COMPANY_SELECTION_SUCCESS,
  payload,
});

export const fetchActiveJobStat = () => ({
  type: FETCH_ACTIVE_JOB_STATS,
});

export const fetchActiveJobStatSuccess = (payload) => ({
  type: FETCH_ACTIVE_JOB_STATS_SUCCESS,
  payload,
});

export const labourLookingFor = () => ({
  type: LABOUR_LOOKING_FOR,
});

export const labourLookingForSuccess = (payload) => ({
  type: LABOUR_LOOKING_FOR_SUCCESS,
  payload,
});

export const fetchLabourName = () => ({
  type: FETCH_LABOUR_NAME,
});

export const fetchLabourNameSuccess = (payload) => ({
  type: FETCH_LABOUR_NAME_SUCCESS,
  payload,
});

export const fetchJobAvailableStats = () => ({
  type: FETCH_JOB_AVAILABLE_STATS,
});

export const fetchJobAvailableStatSuccess = (payload) => ({
  type: FETCH_JOB_AVAILABLE_STATS_SUCCESS,
  payload,
});

export const deleteLabour = () => ({
  type: DELETE_LABOUR,
});

export const deleteLabourSuccess = (payload) => ({
  type: DELETE_LABOUR_SUCCESS,
  payload,
});

export const fetchEditableLabour = () => ({
  type: FETCH_EDITABLE_LABOUR,
});

export const fetchEditableLabourSuccess = (payload) => ({
  type: FETCH_EDITABLE_LABOUR_SUCCESS,
  payload,
});

export const updateLabourContact = (body) => ({
  type: UPDATE_LABOUR_PHONE_CONTACT,
  body,
});

export const updateLabourContactSuccess = (payload) => ({
  type: UPDATE_LABOUR_PHONE_CONTACT_SUCCESS,
  payload,
});

export const labourClearAll = () => ({
  type: CLEAR_ALL,
});
