import axios from "axios";

export const fetchCoordinatorNameApi = () => {
  return axios.get("/api/coordinator/getName");
};

export const fetchCoordinatorJobAvailableApi = () => {
  return axios.get("/api/coordinator/jobsAvailableStats");
};

export const coordinatorAddLabourApi = (body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("/api/coordinator/addLabour", body, config);
};

export const coordinatorDeleteApi = () => {
  return axios.delete("api/coordinator/deleteAccount");
};

export const coordinatorEditWorkerApi = () => {
  return axios.get("/api/coordinator/workerDetails");
};

export const coordinatorUpdateApi = (body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("/api/coordinator/updateDetails", body, config);
};

export const coordinatorLookingForApi = () => {
  return axios.get("/api/coordinator/lookingForText");
};

export const coordinatorCompanySelectionApi = () => {
  return axios.get("/api/coordinator/companySelection");
};

export const registerCoordinatorApi = (body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("/api/coordinator/signUp", body, config);
};
