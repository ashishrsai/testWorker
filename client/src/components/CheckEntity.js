import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { Redirect } from "react-router-dom";
function CheckEntity() {
  const { user } = useSelector((state) => state.auth);
  if (!isEmpty(user) && user.type === "Company") {
    return <Redirect to="/company-info" />;
  } else if (!isEmpty(user) && user.type === "Labourer") {
    return <Redirect to="/labour-info" />;
  } else if (!isEmpty(user) && user.type === "Coordinator") {
    return <Redirect to="/coordinator-register" />;
  }
  return null;
}

export default CheckEntity;
