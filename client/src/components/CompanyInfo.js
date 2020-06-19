import React, { useEffect } from "react";
import { Form, Input, Button, Card, Spin } from "antd";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEditableNames,
  updateContactDetails,
} from "../actions/companyActions";
import { Icon } from "@ant-design/compatible";
import { useTranslation } from "react-i18next";
function CompanyInfo() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEditableNames());
  }, []);
  const { t } = useTranslation();
  const { editableNamesResult } = useSelector((state) => state.company);
  if (isEmpty(editableNamesResult)) return null;
  return (
    <Card
      title= {t("UpdateDetails", "Update Details")}
      style={{
        borderRadius: "20px",
        boxShadow: "0 10px 25px 0 rgba(0,0,0,0.09)",
      }}
    >
      {editableNamesResult.contactPersonName &&
      editableNamesResult.companyPhoneNumber ? (
        <Form
          initialValues={{
            contactPersonName: editableNamesResult.contactPersonName || "",
            companyPhoneNumber: editableNamesResult.companyPhoneNumber || "",
          }}
          onFinish={(values) => {
            console.log(values);
            dispatch(updateContactDetails(values));
          }}
        >
          <Form.Item
            name="contactPersonName"
            rules={[
              {
                required: true,
                message: "Please enter contact person name!",
              },
            ]}
          >
            <Input
              style={{ borderRadius: "25px" }}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder={t("ContactPersonName", "Contact Person Name")}
            />
          </Form.Item>
          <Form.Item
            name="companyPhoneNumber"
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
              placeholder= {t("PhoneNumber", "Contact Number")}
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
  );
}

export default CompanyInfo;
