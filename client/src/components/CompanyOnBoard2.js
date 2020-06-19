import React, { useState } from "react";
import { Form, Input, Button, Card, Select, Checkbox } from "antd";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { StateDropdown, RegionDropdown } from "./DropdownSelector";
import { addLabourRequirements } from "../actions/labourActions";
import { useTranslation } from "react-i18next";
function CompanyOnBoard2(props) {
  const { t } = useTranslation();
  const { Option } = Select;
  const [skill, setSkill] = useState(undefined);
  const [State, setState] = useState("");
  const [region, setRegion] = useState("");
  const dispatch = useDispatch();
  return (
    <div
      className="form-container"
      style={{
        boxShadow: "0 10px 25px 0 rgba(0,0,0,0.09)",
        borderRadius: "20px",
      }}
    >
      <Card title= {t("LabourInformation", "Labour Information")} style={{ borderRadius: "20px" }}>
        <Form
          initialValues={{
            stateName: State,
            cityName: region,
            minimumDurationOfWork: "",
            maximumWagePerHour: "",
            labourRequired: "",
            skillsNeeded: skill,
            relocationCost: false,
          }}
          onFinish={(values) => {
            dispatch(addLabourRequirements(values));
            props.history.push("/dashboard");
          }}
        >
          <Form.Item
            name="labourRequired"
            rules={[
              {
                required: true,
                message: "Please enter labour amount!",
              },
            ]}
          >
            <Input
              style={{ borderRadius: "25px" }}
              placeholder={t("labourRequired", "How many labour do you need?")}
            />
          </Form.Item>
          <Form.Item
            name="skillsNeeded"
            rules={[
              {
                required: true,
                message: "Please enter skills needed!",
              },
            ]}
          >
            <Select
              placeholder= {t("skillsNeeded", "Select a Skill")}
              mode="multiple"
              onChange={(val) => setSkill(val)}
              value={skill}
            >
              <Option value="Moving">Moving</Option>
              <Option value="Fork Lift">Fork Lift</Option>
              <Option value="Clay Work">Clay Work</Option>
              <Option value="Construction Work">Construction Work</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="stateName"
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
            name="cityName"
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
          <Form.Item
            name="maximumWagePerHour"
            rules={[
              {
                required: true,
                message: "Please enter max wage!",
              },
            ]}
          >
            <Input
              style={{ borderRadius: "25px" }}
              placeholder= {t("maximumWagePerHour", "Maximum Wage Per Hour")}
            />
          </Form.Item>
          <Form.Item
            name="minimumDurationOfWork"
            rules={[
              {
                required: true,
                message: "Please enter min duration of work!",
              },
            ]}
          >
            <Input
              style={{ borderRadius: "25px" }}
              placeholder={t("minimumDurationOfWork", "Minimum duration for work (in days)")}
            />
          </Form.Item>
          <Form.Item name="relocationCost" valuePropName="checked">
            <Checkbox>{t("relocationCost", "Will you provide relocation cost ?")}</Checkbox>
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
              Next
            </Button>{" "}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default withRouter(CompanyOnBoard2);
