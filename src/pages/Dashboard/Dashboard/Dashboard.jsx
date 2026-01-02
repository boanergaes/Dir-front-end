import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../../../common-components/Footer/Footer.jsx";
import StatsOverview from "../StatsOverview/StatsOverview.jsx";
import ActivityFeed from "../ActivityFeed/ActivityFeed.jsx";
import ContributionSummary from "../ContributionSummary/ContributionSummary";
import RecentRepositories from "../RecentRepositories/RecentRepositories";
import { Menu, X } from 'lucide-react';

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // dashboard-wrapper: flex-row, min-h-100vh, bg-dark
    <div className="flex flex-row min-h-screen w-full bg-[#0D0D12] justify-center lg:-mt-5">
      
      {/* 1. Mobile Top Navigation (mobile-top-nav) */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-[60px] bg-[#0D0D12] border-b border-gray-800 px-5 flex items-center justify-between z-[2000]">
        <div className="text-white font-bold text-lg">🕸️ Dir</div>
        <button className="text-white" onClick={toggleMenu} aria-label="Toggle Menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 2. Sidebar Container (sidebar-container) */}
      <aside className={`
        /* Base Styles from .sidebar-container */
        w-[260px] min-w-[260px] h-screen bg-[#0D0D12] border-r border-gray-800
        
        /* Desktop Logic: Sticky */
        lg:sticky lg:top-0 lg:translate-x-0
        
        /* Mobile Logic: Fixed & Hidden by default */
        fixed top-0 left-0 z-[2001] transition-transform duration-300 ease-in-out
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <Sidebar isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </aside>

      {/* 3. Overlay (menu-overlay) */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[1500] lg:hidden" 
          onClick={toggleMenu}
        ></div>
      )}

      {/* 4. Main Content Area (dashboard-content-area) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Adds top margin on mobile to account for fixed top nav */}
        <main className="p-6 lg:p-10 flex flex-col gap-8 mt-[60px] lg:mt-0">
          
          {/* Stats Cards (stats-section) */}
          <div className="w-full">
            <StatsOverview />
          </div>

          {/* Grid Layout (middle-layout-container) */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 lg:gap-8 w-full">
            <div className="w-full">
              <ActivityFeed />
            </div>
            <div className="w-full">
              <RecentRepositories />
            </div>
          </div>

          {/* Heatmap (contribution-section) */}
          <div className="w-full">
            <ContributionSummary />
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;