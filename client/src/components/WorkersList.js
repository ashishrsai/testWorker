import React, { useEffect } from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { arrayTransform } from "../helpers/arrayTransform";
import { isEmpty } from "lodash";
import { fetchLabourSelection } from "../actions/labourActions";
import CompanyItem from "./CompanyItem";
import { useTranslation } from "react-i18next";
function WorkersList(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLabourSelection());
  }, [dispatch]);
  const {
    labourSelection: { output },
    labourSelectionLoading,
  } = useSelector((state) => state.labour);
  const finalResult = !isEmpty(output) ? arrayTransform(output) : [];
  return (
    <div>
      <h1>{t("WorkersList", "Workers List")}</h1>
      {!labourSelectionLoading ? (
        <CompanyItem data={finalResult} workersList={true} />
      ) : (
        <Spin />
      )}
    </div>
  );
}

export default WorkersList;
