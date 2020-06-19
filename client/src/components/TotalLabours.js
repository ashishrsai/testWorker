import React, { useEffect } from "react";
import { Card, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import Chart from "react-apexcharts";
import { activeLabours } from "../actions/labourActions";
import { useTranslation } from "react-i18next";
function TotalLabours() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(activeLabours());
  }, [dispatch]);
  const { activeLaboursResults } = useSelector((state) => state.labour);
  return (
    <Card
      title= {t("ActiveLaboursonSite", "Active Labours on Site")}
      style={{
        borderRadius: "20px",
        borderRadius: "20px",
        boxShadow: "0 10px 25px 0 rgba(0,0,0,0.09)",
      }}
    >
      {isEmpty(activeLaboursResults) ? (
        <Spin />
      ) : (
        <h1 style={{ fontSize: "3rem" }}>{activeLaboursResults.totalLabour}</h1>
      )}
      <h2>{t("TopStatesLabour", "Top States Distribution")}</h2>
      {isEmpty(activeLaboursResults) ? (
        <Spin />
      ) : (
        <Chart
          options={{ labels: activeLaboursResults.topStates }}
          series={activeLaboursResults.percentageShare}
          type="pie"
        />
      )}
    </Card>
  );
}

export default TotalLabours;
