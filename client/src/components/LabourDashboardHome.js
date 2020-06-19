import React from "react";
import LabourCompanyHeader from "./LabourCompanyHeader";
import CompanySelection from "./CompanySelection";
import { useTranslation } from "react-i18next";

function DashboardHome(props) {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("LabourOverview", "Labour Overview")}</h1>
      <LabourCompanyHeader />
      <CompanySelection />
    </div>
  );
}

export default DashboardHome;
