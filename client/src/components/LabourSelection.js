import React, { useEffect } from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { arrayTransform } from "../helpers/arrayTransform";
import { isEmpty } from "lodash";
import CompanyItem from "./CompanyItem";
import { fetchLabourSelection } from "../actions/labourActions";
import { useTranslation } from "react-i18next";
function LabourSelection() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLabourSelection());
  }, [dispatch]);
  const { labourSelection, labourSelectionLoading } = useSelector(
    (state) => state.labour
  );
  const finalResult = !isEmpty(labourSelection)
    ? arrayTransform(labourSelection.output)
    : [];
  return (
    <div>
      <h1>{t("topLabour", "Top 5 Labours")} </h1>
      {!labourSelectionLoading ? (
        <CompanyItem data={finalResult.slice(0, 4)} />
      ) : (
        <Spin />
      )}
    </div>
  );
}

export default LabourSelection;
