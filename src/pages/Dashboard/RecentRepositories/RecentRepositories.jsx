import React from 'react';
import { ExternalLink, Plus } from 'lucide-react';

const RecentRepositories = ({ repositories = [] }) => {
  const listToRender = repositories.map(repo => ({
    name: repo.workspaceName, 
    description: repo.githubRepoName,
    id: repo._id
  }));

  return (
    <div className="flex flex-col w-full h-full p-6 bg-[#1D1D29] border border-gray-800 rounded-xl box-border">
      <h3 className="text-2xl font-semibold text-white mb-6">
        Quick Access
      </h3>
      
      <div className="flex flex-col gap-5 mb-[30px]">
        {listToRender.map((repo, index) => (
          <div key={repo.id || index} className="flex justify-between items-center">
            <div className="repo-details">
              <p className="text-base font-semibold text-white">{repo.name}</p>
              <p className="text-[0.85rem] text-gray-400 mt-0.5">{repo.description}</p>
            </div>
            
            <div className="text-gray-400 opacity-70 cursor-pointer transition-opacity duration-200 hover:opacity-100">
              <ExternalLink size={20} strokeWidth={2} />
            </div>
          </div>
        ))}
      </div>

      <button className="mt-auto w-full flex items-center justify-center p-3 bg-[#242429] hover:bg-[#2a2a32] text-white rounded-lg font-medium transition-colors duration-200 border-none">
        <Plus size={18} className="mr-2" />
        Create New Repository
      </button>
    </div>
  );
};

export default RecentRepositories;