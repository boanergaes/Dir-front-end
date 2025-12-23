import React from 'react';
import './RecentRepositories.css';

const RecentRepositories = () => {
  const repos = [
    { name: "Repo one", description: "Description ..." },
    { name: "Repo Two", description: "Description ..." },
  ];

  return (
    <div className="quick-access-card">
      <h3 className="quick-access-title">Quick Access</h3>
      
      <div className="repo-stack">
        {repos.map((repo, index) => (
          <div key={index} className="repo-row">
            <div className="repo-details">
              <p className="repo-name">{repo.name}</p>
              <p className="repo-desc">{repo.description}</p>
            </div>
            {/* External link icon matching your design */}
            <div className="link-icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </div>
          </div>
        ))}
      </div>

      <button className="create-repo-btn">
        Create New Repository
      </button>
    </div>
  );
};

export default RecentRepositories;