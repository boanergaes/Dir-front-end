import React from 'react';
import { 
  LayoutDashboard, 
  Folder, 
  Workflow, 
  Search, 
  Settings, 
  LogOut,
  X 
} from 'lucide-react'; 

// Added 'user' to the props destructured here
const Sidebar = ({ isOpen, toggleMenu, user }) => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true },
    { name: 'Repositories', icon: Folder },
    { name: 'Workspaces', icon: Workflow },
    { name: 'Explore', icon: Search },
    { name: 'Settings', icon: Settings },
  ];

  // Helper to get initials if there's no avatar
  const getInitials = (name) => {
    if (!name) return "??";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="flex flex-col h-full bg-[#0D0D12] border-r border-white/5 p-[30px_20px]">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-5 mb-2.5">
        <div className="flex items-center gap-5">
          <div className="text-2xl">🕸️</div>
          <h1 className="text-[25px] font-black text-white">Dir</h1>
        </div>
        
        <button 
          className="lg:hidden text-gray-400 hover:text-white" 
          onClick={toggleMenu}
        >
          <X size={24} />
        </button>
      </div>

      {/* DYNAMIC User Section */}
      <div className="flex items-center gap-3 mb-[30px] mt-4">
        {user?.avatarUrl ? (
          <img 
            src={user.avatarUrl} 
            alt="Profile" 
            className="w-9 h-9 rounded-full object-cover shrink-0 border border-white/10"
          />
        ) : (
          <div className="w-9 h-9 bg-[#2D2D3A] rounded-full flex items-center justify-center text-[#9CA3AF] shrink-0 text-sm font-bold">
            {getInitials(user?.githubUsername || "User")}
          </div>
        )}
        
        <div className="flex flex-col min-w-0">
          <p className="text-[0.9rem] font-medium text-white leading-none truncate">
            {user?.githubUsername || "Loading..."}
          </p>
          <p className="text-[0.75rem] text-gray-400 mt-1 truncate">
            @{user?.githubUsername?.toLowerCase().replace(/\s/g, '') || "username"}
          </p>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index} 
              className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-200
                ${item.active 
                  ? 'bg-[#3f3f96]/20 text-[#7b7be5] rounded-lg' 
                  : 'text-gray-400 hover:text-white'}`}
            >
              <Icon size={20} strokeWidth={2} />
              <span className="text-[0.95rem] font-medium">{item.name}</span>
            </div>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="mt-auto">
        <div className="h-[1px] bg-white/5 mb-2"></div>
        <div className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-red-400 cursor-pointer transition-colors">
          <LogOut size={20} strokeWidth={2} />
          <span className="text-[0.95rem] font-medium">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;