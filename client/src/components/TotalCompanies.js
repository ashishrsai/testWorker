import React, { useEffect } from "react";
import { Card, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import Chart from "react-apexcharts";
import { fetchActiveJobStat } from "../actions/labourActions";
import { useTranslation } from "react-i18next";
function TotalCompanies() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchActiveJobStat());
  }, [dispatch]);
  const { activeJobStatResult } = useSelector((state) => state.labour);
  return (
    <Card
      title= {t("ActiveJobsonSite", "Active Jobs on Site")}
      style={{
        borderRadius: "20px",
        borderRadius: "20px",
        boxShadow: "0 10px 25px 0 rgba(0,0,0,0.09)",
      }}
    >
      {isEmpty(activeJobStatResult) ? (
        <Spin />
      ) : (
        <h1 style={{ fontSize: "3rem" }}>{activeJobStatResult.totalJobs}</h1>
      )}
      <h2>{t("JobsDistribution", "Jobs Distribution")}</h2>
      {isEmpty(activeJobStatResult) ? (
        <Spin />
      ) : (
        <Chart
          options={{ labels: activeJobStatResult.topStates }}
          series={activeJobStatResult.percentageShare}
          type="pie"
        />
      )}
    </Card>
  );
}

export default TotalCompanies;
