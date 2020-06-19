import axios from "axios";

export const loadUserApi = () => {
  return axios.get("/api/current");
};

export const registerUserApi = (body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("/api/register", body, config);
};

export const loginUserApi = (body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("/api/login", body, config);
};
