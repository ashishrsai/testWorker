import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { Link } from "react-router-dom";
function LanguageSelection() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang) => i18n.changeLanguage(lang);
  return (
    <Fragment>
      <div className="language-container">
        <h1>Please click on your prefered language</h1>
        <div className="buttons">
          <Link to="/entity">
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
              English
            </Button>
          </Link>
          <Link to="/entity">
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
            onClick={() => changeLanguage("hi")}
          >
            हिन्दी
          </Button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default LanguageSelection;
