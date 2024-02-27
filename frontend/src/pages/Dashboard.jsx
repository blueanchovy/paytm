import React, { useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";

const Dashboard = () => {
  return (
    <div>
      <AppBar />
      <div className="p-6 max-w-screen-xl mx-auto my-0">
        <Balance />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
