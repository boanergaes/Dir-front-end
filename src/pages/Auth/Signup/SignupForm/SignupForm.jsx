import React from "react";

const SignupForm = () => {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400 ml-1">Email address</label>
        <input 
          type="email" 
          placeholder="name@example.com"
          className="w-full bg-[#0D0D12] border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/50 transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400 ml-1">Password</label>
        <input 
          type="password" 
          placeholder="••••••••"
          className="w-full bg-[#0D0D12] border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/50 transition-all"
        />
      </div>

      

    </form>
  );
};

export default SignupForm;