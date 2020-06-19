import React, { useEffect } from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { arrayTransformCompany } from "../helpers/arrayTransform";
import { isEmpty } from "lodash";
import { coordinatorCompanySelection } from "../actions/coordinatorActions";
import CompanyItem from "./CompanyItem";
import { useTranslation } from "react-i18next";
function CoordinatorCompanyList(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(coordinatorCompanySelection());
  }, [dispatch]);
  const { companySelectionResult, labourSelectionLoading } = useSelector(
    (state) => state.coordinator
  );
  const finalResult = !isEmpty(companySelectionResult)
    ? arrayTransformCompany(companySelectionResult)
    : [];
  return (
    <div>
      <h1>{t("List", "List")}</h1>
      {!labourSelectionLoading ? (
        <CompanyItem data={finalResult} coordinator={true} />
      ) : (
        <Spin />
      )}
    </div>
  );
}

export default CoordinatorCompanyList;
