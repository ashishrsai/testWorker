import React from "react";
import SideNav from "./SideNav";
import { Route } from "react-router-dom";
import DashboardHome from "./DashboardHome";
import DashboardDetails from "./DashboardDetails";
import MarketTrends from "./MarketTrends";
import WorkersList from "./WorkersList";

function Dashboard({ match }) {
  return (
    <div className="dashboard-container">
      <SideNav />
      <div class="dashboard-content">
        <Route exact path="/dashboard" component={DashboardHome} />
        <Route path="/dashboard/details" component={DashboardDetails} />
        <Route path="/dashboard/list" component={WorkersList} />
        <Route path="/dashboard/market-trends" component={MarketTrends} />
      </div>
    </div>
  );
}

export default Dashboard;
