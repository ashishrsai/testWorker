import React, { Fragment } from "react";
import SideNav from "./SideNav";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import ShowAlert from "./ShowAlert";
import CoordinatorDashboardHome from "./CoordinatorDashboardHome";
import CoordinatorDashboardDetails from "./CoordinatorDashboardDetails";
import CoordinatorCompanyList from "./CoordinatorCompanyList";
import MarketTrends from "./MarketTrends";

function CoordinatorDashboard({ match }) {
  const alerts = useSelector((state) => state.alerts);
  return (
    <Fragment>
      {alerts && alerts.length > 0 && alerts.map((alert) => ShowAlert(alert))}
      <div className="dashboard-container">
        <SideNav />
        <div class="dashboard-content">
          <Route
            exact
            path="/coordinator-dashboard"
            component={CoordinatorDashboardHome}
          />
          <Route
            path="/coordinator-dashboard/details"
            component={CoordinatorDashboardDetails}
          />
          <Route
            path="/coordinator-dashboard/list"
            component={CoordinatorCompanyList}
          />
          <Route path="/dashboard/market-trends" component={MarketTrends} />
        </div>
      </div>
    </Fragment>
  );
}

export default CoordinatorDashboard;
