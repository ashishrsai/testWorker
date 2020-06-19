import axios from "axios";

export const addCompanyApi = (body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("/api/addCompany", body, config);
};

export const getCompanyNameApi = () => {
  return axios.get("/api/company/getName");
};

export const lookingForApi = () => {
  return axios.get("/api/company/lookingForText");
};

export const currentRequestsApi = () => {
  return axios.get("/api/company/currentRequest");
};

export const deleteCompanyApi = () => {
  return axios.delete("/api/company/deleteCompany");
};

export const getLocationApi = () => {
  return axios.get("/api/company/getLocation");
};

export const getEditableNamesApi = () => {
  return axios.get("/api/company/getEditableCompanyDetails");
};

export const addNewLocationApi = (body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("/api/company/addANewLocation/", body, config);
};

export const fetchLabourSupplyApi = () => {
  return axios.get("/api/stats/getLabourSupply");
};

export const fetchLabourDemandApi = () => {
  return axios.get("/api/stats/getLabourDemand");
};

export const fetchAvgWageApi = () => {
  return axios.get("/api/stats/getAvgWage");
};

export const fetchAvgWorkTimeApi = () => {
  return axios.get("/api/stats/getAvgWorkTime");
};

export const updateContactDetailsApi = (body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("/api/company/updatePhoneAndContactPerson", body, config);
};
