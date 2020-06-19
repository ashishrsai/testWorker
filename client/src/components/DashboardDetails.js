import React, { Fragment } from "react";
import CompanyRequests from "./CompanyRequests";
import CompanyInfo from "./CompanyInfo";
import AddLocation from "./AddLocation";
import { useTranslation } from "react-i18next";

function DashboardDetails(props) {
  const { t } = useTranslation();
  return (
    <Fragment>
      <h1>{t("RequestDetails", "Request Details")}</h1>
      <div className="details-container">
        <CompanyRequests />
        <CompanyInfo />
        <AddLocation />
      </div>
    </Fragment>
  );
}

export default DashboardDetails;
