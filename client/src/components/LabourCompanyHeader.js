import React, { useEffect } from "react";
import { Card, Spin, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import TotalCompanies from "./TotalCompanies";
import { labourLookingFor, fetchLabourName } from "../actions/labourActions";
import { useTranslation } from "react-i18next";
function LabourCompanyHeader(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(labourLookingFor());
    dispatch(fetchLabourName());
  }, [dispatch]);
  const { labourLookingForResult, labourName } = useSelector(
    (state) => state.labour
  );
  return (
    <div className="company-header-container">
      <Card
        title={labourName.name}
        style={{
          borderRadius: "20px",
          boxShadow: "0 10px 25px 0 rgba(0,0,0,0.09)",
        }}
      >
        {isEmpty(labourLookingForResult) ? (
          <Spin />
        ) : (
          <div style={{ height: "450px", overflow: "auto" }}>
            <List
              header={<h2> {t("CurrentRequests", "Requests")}</h2>}
              bordered
              dataSource={labourLookingForResult.map(
                (item) =>
                  `Looking for work in ${item.location} for ${item.days} days`
              )}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </div>
        )}
      </Card>
      <TotalCompanies />
    </div>
  );
}

export default LabourCompanyHeader;
