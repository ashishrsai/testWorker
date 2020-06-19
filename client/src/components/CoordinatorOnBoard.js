import React, { useState, Fragment } from "react";
import { Form, Input, Button, Card, Select, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import ShowAlert from "./ShowAlert";
import { addLabourCoordinator } from "../actions/coordinatorActions";
import { StateDropdown } from "./DropdownSelector";
import { useTranslation } from "react-i18next";
function CoordinatorOnBoard(props) {
  const { t } = useTranslation();
  const { Option } = Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [State, setState] = useState();
  const [StatePref, setStatePref] = useState();
  const [skill, setSkill] = useState();
  const [isMultiple, setMultiple] = useState(false);
  const alerts = useSelector((state) => state.alerts);
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
        <Card title={t("LabourInformations", "Labour Information")} style={{ borderRadius: "20px" }}>
          <Form
            form={form}
            initialValues={{
              labourerName: "",
              labourerPhoneNumber: "",
              preferance: StatePref,
              labourerState: State,
              skills: skill,
              minimumWage: "",
              minimumWorkDuration: "",
              relocationCost: false,
            }}
            onFinish={(values) => {
              console.log(values);
              dispatch(addLabourCoordinator(values));
              if (isMultiple) {
                setSkill([]);
                setState("");
                setStatePref("");
                form.resetFields();
                setMultiple(false);
              } else {
                props.history.push("/coordinator-dashboard");
              }
            }}
          >
            <Form.Item
              name="labourerName"
              rules={[
                {
                  required: true,
                  message: "Please enter contact person name!",
                },
              ]}
            >
              <Input
                style={{ borderRadius: "25px" }}
                placeholder={t("LabourName" , "Labour Name")}
              />
            </Form.Item>
            <Form.Item
              name="labourerPhoneNumber"
              rules={[
                {
                  required: true,
                  message: "Please enter contact person name!",
                },
              ]}
            >
              <Input
                style={{ borderRadius: "25px" }}
                placeholder= {t("LabourPhoneNo", "Labour Phone No.")}
              />
            </Form.Item>
            <Form.Item
              name="labourerState"
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
              name="preference"
              rules={[
                {
                  required: true,
                  message: "Please enter state!",
                },
              ]}
            >
              <StateDropdown
                value={State}
                defaultOptionLabel={"Select State Preference"}
                onChange={(val) => setState(val)}
              />
            </Form.Item>
            <Form.Item
              name="skills"
              rules={[
                {
                  required: true,
                  message: "Please enter skills!",
                },
              ]}
            >
              <Select
                placeholder={t("SelectASkill" , "Select a Skill")}
                mode="multiple"
                allowClear={true}
                autoClearSearchValue={true}
                onChange={(val) => setSkill(val)}
                value={skill}
              >
                <Option value="Moving" key="moving">
                  Moving
                </Option>
                <Option value="Fork Lift" key="forklift">
                  Fork Lift
                </Option>
                <Option value="Clay Work" key="claywork">
                  Clay Work
                </Option>
                <Option value="Construction Work" key="constructionwork">
                  Construction Work
                </Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="minimumWorkDuration"
              rules={[
                {
                  required: true,
                  message: "Please enter min duration of work!",
                },
              ]}
            >
              <Input
                style={{ borderRadius: "25px" }}
                placeholder= {t("minimumDurationOfWork","Minimum duration for work (in days)")}
              />
            </Form.Item>
            <Form.Item
              name="minimumWage"
              rules={[
                {
                  required: true,
                  message: "Please enter max wage!",
                },
              ]}
            >
              <Input
                style={{ borderRadius: "25px" }}
                placeholder= {t("minimumWagePerHour" , "Minimum Wage Per Hour")}
              />
            </Form.Item>
            <Form.Item name="relocationCost" valuePropName="checked">
              <Checkbox> {t("relocationCostCost" , "Will you need relocation cost")}</Checkbox>
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
                 {t("Next" , "Next")}
              </Button>{" "}
            </Form.Item>
            <Form.Item>
              <Button
                style={{
                  height: "auto",
                  backgroundColor: "#5854FF",
                  borderRadius: "24px",
                }}
                type="primary"
                onClick={() => setMultiple(true)}
                size="large"
                htmlType="submit"
              >
                  {t("AddAnotherLabour" , "Add Another Labour")}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Fragment>
  );
}

export default withRouter(CoordinatorOnBoard);
