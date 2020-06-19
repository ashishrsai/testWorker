import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  companyRequests,
  getCompanyName,
  deleteAccount,
} from "../actions/companyActions";
import { logout } from "../actions/authActions";
import { isEmpty } from "lodash";
import { Card, Button, List, Spin, Modal } from "antd";
import { useTranslation } from "react-i18next";

function CompanyRequests(props) {
  const {t,i18n} = useTranslation();
  const [modalState, setModalState] = useState({
    modalText: "Are you sure you want to delete",
    visible: false,
  });
  const showModal = () => setModalState({ ...modalState, visible: true });
  const handleOk = () => {
    //handle delete logic here...
    dispatch(deleteAccount());
    dispatch(logout());
  };
  const handleCancel = () => setModalState({ ...modalState, visible: false });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(companyRequests());
    dispatch(getCompanyName());
  }, []);
  const { companyRequestResult, loading, companyName } = useSelector(
    (state) => state.company
  );
  return (
    <Card
      style={{
        borderRadius: "20px",
        borderRadius: "20px",
        boxShadow: "0 10px 25px 0 rgba(0,0,0,0.09)",
      }}
    >
      <h1>{companyName}</h1>
      {isEmpty(companyRequestResult) ? (
        <Spin />
      ) : (
        <div style={{ height: "450px", overflow: "auto" }}>
          <List
            header={<h2>{t("CurrentRequests", "Current Requests")}</h2>}
            bordered
            dataSource={companyRequestResult.result.map(
              (item) => `${item.workers} workers for ${item.numOfDays} days`
            )}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </div>
      )}

      {isEmpty(companyRequestResult) ? (
        <Spin />
      ) : (
        <Fragment>
          <h2 className="request-number">
            {companyRequestResult.totalRequests}
          </h2>
          <span>{t("reqThisMonth", "requests this month ")}</span>
        </Fragment>
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

export default withRouter(CompanyRequests);
