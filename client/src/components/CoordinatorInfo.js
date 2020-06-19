import React, { Fragment, useEffect } from "react";
import { Form, Input, Button, Card, Spin } from "antd";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  coordinatorEditDetails,
  coordinatorUpdateDetails,
} from "../actions/coordinatorActions";
import { Icon } from "@ant-design/compatible";
import { useTranslation } from "react-i18next";
function CoordinatorInfo() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(coordinatorEditDetails());
  }, []);
  const { editableLabourDetails } = useSelector((state) => state.coordinator);
  if (isEmpty(editableLabourDetails)) return null;
  return (
    <Fragment>
      <Card
        title= {t("UpdateDetails", "Update Details")}
        style={{
          borderRadius: "20px",
          boxShadow: "0 10px 25px 0 rgba(0,0,0,0.09)",
        }}
      >
        {editableLabourDetails.coordinatorName &&
        editableLabourDetails.coordinatorPhoneNumber ? (
          <Form
            initialValues={{
              coordinatorName: editableLabourDetails.coordinatorName || "",
              coordinatorPhoneNumber:
                editableLabourDetails.coordinatorPhoneNumber || "",
            }}
            onFinish={(values) => {
              console.log(values);
              dispatch(coordinatorUpdateDetails(values));
            }}
          >
            <Form.Item
              name="coordinatorName"
              rules={[
                {
                  required: true,
                  message: "Please enter contact person name!",
                },
              ]}
            >
              <Input
                style={{ borderRadius: "25px" }}
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder={t("WorkerPersonName", "Worker Person Name")}
              />
            </Form.Item>
            <Form.Item
              name="coordinatorPhoneNumber"
              rules={[
                {
                  required: true,
                  message: "Please enter contact phone number!",
                },
              ]}
            >
              <Input
                style={{ borderRadius: "25px" }}
                prefix={
                  <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                name="number"
                placeholder= {t("ContactNumber", "Contact Number")}
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
                {t("Update", "Update")}
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Spin />
        )}

        <Link to="/coordinator-info">
          <Button>{t("AddNewLabour", "Add New Labour")}</Button>
        </Link>
      </Card>
    </Fragment>
  );
}

export default CoordinatorInfo;
