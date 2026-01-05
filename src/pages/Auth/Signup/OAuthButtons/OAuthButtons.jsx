import React from "react";
import { Github } from "lucide-react"; 

// UPGRADE: We accept 'onGithubClick' as a prop from the Signup page
const OAuthButtons = ({ onGithubClick }) => {
  return (
    <div className="flex flex-col gap-3 w-full mt-6">
      
      <button 
        // UPGRADE: This button now executes the function passed from Signup.jsx
        onClick={onGithubClick}
        className="flex items-center justify-center gap-2 w-full bg-[#1e1e44] hover:bg-[#2a2a5a] text-white py-3 px-4 rounded-md transition-all duration-200 font-medium uppercase tracking-wider text-sm"
      >
        <Github size={18} />
        <span>Continue with GitHub</span>
      </button>
      
    </div>
  );
};

export default OAuthButtons;