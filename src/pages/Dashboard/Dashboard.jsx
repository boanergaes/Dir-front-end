import React, { useState, useEffect } from "react";
import { authService } from "../../services/auth.service/auth.service.js"; 
import Sidebar from "./Sidebar/Sidebar.jsx";
import Footer from "../../common-components/Footer/Footer.jsx";
import StatsOverview from "./StatsOverview/StatsOverview.jsx";
import ActivityFeed from "../CreateWorkspace/ActivityFeed.jsx";
import ContributionSummary from "./ContributionSummary/ContributionSummary.jsx";
import RecentRepositories from "./RecentRepositories/RecentRepositories.jsx";
import { Menu, X, Bell } from 'lucide-react';

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);
  const [activities, setActivities] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // 1. Capture token from URL redirect
      const params = new URLSearchParams(window.location.search);
      const tokenFromUrl = params.get("token");

      if (tokenFromUrl) {
        localStorage.setItem("token", tokenFromUrl);
        // Clear URL immediately for a clean look
        window.history.replaceState({}, document.title, "/dashboard");
      }

      // 2. Security Check
      const activeToken = localStorage.getItem("token");
      if (!activeToken) {
        window.location.href = "/signup";
        return;
      }

      try {
        setLoading(true);
        
        // 3. Fetch all data in parallel
        const [userRes, statsRes, repoRes, activityRes, heatmapRes] = await Promise.all([
          authService.getCurrentUser(),
          authService.getUserStats(),
          authService.getActiveWorkspaces(),
          authService.getActivityFeed(1, 10),
          authService.getContributionHeatmap()
        ]);

        // --- DEBUG LOGS ---
        // Check your browser console to see if these show your GitHub Info!
        console.log("User API Response:", userRes.data);

        // 4. Update State with Fallback logic
        // This handles both { data: user } and direct user object responses
        const userData = userRes.data?.data || userRes.data;
        setUser(userData);
        
        setStats(statsRes.data?.data || statsRes.data);
        setWorkspaces(repoRes.data?.data || repoRes.data || []);
        setActivities(activityRes.data?.data || activityRes.data || []);
        setHeatmapData(heatmapRes.data?.data || heatmapRes.data || []);

      } catch (error) {
        console.error("Dashboard fetch error:", error);
        // If the token is invalid/expired, send back to signup
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/signup";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#0D0D12] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full max-w-[100vw] bg-[#0D0D12] overflow-hidden">
      
      {/* Sidebar - Passing the real user object */}
      <aside className={`
        fixed inset-y-0 left-0 z-[2001] w-[260px] bg-[#0D0D12] border-r border-white/5 
        transition-transform duration-300 lg:relative lg:translate-x-0 shrink-0
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <Sidebar isOpen={isMenuOpen} toggleMenu={toggleMenu} user={user} />
      </aside>

      <div className="flex-1 flex flex-col min-w-0 bg-[#0D0D12] overflow-hidden">
        <header className="h-[60px] w-full flex items-center justify-between px-6 bg-[#0D0D12] border-b border-white/5 shrink-0 z-[1000]">
          <div className="flex items-center gap-4">
            <button onClick={toggleMenu} className="lg:hidden p-2 text-white hover:bg-white/10 rounded-md">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer p-2 hover:bg-white/5 rounded-full transition-colors">
              <Bell size={22} className="text-gray-400 hover:text-white" />
              {stats?.unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                  {stats.unreadNotifications}
                </span>
              )}
            </div>
            {/* REAL GITHUB USERNAME DISPLAY */}
            <span className="hidden md:block text-xs text-gray-400 font-medium">
              {user?.githubUsername || "Loading profile..."}
            </span>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="w-full max-w-full lg:max-w-[1200px] xl:max-w-[1400px] mx-auto flex flex-col gap-6">
            <StatsOverview stats={stats} />
            
            <div className="flex flex-col xl:flex-row gap-6 w-full overflow-hidden">
              <div className="flex-[2] min-w-0">
                <ActivityFeed activities={activities} />
              </div>
              
              <div className="flex-[1] min-w-0">
                <RecentRepositories repositories={workspaces} />
              </div>
            </div>

            <div className="w-full bg-[#16161D] rounded-xl border border-white/5 p-4 overflow-hidden">
              <h3 className="text-sm text-gray-400 mb-4">Contribution Activity</h3>
              <ContributionSummary data={heatmapData} />
            </div>
            <Footer />
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[1500] lg:hidden" onClick={toggleMenu} />
      )}
    </div>
  );
};

export default Dashboard;