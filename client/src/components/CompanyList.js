import React, { useEffect } from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { arrayTransformCompany } from "../helpers/arrayTransform";
import { isEmpty } from "lodash";
import { companySelection } from "../actions/labourActions";
import CompanyItem from "./CompanyItem";
import { useTranslation } from "react-i18next";
function WorkersList(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(companySelection());
  }, [dispatch]);
  const { companySelectionResult } = useSelector((state) => state.labour);
  const finalResult = !isEmpty(companySelectionResult)
    ? arrayTransformCompany(companySelectionResult)
    : [];
  return (
    <div>
      <h1>{t("WorkersList", "Workers List")}</h1>
      {!isEmpty(finalResult) ? <CompanyItem data={finalResult} /> : <Spin />}
    </div>
  );
}

export default WorkersList;
