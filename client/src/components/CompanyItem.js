import React from "react";
import { Table, Card, Button } from "antd";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import { companyColumns, columns } from "../helpers/datasource";
import { useTranslation } from "react-i18next";

function CompanyItem(props) {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  return (
    <Card
      style={{
        boxShadow: "0 10px 25px 0 rgba(0,0,0,0.09)",
        margin: "20px 0px",
        borderRadius: "20px",
      }}
    >
      <Table
        dataSource={props.data}
        columns={
          (!isEmpty(user) && user.type === "Labourer") ||
          (!isEmpty(user) && user.type === "Coordinator")
            ? companyColumns
            : columns
        }
      />
      {props.workersList ? (
        <Link to="/company-info-2">
          <Button type="primary">{t("AddNewWorkers", "Add new workers")}</Button>
        </Link>
      ) : null}
    </Card>
  );
}

export default CompanyItem;
