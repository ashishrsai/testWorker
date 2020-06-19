import React, { useEffect, Fragment } from "react";
import Chart from "react-apexcharts";
import { Card, Spin } from "antd";
import { isEmpty } from "lodash";
import {
  fetchLabourSupply,
  fetchLabourDemand,
  fetchAvgWage,
  fetchAvgWorkTime,
} from "../actions/companyActions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
function MarketTrends() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLabourSupply());
    dispatch(fetchLabourDemand());
    dispatch(fetchAvgWage());
    dispatch(fetchAvgWorkTime());
  }, []);
  const {
    labourSupplyStats,
    labourDemandStats,
    avgWageResult,
    avgWorkTimeResult,
  } = useSelector((state) => state.company);
  return (
    <Fragment>
      <h1> {t("MarketTrends", "Market Trends")}</h1>
      <div className="market-trends-container">
        <Card
          title= {t("LabourSupply", "Labour Supply")}
          style={{
            borderRadius: "20px",
            boxShadow: "0 10px 25px 0 rgba(0,0,0,0.09)",
            marginBottom: "40px",
            width: "70%",
          }}
        >
          {isEmpty(labourSupplyStats) ? (
            <Spin />
          ) : (
            <Chart
              options={{
                chart: {
                  id: "labour-supply",
                },
                xaxis: {
                  text: "Days",
                  label: {
                    show: true,
                  },
                  categories: labourSupplyStats.days,
                },
              }}
              series={[{ name: "Supply", data: labourSupplyStats.supply }]}
              type="line"
            />
          )}
        </Card>
        <Card
          title= {t("LabourDemand", "Labour Demand")}
          style={{
            borderRadius: "20px",
            boxShadow: "0 10px 25px 0 rgba(0,0,0,0.09)",
            marginBottom: "40px",
            width: "70%",
          }}
        >
          {isEmpty(labourDemandStats) ? (
            <Spin />
          ) : (
            <Chart
              options={{
                chart: {
                  id: "labour-demand",
                },
                xaxis: {
                  text: "Days",
                  label: {
                    show: true,
                  },
                  categories: labourDemandStats.days,
                },
              }}
              series={[{ name: "Demand", data: labourDemandStats.demand }]}
              type="line"
            />
          )}
        </Card>
        <div className="market-trends-content">
          <Card
            style={{
              borderRadius: "20px",
              boxShadow: "0 10px 25px 0 rgba(0,0,0,0.09)",
              marginBottom: "40px",
              width: "70%",
              textAlign: "center",
            }}
          >
            <h3> {t("AverageWage", "Average Wage")} </h3>
            <h1 className="avg">
              {!isEmpty(avgWageResult) ? (
                `Rs. ${Math.round(avgWageResult.avgWage)}`
              ) : (
                <Spin />
              )}
            </h1>
          </Card>
          <Card
            style={{
              borderRadius: "20px",
              boxShadow: "0 10px 25px 0 rgba(0,0,0,0.09)",
              marginBottom: "40px",
              width: "70%",
              textAlign: "center",
            }}
          >
            <h3> {t("AverageWorkTime", "Average Work Time")} </h3>
            <h1 className="avg">
              {!isEmpty(avgWorkTimeResult) ? (
                `${Math.round(avgWorkTimeResult.avgWorkTime)} days`
              ) : (
                <Spin />
              )}
            </h1>
          </Card>
        </div>
      </div>
    </Fragment>
  );
}

export default MarketTrends;
