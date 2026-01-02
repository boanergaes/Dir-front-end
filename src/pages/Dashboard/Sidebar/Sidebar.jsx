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

const Sidebar = ({ isOpen, toggleMenu }) => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true },
    { name: 'Repositories', icon: Folder },
    { name: 'Workspaces', icon: Workflow },
    { name: 'Explore', icon: Search },
    { name: 'Settings', icon: Settings },
  ];

  return (
    /* The outer logic (w-260, transition, transform) is handled by the parent Dashboard container */
    <div className="flex flex-col h-full bg-[#0D0D12] border-r border-white/5 p-[30px_20px]">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-5 mb-2.5">
        <div className="flex items-center gap-5">
          <div className="text-2xl">🕸️</div>
          <h1 className="text-[25px] font-black text-white">Dir</h1>
        </div>
        
        {/* Mobile-only Close Button */}
        <button 
          className="lg:hidden text-gray-400 hover:text-white" 
          onClick={toggleMenu}
        >
          <X size={24} />
        </button>
      </div>

      {/* Sidebar User Section */}
      <div className="flex items-center gap-3 mb-[30px] mt-4">
        <div className="w-9 h-9 bg-[#2D2D3A] rounded-full flex items-center justify-center text-[#9CA3AF] shrink-0 text-sm">
          ZM
        </div>
        <div className="flex flex-col">
          <p className="text-[0.9rem] font-medium text-white leading-none">Zeamanuel Mebit</p>
          <p className="text-[0.75rem] text-gray-400 mt-1">@zeaman</p>
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