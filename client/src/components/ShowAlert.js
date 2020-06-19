import React from "react";
import { Alert } from "antd";

const ShowAlert = (alert) => (
  <Alert
    type={alert.alertType}
    message={alert.msg}
    key={alert.id}
    showIcon
    style={{
      position: "absolute",
      top: "50",
      zIndex: "12000",
      width: "100%",
    }}
  ></Alert>
);

export default ShowAlert;
