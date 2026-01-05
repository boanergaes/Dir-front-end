import React from "react";
import { Link } from "react-router-dom";
import OAuthButtons from "../OAuthButtons/OAuthButtons";
import SignupForm from "../SignupForm/SignupForm";

const Signup = () => {
  // UPGRADE: Centralized logic. If your backend URL changes, 
  // you only change it here once.
  const handleGithubClick = () => {
    window.location.href = "http://localhost:5000/auth/github";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <div className="w-full max-w-[440px] bg-[#16161D] rounded-3xl border border-white/5 p-10 shadow-2xl">
        
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome to Dir</h2>
        </div>

        {/* Keeping your form for UI/Profile requirements */}
        <SignupForm />

        {/* UPGRADE: We are now passing the function as a 'prop' named onGithubClick */}
        <OAuthButtons onGithubClick={handleGithubClick} />

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-white font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;