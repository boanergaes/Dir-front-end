import React from "react";

const OAuthButtons = () => {
  return (
  <div className="flex flex-col gap-4 w-full max-w-sm">
      
      {/* Sign Up Button */}
      <button className="flex items-center justify-center gap-2 w-full bg-[#1e1e44] hover:bg-[#2a2a5a] text-white py-3 px-4 rounded-md transition-colors duration-200 font-medium uppercase tracking-wider text-sm">
        <UserPlus size={18} />
        <span>Sign Up</span>
      </button>

      {/* Continue with GitHub Button */}
      <button className="flex items-center justify-center gap-2 w-full bg-[#1e1e44] hover:bg-[#2a2a5a] text-white py-3 px-4 rounded-md transition-colors duration-200 font-medium uppercase tracking-wider text-sm">
        <Github size={18} />
        <span>Continue with GitHub</span>
      </button>

      {/* Log In Link */}
      <p className="text-gray-400 text-sm text-center mt-2">
        Already have an account?{' '}
        <a href="/login" className="text-white font-bold hover:underline">
          Log in
        </a>
      </p>
      
    </div>
  );
};

export default OAuthButtons;