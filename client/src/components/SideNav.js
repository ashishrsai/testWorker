import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import { Icon } from "@ant-design/compatible";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
const { SubMenu } = Menu;
function SideNav({ location }) {
  const { t } = useTranslation();
  const name = location.pathname.split("/")[2] || "home";
  const { user } = useSelector((state) => state.auth);
  const [current, setCurrent] = useState(name);
  useEffect(() => {
    setCurrent(name);
  }, [name]);
  return (
    <Menu
      onClick={(e) => setCurrent(e.key)}
      selectedKeys={[current]}
      mode="inline"
      defaultOpenKeys={["home"]}
      style={{
        boxShadow: "10px 0px 25px 0 rgba(0,0,0,0.09)",
        maxWidth: "300px",
        height: "100vh",
        position: "fixed",
        zIndex: "1",
        left: "0",
      }}
    >
      <Menu.Item key="home" icon={<Icon type="home" />}>
        {user && user.type === "Labourer" && (
          <Link to="/labour-dashboard">{t("WorkerOverview", "Worker Overview")}</Link>
        )}
        {user && user.type === "Company" && (
          <Link to="/dashboard">{t("CompanyOverview", "Company Overview")}</Link>
        )}
        {user && user.type === "Coordinator" && (
          <Link to="/coordinator-dashboard"> {t("WorkerOverview", "Overview")}</Link>
        )}
      </Menu.Item>

      <Menu.Item key="details" icon={<Icon type="user" />}>
        {user && user.type === "Labourer" && (
          <Link to="/labour-dashboard/details"> {t("WorkerDetails", "Worker Details")}</Link>
        )}
        {user && user.type === "Company" && (
          <Link to="/dashboard/details"> {t("RequestDetails", "Request Details")}</Link>
        )}
        {user && user.type === "Coordinator" && (
          <Link to="/coordinator-dashboard/details">{t("RequestDetails", "Request Details")}</Link>
        )}
      </Menu.Item>

      <Menu.Item key="list" icon={<Icon type="team" />}>
        {user && user.type === "Labourer" && (
          <Link to="/labour-dashboard/list"> {t("CompanyList", "Company List")}</Link>
        )}
        {user && user.type === "Company" && (
          <Link to="/dashboard/list"> {t("WorkerList", "Worker List")}</Link>
        )}
        {user && user.type === "Coordinator" && (
          <Link to="/coordinator-dashboard/list">{t("CompanyList", "Company List")}</Link>
        )}
      </Menu.Item>

      <Menu.Item key="market-trends" icon={<Icon type="areaChart" />}>
        <Link to="/dashboard/market-trends">
          {" "}
          {t("MarketTrends", "Market Trends")}{" "}
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default withRouter(SideNav);
