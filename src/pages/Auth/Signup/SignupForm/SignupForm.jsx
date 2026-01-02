import React from 'react';
import PasswordStrength from './PasswordStrength';

const SignupForm = () => {
  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      {/* Email Input */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">
          Email address
        </label>
        <input 
          type="email" 
          placeholder="name@example.com"
          className="w-full px-4 py-3 bg-[#0D0D12] border border-white/5 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#3f3f96]/50 transition-all"
        />
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">
          Password
        </label>
        <input 
          type="password" 
          placeholder="••••••••"
          className="w-full px-4 py-3 bg-[#0D0D12] border border-white/5 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#3f3f96]/50 transition-all mb-3"
        />
        
        {/* Passwords Strength Component */}
        <PasswordStrength />
      </div>

      <button className="w-full py-3.5 bg-[#3f3f96] hover:bg-[#4a4ab0] text-white rounded-xl font-semibold shadow-lg shadow-indigo-900/20 transition-all active:scale-[0.98]">
        Create Account
      </button>
    </form>
  );
};

export default SignupForm;