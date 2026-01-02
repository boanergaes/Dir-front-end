import React from 'react';
import { Chrome } from 'lucide-react'; // Or use specific brand icons

const OAuthButtons = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#242429] hover:bg-[#2a2a32] border border-white/5 rounded-lg text-white text-sm font-medium transition-colors">
        <Chrome size={18} />
        Google
      </button>
      <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#242429] hover:bg-[#2a2a32] border border-white/5 rounded-lg text-white text-sm font-medium transition-colors">
        <span className="text-lg"></span>
        Apple
      </button>
    </div>
  );
};

export default OAuthButtons;