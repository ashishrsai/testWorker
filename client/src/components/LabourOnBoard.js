import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Select, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { addLabour, fetchLabourName } from "../actions/labourActions";
import { StateDropdown, RegionDropdown } from "./DropdownSelector";
import { useTranslation } from "react-i18next";
function LabourOnBoard(props) {
  const { t } = useTranslation();
  const { Option } = Select;
  const dispatch = useDispatch();
  const [State, setState] = useState("");
  const [region, setRegion] = useState("");
  const [StatePref, setStatePref] = useState("");
  const [regionPref, setRegionPref] = useState("");
  const [skill, setSkill] = useState(undefined);
  useEffect(() => {
    dispatch(fetchLabourName());
  }, [dispatch]);
  const { name } = useSelector((state) => state.labour.labourName);
  if (name && name.length > 0) {
    //labour already exist in db no need of form
    return <Redirect to="/labour-dashboard" />;
  }
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
            workerName: "",
            workerState: State,
            workerCity: region,
            workerSkills: skill,
            statePreference: StatePref,
            cityPreference: regionPref,
            minimumWorkDuration: "",
            minimumWage: "",
            relocationCost: false,
          }}
          onFinish={(values) => {
            dispatch(addLabour(values));
            props.history.push("/labour-dashboard");
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
            <Input style={{ borderRadius: "25px" }} placeholder={t("LabourName","Labour Name")}  />
          </Form.Item>
          <Form.Item
            name="workerState"
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
            name="workerCity"
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
            name="workerSkills"
            rules={[
              {
                required: true,
                message: "Please enter skills!",
              },
            ]}
          >
            <Select
              placeholder= {t("SelectSkill","Select a Skill")}
              mode="multiple"
              onChange={(val) => setSkill(val)}
              value={skill}
            >
                <Option value="Mason"> {t("mason", "Mason")} </Option>
              <Option value="Masons Helper"> {t("MasonsHelper", "Masons Helper")}</Option>
              <Option value="Barbenders">{t("Barbenders", "Barbenders")}</Option>
              <Option value="Barbenders Helper">{t("BarbendersHelper", "Barbenders Helper")}</Option>
              <Option value="Carpenters">{t("Carpenters", "Carpenters")}</Option>
              <Option value="Carpenters Helper">{t("CarpentersHelper", "Carpenters Helper")}</Option>
              <Option value="Plumbers Helper">{t("PlumbersHelper", "Plumbers Helper")}</Option>
              <Option value="Flooring">{t("Flooring", "Flooring")}</Option>
              <Option value="Flooring Helper">{t("FlooringHelper", "Flooring Helper")}</Option>
              <Option value="Painters">{t("Painters", "Painters")}</Option>
              <Option value="Painters Helper">{t("PaintersHelper", "Painters Helper")}</Option>
              <Option value="HVAC Ducting">{t("HVACDucting", "HVAC Ducting")}</Option>
              <Option value="HVAC Ducting Helper">{t("HVACDuctingHelper", "HVAC Ducting Helper")}</Option>
              <Option value="Electricians">{t("Electricians", "Electricians")}</Option>
              <Option value="Electricians Helper">{t("ElectriciansHelper", "Electricians Helper")}</Option>
              <Option value="Male Mazdoor">{t("MaleMazdoor", "Male Mazdoor")}</Option>
              <Option value="Female Mazdoor">{t("FemaleMazdoor", "Female Mazdoor")}</Option>
              <Option value="Cleaners">{t("Cleaners", "Cleaners")}</Option>
              <Option value="Loading Unloading Helper">{t("LoadingUnloadingHelper", "Loading Unloading Helper")}</Option>
              <Option value="Welders">{t("Welders", "Welders")}</Option>
              <Option value="Foreman Munshi">{t("ForemanMunshi", "Foreman Munshi")}</Option>
               </Select>
          </Form.Item>
          <Form.Item
            name="statePreference"
            rules={[
              {
                required: true,
                message: "Please enter state!",
              },
            ]}
          >
            <StateDropdown
              value={StatePref}
              onChange={(val) => setStatePref(val)}
              defaultOptionLabel={t("statePreference","Select State Preference")}
            />
          </Form.Item>
          <Form.Item
            name="cityPreference"
            rules={[
              {
                required: true,
                message: "Please enter city!",
              },
            ]}
          >
            <RegionDropdown
              country={StatePref}
              value={regionPref}
              onChange={(val) => setRegionPref(val)}
              blankOptionLabel= {t("cityPreference","Select City Preference")}
            />
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
              placeholder={t("minimumWagePerHour","Minimum Wage Per Day")}
            />
          </Form.Item>
          <Form.Item name="relocationCost" valuePropName="checked">
            <Checkbox>{t("relocationCostCost","Will you need food and residence?")}</Checkbox>
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
            {t("Next","Next")}
            </Button>{" "}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default withRouter(LabourOnBoard);
