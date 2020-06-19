import React, { useEffect } from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { arrayTransformCompany } from "../helpers/arrayTransform";
import { isEmpty } from "lodash";
import CompanyItem from "./CompanyItem";
import { companySelection } from "../actions/labourActions";
import { useTranslation } from "react-i18next";

function CompanySelection() {
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
      <h1>{t("TopCompanies", "Top Companies")}</h1>
      {!isEmpty(finalResult) ? (
        <CompanyItem data={finalResult.slice(0, 5)} />
      ) : (
        <Spin />
      )}
    </div>
  );
}

export default CompanySelection;
