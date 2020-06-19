import React, { Fragment } from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
function EntitySelection() {
  const { t } = useTranslation();
  return (
    <Fragment>
      <div className="language-container">
        <h1> {t("entitySelection", "Please select the Entity")}</h1>
        <div className="buttons">
          <Link to="/login">
            <Button
              style={{
                marginRight: "50px",
                height: "auto",
                fontSize: "1.5rem",
                padding: "5px 40px",
                backgroundColor: "#5854FF",
                borderRadius: "10px",
              }}
              type="primary"
              size="large"
            >
              {t("company", "Company")}
            </Button>
          </Link>
          <Button
            style={{
              height: "auto",
              backgroundColor: "#5854FF",
              padding: "5px 40px",
              fontSize: "1.5rem",
              borderRadius: "10px",
            }}
            type="primary"
            size="large"
          >
            {t("worker", "Worker")}
          </Button>
        </div>
      </div>
    </Fragment>
  );
}

export default EntitySelection;
