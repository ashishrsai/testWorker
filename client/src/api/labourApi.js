import axios from "axios";

export const addLabourRequirementApi = (body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("api/company/labourRequirement", body, config);
};

export const activeLabourStatsApi = () => {
  return axios.get("api/company/activeLabourStats");
};

export const labourSelectionApi = () => {
  return axios.get("/api/company/labourSelection");
};

export const addLabourApi = (body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("api/worker/onBoard", body, config);
};

export const companySelectionApi = () => {
  return axios.get("/api/labour/companySelection");
};

export const activeJobStatApi = () => {
  return axios.get("/api/labour/activeJobsStats");
};

export const labourLookingForApi = () => {
  return axios.get("/api/labour/lookingForText");
};

export const labourNameApi = () => {
  return axios.get("/api/labour/getName");
};

export const jobsAvailableStatsApi = () => {
  return axios.get("/api/labour/jobsAvailableStats");
};

export const deleteLabourApi = () => {
  return axios.delete("/api/labour/deleteAccount");
};

export const editableLabourApi = () => {
  return axios.get("/api/labour/workerDetails");
};

export const updateLabourContactDetailsApi = (body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("/api/labour/updateDetails", body, config);
};
