import React from "react";
import { Link } from "react-router-dom";
import OAuthButtons from "../OAuthButtons/OAuthButtons";
import SignupForm from "../SignupForm/SignupForm";

const Signup = () => {
  return (
    <div className="min-h-screen bg-[#0D0D12] flex items-center justify-center p-4">
      <div className="w-full max-w-[440px] bg-[#16161D] rounded-3xl border border-white/5 p-10 shadow-2xl">
        
        {/* Header Icon & Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="text-gray-400 mb-6">
            
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome to Dir</h2>
          <p className="text-gray-400 text-sm">
            Already have an account? <Link to="/login" className="text-[#6366f1] hover:underline">Log in</Link>
          </p>
        </div>

        {/* OAuth Buttons at the Top */}
        <OAuthButtons />

        {/* Divider */}
        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          
        </div>

        {/* Form Fields */}
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;