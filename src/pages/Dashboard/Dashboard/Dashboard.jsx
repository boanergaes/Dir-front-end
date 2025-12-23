import React, { useState } from "react"; 
import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar"; 
import Footer from "../../../common-components/Footer/Footer.jsx";
import StatsOverview from "../StatsOverview/StatsOverview.jsx";
import ActivityFeed from "../ActivityFeed/ActivityFeed.jsx";
import ContributionSummary from "../ContributionSummary/ContributionSummary"; 
import RecentRepositories from "../RecentRepositories/RecentRepositories";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`dashboard-wrapper ${isMenuOpen ? "menu-open" : ""}`}>
      
      {/* 1. Mobile Header (Uncommented and fixed) */}
      <div className="mobile-top-nav">
        <div className="mobile-logo">🕸️ Dir</div>
        <button className="hamburger-btn" onClick={toggleMenu}>
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* 2. Sidebar - Slides in/out based on isOpen */}
      <Sidebar isOpen={isMenuOpen} />

      {/* 3. Overlay - Dims background and allows closing menu */}
      {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}

      <div className="dashboard-content-area">
        <main className="dashboard-main">
          <div className="stats-section">
            <StatsOverview />
          </div>

          <div className="middle-layout-container">
            <div className="activity-column">
              <ActivityFeed />
            </div>
            <div className="side-column">
              <RecentRepositories />
            </div>
          </div>

          <div className="contribution-section">
            <ContributionSummary />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;