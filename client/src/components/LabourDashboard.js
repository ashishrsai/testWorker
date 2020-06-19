import React, { Fragment } from "react";
import SideNav from "./SideNav";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import ShowAlert from "./ShowAlert";
import LabourDashboardHome from "./LabourDashboardHome";
import LabourDashboardDetails from "./LabourDashboardDetails";
import CompanyList from "./CompanyList";
import MarketTrends from "./MarketTrends";

function LabourDashboard({ match }) {
  const alerts = useSelector((state) => state.alerts);
  return (
    <Fragment>
      {alerts && alerts.length > 0 && alerts.map((alert) => ShowAlert(alert))}
      <div className="dashboard-container">
        <SideNav />
        <div class="dashboard-content">
          <Route
            exact
            path="/labour-dashboard"
            component={LabourDashboardHome}
          />
          <Route
            path="/labour-dashboard/details"
            component={LabourDashboardDetails}
          />
          <Route path="/labour-dashboard/list" component={CompanyList} />
          <Route path="/dashboard/market-trends" component={MarketTrends} />
        </div>
      </div>
    </Fragment>
  );
}

export default LabourDashboard;
