import React from 'react';

const ContributionSummary = ({ data = [] }) => {
  // UI DEFAULT: Your 12 clusters of vertical points
  const defaultClusters = Array(12).fill([
    [1, 0, 1, 0, 1], 
    [0, 1, 0, 1, 0], 
    [1, 1, 1, 1, 1], 
    [0, 1, 1, 1, 1]
  ]);

  /**
   * LOGIC: If backend data exists, we determine if a cell is "active" 
   * based on the activity count for that date.
   * Note: This keeps your cluster UI structure while using real data.
   */
  const clustersToRender = data.length > 0 
    ? defaultClusters.map((cluster, cIdx) => 
        cluster.map((column, colIdx) => 
          column.map((_, dayIdx) => {
            // Simplified logic: distribute backend activity across the grid
            const dataIndex = (cIdx * 20) + (colIdx * 5) + dayIdx;
            return data[dataIndex]?.count > 0 ? 1 : 0;
          })
        )
      )
    : defaultClusters;

  return (
    <div className="w-full p-6 bg-[#1D1D29] border border-gray-800 rounded-xl box-border">
      <h3 className="text-xl font-semibold text-white mb-5">Contributions</h3>
      
      {/* Scroll Area with your custom scrollbar styling */}
      <div className="w-full overflow-x-auto pb-2 
                      scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent
                      [&::-webkit-scrollbar]:h-1.5
                      [&::-webkit-scrollbar-thumb]:bg-gray-700
                      [&::-webkit-scrollbar-thumb]:rounded-full">
        
        <div className="flex justify-start gap-4 min-w-max">
          {clustersToRender.map((cluster, cIndex) => (
            <div key={cIndex} className="flex gap-1">
              {cluster.map((column, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-1">
                  {column.map((active, dayIndex) => (
                    <div 
                      key={dayIndex} 
                      className={`w-4 h-4 rounded-[3px] shrink-0 transition-colors duration-500 ${
                        active ? 'bg-[#2ecc71]' : 'bg-[#2d2d3a]'
                      }`} 
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