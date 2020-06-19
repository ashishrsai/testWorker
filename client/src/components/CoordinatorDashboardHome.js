import React from "react";
import CoordinatorHeader from "./CoordinatorHeader";
import CoordinatorCompanySelection from "./CoordinatorCompanySelection";
import { useTranslation } from "react-i18next";
function CoordinatorDashboardHome() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("Overview", "Overview")}</h1>
      <CoordinatorHeader />
      <CoordinatorCompanySelection />
    </div>
  );
}

export default CoordinatorDashboardHome;
