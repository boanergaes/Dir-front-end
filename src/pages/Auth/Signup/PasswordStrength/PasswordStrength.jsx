import React from 'react';

const PasswordStrength = ({ strength = 2 }) => {
  return (
    <div className="space-y-2">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((level) => (
          <div 
            key={level}
            className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
              level <= strength ? 'bg-[#7b7be5]' : 'bg-[#2D2D3A]'
            }`}
          />
        ))}
      </div>
      <p className="text-[11px] text-gray-500 italic">
        Use 8 or more characters with a mix of letters, numbers & symbols.
      </p>
    </div>
  );
};

export default PasswordStrength;