import React from 'react';
import './ContributionSummary.css';

const ContributionSummary = () => {
  // Mock data representing the 12 clusters of vertical points
  const clusters = Array(12).fill([
    [1, 0, 1, 0, 1], 
    [0, 1, 0, 1, 0], 
    [1, 1, 1, 1, 1], 
    [0, 1, 1, 1, 1]
  ]);

  return (
    <div className="contributions-card">
      <h3 className="contributions-header">Contributions</h3>
      {/* The wrapper handles the horizontal scrolling logic */}
      <div className="heatmap-scroll-area">
        <div className="heatmap-wrapper">
          {clusters.map((cluster, cIndex) => (
            <div key={cIndex} className="heatmap-cluster">
              {cluster.map((column, colIndex) => (
                <div key={colIndex} className="vertical-stack">
                  {column.map((active, dayIndex) => (
                    <div 
                      key={dayIndex} 
                      className={`contribution-point ${active ? 'active' : 'inactive'}`} 
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContributionSummary;