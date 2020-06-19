import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/authActions";
import { clearAll } from "../actions/companyActions";
import { labourClearAll } from "../actions/labourActions";
import { Menu } from "antd";
import { useTranslation } from "react-i18next";

function Nav({ location }) {
  const { t } = useTranslation();
  const [current, setCurrent] = useState("language");
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Menu
      mode="horizontal"
      selectedKeys={current}
      style={{ position: "fixed", zIndex: "999", width: "100%", top: "0" }}
      onClick={(e) => setCurrent(e.key)}
    >
      <Menu.Item key="language">
        <Link to="/"> {t("Home", "Home")} </Link>
      </Menu.Item>
      {isAuthenticated ? (
        <Menu.Item key="logout" style={{ float: "right" }}>
          <Link
            to="/login"
            onClick={() => {
              dispatch(logout());
              dispatch(clearAll());
              dispatch(labourClearAll());
            }}
          >
             {t("Logout", "Logout")}
          </Link>
        </Menu.Item>
      ) : null}

      <Menu.Item key="about" style={{ float: "right" }}>
        <Link to="/">{t("AboutUs", "About Us")}</Link>
      </Menu.Item>
    </Menu>
  );
}

export default withRouter(Nav);
