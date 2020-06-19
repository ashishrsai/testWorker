import React, { Fragment } from "react";
import CoordinatorRequests from "./CoordinatorRequests";
import CoordinatorInfo from "./CoordinatorInfo";
import AddLocation from "./AddLocation";
import { useTranslation } from "react-i18next";
function LabourDashboardDetails(props) {
  const { t } = useTranslation();
  return (
    <Fragment>
      <h1>{t("Details", "Details")}</h1>
      <div className="details-container">
        {/* UNCOMMENT THIS ONCE YOU FIX THE API ISSUE */}
        {<CoordinatorRequests />}
        <CoordinatorInfo />
      </div>
    </Fragment>
  );
}

export default LabourDashboardDetails;
