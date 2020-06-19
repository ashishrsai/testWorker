import React, { Fragment } from "react";
import LabourRequests from "./LabourRequests";
import LabourInfo from "./LabourInfo";
import AddLocation from "./AddLocation";
import { useTranslation } from "react-i18next";
function LabourDashboardDetails(props) {
  const { t } = useTranslation();
  return (
    <Fragment>
      <h1>{t("Details", "Details")}</h1>
      <div className="details-container">
        <LabourRequests />
        <LabourInfo />
        {/* <AddLocation /> */}
      </div>
    </Fragment>
  );
}

export default LabourDashboardDetails;
