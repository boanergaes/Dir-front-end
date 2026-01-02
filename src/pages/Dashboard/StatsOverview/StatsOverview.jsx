import React from 'react';

const StatsOverview = () => {
  const stats = [
    { label: "Total Repositories", value: "10" },
    { label: "Total Workspaces", value: "10" },
    { label: "Open Pull requests", value: "10" },
    { label: "Merged PRS", value: "10" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 w-full">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="
            flex flex-col items-center justify-center 
            bg-[#1D1D29] border border-gray-800 rounded-xl
            transition-transform duration-200 hover:-translate-y-1
            /* Responsive Sizing Logic */
            flex-[1_1_200px] max-w-[300px] h-[160px]
            sm:flex-1
            max-[640px]:flex-[1_1_45%] max-[640px]:h-[120px]
          "
        >
          <span className="text-[0.85rem] text-gray-400 mb-2 text-center px-2">
            {stat.label}
          </span>
          <h2 className="text-white font-bold text-4xl sm:text-[2.5rem] text-center">
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;