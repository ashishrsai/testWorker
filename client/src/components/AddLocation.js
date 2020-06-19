import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Spin, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addLocation, addNewLocation } from "../actions/companyActions";
import { StateDropdown, RegionDropdown } from "./DropdownSelector";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";

function AddLocation(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState({
    visible: false,
  });
  const [State, setState] = useState("");
  const [region, setRegion] = useState("");
  const showModal = () => setModalState({ ...modalState, visible: true });
  const handleOk = () => {
    //handle add logic here...
  };
  const handleCancel = () => setModalState({ ...modalState, visible: false });
  useEffect(() => {
    dispatch(addLocation());
  }, []);
  const { addLocationResult } = useSelector((state) => state.company);
  return (
    <Card
      title= {t("CurrentLocations", "Current Locations")}
      style={{
        borderRadius: "20px",
        borderRadius: "20px",
        boxShadow: "0 10px 25px 0 rgba(0,0,0,0.09)",
      }}
    >
      {isEmpty(addLocationResult) ? (
        <Spin />
      ) : (
        addLocationResult.location.map((item) => <h2>{item}</h2>)
      )}
      <Button type="primary" onClick={showModal}>
         {t("AddMoreLocations", "Add More Locations")}
      </Button>
      <Modal
        title= {t("AddnewLocation", "Add new Location")}
        visible={modalState.visible}
        onOk={handleOk}
        footer={[
          <Button form="myForm" key="submit" htmlType="submit" type="primary">
             {t("Submit", "Submit")}
          </Button>,
          <Button onClick={handleCancel}> {t("Cancel", "Cancel")}</Button>,
        ]}
        onCancel={handleCancel}
      >
        <Form
          id="myForm"
          initialValues={{
            state: State,
            city: region,
          }}
          onFinish={(values) => {
            console.log("the values", values);
            dispatch(addNewLocation(values));
            handleCancel();
          }}
        >
          <Form.Item
            name="state"
            rules={[
              {
                required: true,
                message: "Please enter state!",
              },
            ]}
          >
            <StateDropdown value={State} onChange={(val) => setState(val)} />
          </Form.Item>
          <Form.Item
            name="city"
            rules={[
              {
                required: true,
                message: "Please enter city!",
              },
            ]}
          >
            <RegionDropdown
              country={State}
              value={region}
              onChange={(val) => setRegion(val)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default AddLocation;
