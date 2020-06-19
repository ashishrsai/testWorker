import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  fetchJobAvailableStats,
  fetchLabourName,
  deleteLabour,
} from "../actions/labourActions";
import { logout } from "../actions/authActions";
import { isEmpty } from "lodash";
import { transFormJobObject } from "../helpers/arrayTransform";
import { Card, Button, List, Spin, Modal } from "antd";
import { useTranslation } from "react-i18next";
function LabourRequests(props) {
  const { t } = useTranslation();
  const [modalState, setModalState] = useState({
    modalText: "Are you sure you want to delete",
    visible: false,
  });
  const showModal = () => setModalState({ ...modalState, visible: true });
  const handleOk = () => {
    //handle delete logic here...
    dispatch(deleteLabour());
    dispatch(logout());
  };
  const handleCancel = () => setModalState({ ...modalState, visible: false });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobAvailableStats());
    dispatch(fetchLabourName());
  }, []);
  const { jobAvailableStat, loading, labourName } = useSelector(
    (state) => state.labour
  );
  const finalResultStat = !isEmpty(jobAvailableStat)
    ? transFormJobObject(jobAvailableStat)
    : [];
  return (
    <Card
      style={{
        borderRadius: "20px",
        borderRadius: "20px",
        boxShadow: "0 10px 25px 0 rgba(0,0,0,0.09)",
      }}
    >
      <h1>{labourName.name}</h1>
      {isEmpty(finalResultStat) ? (
        <Spin />
      ) : (
        <div style={{ height: "450px", overflow: "auto" }}>
          <List
            header={<h2>{t("CurrentRequests", "Current Requests")}</h2>}
            bordered
            dataSource={finalResultStat.map(
              (item) => `${item.jobs} in ${item.city}`
            )}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </div>
      )}

      <Button
        style={{ display: "block" }}
        type="danger"
        size="large"
        onClick={showModal}
      >
         {t("DeleteAccount", "Delete Account")}
      </Button>
      <Modal
        title="Confirm"
        visible={modalState.visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p> {t("SureDeleteAccount", "Are you sure you want to delete your whole account?")}</p>
      </Modal>
    </Card>
  );
}

export default withRouter(LabourRequests);
