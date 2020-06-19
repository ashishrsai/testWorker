import React, { useEffect } from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { arrayTransformCompany } from "../helpers/arrayTransform";
import { isEmpty } from "lodash";
import CompanyItem from "./CompanyItem";
import { coordinatorCompanySelection } from "../actions/coordinatorActions";
import { useTranslation } from "react-i18next";

function CoordinatorCompanySelection() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(coordinatorCompanySelection());
  }, [dispatch]);
  const { labourSelectionLoading, companySelectionResult } = useSelector(
    (state) => state.coordinator
  );
  const finalResult = !isEmpty(companySelectionResult)
    ? arrayTransformCompany(companySelectionResult)
    : [];
  return (
    <div>
      <h1>{t("TopCompanies", "Top Companies")}</h1>
      {!labourSelectionLoading ? (
        <CompanyItem data={finalResult.slice(0, 5)} />
      ) : (
        <Spin />
      )}
    </div>
  );
}

export default CoordinatorCompanySelection;
