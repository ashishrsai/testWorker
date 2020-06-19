import React, { useEffect } from "react";
import { Card, Spin, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import TotalLabours from "./TotalLabours";
import { companyLookingFor, getCompanyName } from "../actions/companyActions";
import { useTranslation } from "react-i18next";
function CompanyHeader(props) {
  const { t,i18n } = useTranslation();
  //console.log("This is the current language",i18n.language);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(companyLookingFor());
    dispatch(getCompanyName());
  }, [dispatch]);
  const { lookingForResult, companyName } = useSelector(
    (state) => state.company
  );
  return (
    <div className="company-header-container">
      <Card
        title={companyName}
        style={{
          borderRadius: "20px",
          boxShadow: "0 10px 25px 0 rgba(0,0,0,0.09)",
        }}
      >
        {isEmpty(lookingForResult) ? (
          <Spin />
        ) : (
          <div style={{ height: "450px", overflow: "auto" }}>
            <List
              header={<h2>{t("CurrentRequests", "Requests")}</h2>}
              bordered
              dataSource={lookingForResult.map(
                (item) =>
                  `Looking for labours in ${item.cityName} for  ${item.minimumDurationOfWork} days`
              )}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </div>
        )}
      </Card>
      <TotalLabours />
    </div>
  );
}

export default CompanyHeader;
