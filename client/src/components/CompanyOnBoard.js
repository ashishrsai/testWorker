import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { addCompany, getCompanyName } from "../actions/companyActions";
import { StateDropdown, RegionDropdown } from "./DropdownSelector";
import { useTranslation } from "react-i18next";
function CompanyOnBoard(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [State, setState] = useState("");
  const [region, setRegion] = useState("");
  useEffect(() => {
    dispatch(getCompanyName());
  }, [dispatch]);
  const { companyName } = useSelector((state) => state.company);
  if (companyName.length > 0) {
    //user already has a company
    return <Redirect to="/dashboard" />;
  }
  return (
    <div
      className="form-container"
      style={{
        boxShadow: "0 10px 25px 0 rgba(0,0,0,0.09)",
        borderRadius: "20px",
      }}
    >
      <Card title= {t("CompanyInformation", "Company Information")} style={{ borderRadius: "20px" }}>
        <Form
          initialValues={{
            companyName: "",
            contactPersonName: "",
            state: State,
            city: region,
          }}
          onFinish={(values) => {
            dispatch(addCompany(values));
            props.history.push("/company-info-2");
          }}
        >
          <Form.Item
            name="companyName"
            rules={[
              {
                required: true,
                message: "Please enter company name!",
              },
            ]}
          >
            <Input
              style={{ borderRadius: "25px" }}
              placeholder={t("CompanyName", "Company Name" )}
            />
          </Form.Item>
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
              placeholder= {t("ContactPersonName", "Contact Person Name" )}
            />
          </Form.Item>
          <Form.Item
            name="contactPersonDesignation"
            rules={[
              {
                required: true,
                message: "Please enter contact person designation!",
              },
            ]}
          >
            <Input
              style={{ borderRadius: "25px" }}
              placeholder= {t("contactPersonDesignation", "Contact Person Designation" )}
            />
          </Form.Item>
          <Form.Item
            name="gstNumber"
            rules={[
              {
                required: true,
                message: "Please enter company GST Number!",
              },
            ]}
          >
            <Input
              style={{ borderRadius: "25px" }}
              placeholder= {t("gstNumber", "GST Number" )}
            />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Please enter company address!",
              },
            ]}
          >
            <Input
              style={{ borderRadius: "25px" }}
              placeholder= {t("address", "Address" )}
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
              {t("Next", "Next" )}
            </Button>{" "}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default withRouter(CompanyOnBoard);