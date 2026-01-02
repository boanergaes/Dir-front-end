import React from 'react';
import OAuthButtons from './OAuthButtons';
import SignupForm from './SignupForm';

const Signup = () => {
  return (
    // Main wrapper: Centered dark background
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0D0D12] p-4 font-sans">
      
      {/* Signup Card */}
      <div className="w-full max-w-[480px] bg-[#1D1D29] border border-white/5 rounded-2xl p-8 lg:p-10 shadow-2xl">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="text-3xl mb-4">🕸️</div>
          <h1 className="text-2xl font-bold text-white mb-2">Create an account</h1>
          <p className="text-gray-400 text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-[#7b7be5] hover:underline font-medium">Log in</a>
          </p>
        </div>

        {/* Social Login Buttons Component */}
        <OAuthButtons />

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#1D1D29] px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* The Main Form Component */}
        <SignupForm />

        {/* Footer Policy */}
        <p className="mt-8 text-center text-xs text-gray-500 leading-relaxed">
          By clicking continue, you agree to our{' '}
          <a href="#" className="underline hover:text-gray-300">Terms of Service</a> and{' '}
          <a href="#" className="underline hover:text-gray-300">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default Signup;