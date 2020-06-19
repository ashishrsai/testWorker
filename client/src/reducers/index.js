import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import companyReducer from "./companyReducer";
import labourReducer from "./labourReducer";
import coordinatorReducer from "./coordinatorReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alerts: alertReducer,
  company: companyReducer,
  labour: labourReducer,
  coordinator: coordinatorReducer,
});

export default rootReducer;
