import React from 'react';
import { GitCommitHorizontal, GitBranch, MessageSquare } from 'lucide-react';

const ActivityFeed = () => {
  const activities = [
    { type: 'commit', user: 'Jane Doe', action: 'committed to/webapp:', message: '"fix: update button styles"' },
    { type: 'branch', user: 'Jane Doe', action: 'created new branch', message: '"temp"' },
    { type: 'comment', user: 'Jane Doe', action: 'commented on webapp:', message: '"fix: update button styles"' },
    { type: 'commit', user: 'Jane Doe', action: 'committed to/webapp:', message: '"fix: update button styles"' },
  ];

  // Mapping activities to Lucide components and Tailwind text colors
  const iconConfig = {
    commit: { Icon: GitCommitHorizontal, colorClass: 'text-emerald-500' },
    branch: { Icon: GitBranch, colorClass: 'text-blue-500' },
    comment: { Icon: MessageSquare, colorClass: 'text-amber-500' },
  };

  return (
    <div className="w-full h-full p-6 bg-[#1D1D29] border border-gray-800 rounded-xl box-border">
      <h3 className="text-xl font-semibold text-white mb-5">
        Recent Activity
      </h3>
      
      <div className="flex flex-col gap-4">
        {activities.map((item, index) => {
          const { Icon, colorClass } = iconConfig[item.type];
          
          return (
            <div key={index} className="flex items-center gap-3">
              <div className="flex items-center justify-center w-5">
                <Icon size={16} className={colorClass} strokeWidth={2} />
              </div>
              
              <p className="text-[0.9rem] text-gray-400">
                <span className="font-semibold text-white">
                  {item.user}
                </span> 
                {' '}{item.action}{' '} 
                <span className="italic opacity-80 ml-1">
                  {item.message}
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed;