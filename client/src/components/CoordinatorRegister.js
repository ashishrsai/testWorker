import React, { useState, useEffect, Fragment } from "react";
import { Form, Input, Button, Card } from "antd";
import { isEmpty } from "lodash";
import ShowAlert from "./ShowAlert";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import {
  registerCoordinator,
  coordinatorLabourName,
} from "../actions/coordinatorActions";
import { useTranslation } from "react-i18next";
import { StateDropdown, RegionDropdown } from "./DropdownSelector";

function CoordinatorRegister(props) {
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(coordinatorLabourName());
  }, []);
  const dispatch = useDispatch();
  const [State, setState] = useState();
  const [region, setRegion] = useState();
  const alerts = useSelector((state) => state.alerts);
  const { name } = useSelector((state) => state.coordinator.labourName);
  if (!isEmpty(name)) {
    return <Redirect to="/coordinator-dashboard" />;
  }
  return (
    <Fragment>
      {alerts && alerts.length > 0 && alerts.map((alert) => ShowAlert(alert))}
      <div
        className="form-container"
        style={{
          boxShadow: "0 10px 25px 0 rgba(0,0,0,0.09)",
          borderRadius: "20px",
        }}
      >
        <Card title= {t("CoordinatorInformation", "Coordinator Information")} style={{ borderRadius: "20px" }}>
          <Form
            initialValues={{
              personName: "",
              city: region,
              state: State,
            }}
            onFinish={(values) => {
              console.log(values);
              dispatch(registerCoordinator(values));
              props.history.push("/coordinator-info");
            }}
          >
            <Form.Item
              name="personName"
              rules={[
                {
                  required: true,
                  message: "Please enter contact person name!",
                },
              ]}
            >
              <Input
                style={{ borderRadius: "25px" }}
                placeholder={t("CoordinatorName" ,"Coordinator Name")}
              />
            </Form.Item>
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
            <Form.Item>
              <Button
                style={{
                  height: "auto",
                  backgroundColor: "#5854FF",
                  borderRadius: "24px",
                }}
                type="primary"
                size="large"
                htmlType="submit"
              >
                {t("Next" ,"Next")}
              </Button>{" "}
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Fragment>
  );
}

export default withRouter(CoordinatorRegister);
