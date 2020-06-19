import React from "react";
import CompanyHeader from "./CompanyHeader";
import LabourSelection from "./LabourSelection";
import { useTranslation } from "react-i18next";

function DashboardHome(props) {
  const { t } = useTranslation();
  return (
    <div>
      <h1> {t("CompanyOverview", "Company Overview")}</h1>
      <CompanyHeader />
      <LabourSelection />
    </div>
  );
}

export default DashboardHome;
