import React, { Fragment, useEffect } from "react";
import { Form, Input, Button, Card, Spin } from "antd";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEditableLabour,
  updateLabourContact,
} from "../actions/labourActions";
import { useTranslation } from "react-i18next";
import { Icon } from "@ant-design/compatible";

function LabourInfo() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEditableLabour());
  }, []);
  const { editableLabourDetails } = useSelector((state) => state.labour);
  if (isEmpty(editableLabourDetails)) return null;
  return (
    <Fragment>
      <Card
        title={t("UpdateDetails", "Update Details")}
        style={{
          borderRadius: "20px",
          boxShadow: "0 10px 25px 0 rgba(0,0,0,0.09)",
        }}
      >
        {editableLabourDetails.workerName &&
        editableLabourDetails.workerPhoneNumber ? (
          <Form
            initialValues={{
              workerName: editableLabourDetails.workerName || "",
              workerPhoneNumber: editableLabourDetails.workerPhoneNumber || "",
            }}
            onFinish={(values) => {
              console.log(values);
              dispatch(updateLabourContact(values));
            }}
          >
            <Form.Item
              name="workerName"
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
                placeholder= {t("WorkerPersonName", "Worker Person Name")}
              />
            </Form.Item>
            <Form.Item
              name="workerPhoneNumber"
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
                placeholder="Contact Number"
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
      </Card>
    </Fragment>
  );
}

export default LabourInfo;
