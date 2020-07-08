import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Card, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/authActions";
import { Icon } from "@ant-design/compatible";
import { useTranslation } from "react-i18next";
import ShowAlert from "./ShowAlert";

function RegisterForm() {
  const { t } = useTranslation();
  const { Option } = Select;
  const [entity, setEntity] = useState(undefined);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const alerts = useSelector((state) => state.alerts);

  if (isAuthenticated) {
    return <Redirect to="/check-entity" />;
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
        <Card title= {t("Register", "Register")}  style={{ borderRadius: "20px" }}>
          <Form
            initialValues={{ number: "", password: "", entity }}
            onFinish={(values) => {
              dispatch(register(values));
            }}
          >
            <Form.Item
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Please enter a number!",
                },
              ]}
            >
              <Input
                style={{ borderRadius: "25px" }}
                type="number"
                prefix={
                  <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder= {t("PhoneNumber", "Phone Number")}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter a password!",
                },
              ]}
            >
              <Input.Password
                style={{ borderRadius: "25px" }}
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder={t("Password", "Password" )}
              />
            </Form.Item>
            <Form.Item
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please enter entity type!",
                },
              ]}
            >
              <Select
                placeholder= {t("entitySelection", "Select Entity" )}
                onChange={(val) => setEntity(val)}
                value={entity}
              >
                <Option value="Company"> {t("company", "Company" )}</Option>
                <Option value="Labourer">{t("worker", "Labourer" )}</Option>
                <Option value="Coordinator">{t("Coordinator", "Coordinator" )}</Option>
              </Select>
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
                {t("Register", "Register" )}
              </Button>{" "}
                {t("Or", "Or" )} <Link to="/login"> {t("LoginNow", "Already have an account Login now!" )} </Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Fragment>
  );
}

export default RegisterForm;
