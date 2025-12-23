import React from 'react';
import './StatsOverview.css';

const StatsOverview = () => {
  const stats = [
    { label: "Total Repositories", value: "10" },
    { label: "Total Worksttpaces", value: "10" },
    { label: "Open Pull requests", value: "10" },
    { label: "Merged PRS", value: "10" },
  ];

  return (
    /* flex-wrap allows cards to drop to the next line on small screens.
       justify-center keeps them in the middle of the dashboard.
    */
    <div className="flex flex-wrap justify-center gap-4 w-full stats-container">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <span className="stat-label">{stat.label}</span>
          <h2 className="stat-value">{stat.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;