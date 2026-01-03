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
  /* The outermost div must be exactly 100vw and hidden overflow to prevent sliding */
  <div className="flex h-screen w-full max-w-[100vw] bg-[#0D0D12] overflow-hidden">
    
    {/* SIDEBAR: shrink-0 is vital so it doesn't get squashed */}
    <aside className={`
      fixed inset-y-0 left-0 z-[2001] w-[260px] bg-[#0D0D12] border-r border-white/5 
      transition-transform duration-300 lg:relative lg:translate-x-0 shrink-0
      ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
    `}>
      <Sidebar isOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </aside>

    {/* MAIN CONTENT AREA: 
        min-w-0 tells Flexbox to allow this container to be smaller than its children */}
    <div className="flex-1 flex flex-col min-w-0 bg-[#0D0D12] overflow-hidden">
      
      {/* MOBILE HEADER: The toggle line part */}
      <div className="lg:hidden h-[60px] w-full flex items-center justify-between px-6 bg-[#16161D] border-b border-white/5 shrink-0 z-[1000]">
        <div className="flex items-center gap-2">
          <span className="text-xl">🕸️</span>
          <span className="font-bold text-white tracking-tight">Dir</span>
        </div>
        <button 
          onClick={toggleMenu} 
          className="p-2 text-white hover:bg-white/10 rounded-md transition-colors"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* SCROLLABLE DASHBOARD CONTENT */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
        
        {/* Inner Container: Limits width and centers content */}
        <div className="w-full max-w-full lg:max-w-[1200px] xl:max-w-[1400px] mx-auto flex flex-col gap-6">
          
          {/* Section 1: Stats */}
          <div className="w-full overflow-hidden">
            <StatsOverview />
          </div>

          {/* Section 2: Grid (Activity & Repos) */}
          <div className="flex flex-col xl:flex-row gap-6 w-full overflow-hidden">
            <div className="flex-[2] min-w-0">
              <ActivityFeed />
            </div>
            <div className="flex-[1] min-w-0">
              <RecentRepositories />
            </div>
          </div>

          {/* Section 3: Heatmap */}
          <div className="w-full bg-[#16161D] rounded-xl border border-white/5 p-4 overflow-hidden">
            <h3 className="text-sm text-gray-400 mb-4">Contribution Activity</h3>
            {/* Internal scroll for heatmap only */}
            <div className="overflow-x-auto pb-2 custom-scrollbar">
              <ContributionSummary />
            </div>
          </div>

          <Footer />
        </div>
      </main>
    </div>

    {/* REFINED MOBILE OVERLAY: Reduced darkness and very light blur */}
    {isMenuOpen && (
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[1500] lg:hidden transition-opacity duration-300" 
        onClick={toggleMenu} 
      />
    )}
  </div>
);
};

export default Dashboard;