import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Card, Form, Input, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/authActions";
import { Icon } from "@ant-design/compatible";
import { useTranslation } from "react-i18next";
import ShowAlert from "./ShowAlert";

function Login() {
  const { t } = useTranslation();
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
        <Card title={t("Login", "Login")} style={{ borderRadius: "20px" }}>
          <Form
            initialValues={{ number: "", password: "" }}
            onFinish={(values) => {
              dispatch(login(values));
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
                type="number"
                style={{ borderRadius: "25px" }}
                prefix={
                  <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder=  {t("PhoneNumber", "Phone Number")}
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
                placeholder= {t("Password", "Password")} 
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
                {t("Login", "Login")}
              </Button>{" "}
               {t("Or", "Or")} <Link to="/register"> {t("RegisterNow", "Don't have an account Register now!")} </Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Fragment>
  );
}

export default Login;
