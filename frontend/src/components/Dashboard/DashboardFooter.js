import React from "react";
import "../../styles/dashboardFooter.css";  // Separate styles for dashboard footer

const DashboardFooter = () => {
  return (
    <footer className="dashboard-footer">
      <p>&copy; {new Date().getFullYear()} AppointTrack. All rights reserved.</p>
    </footer>
  );
};

export default DashboardFooter;
