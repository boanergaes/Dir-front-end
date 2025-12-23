import React from 'react';
import './ActivityFeed.css';

const ActivityFeed = () => {
  const activities = [
    { type: 'commit', user: 'Jane Doe', action: 'committed to/webapp:', message: '"fix: update button styles"' },
    { type: 'branch', user: 'Jane Doe', action: 'created new branch', message: '"temp"' },
    { type: 'comment', user: 'Jane Doe', action: 'commented on webapp:', message: '"fix: update button styles"' },
    { type: 'commit', user: 'Jane Doe', action: 'committed to/webapp:', message: '"fix: update button styles"' },
  ];

  const renderIcon = (type) => {
    // Colors moved here to keep data clean
    const colors = { commit: '#10b981', branch: '#3b82f6', comment: '#f59e0b' };
    const color = colors[type];

    switch (type) {
      case 'commit':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="2">
            <circle cx="8" cy="8" r="3" />
            <line x1="0" y1="8" x2="5" y2="8" />
            <line x1="11" y1="8" x2="16" y2="8" />
          </svg>
        );
      case 'branch':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="2">
             <circle cx="4" cy="12" r="2" />
             <circle cx="12" cy="4" r="2" />
             <path d="M4 10V6a2 2 0 012-2h4" />
          </svg>
        );
      case 'comment':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        );
      default: return null;
    }
  };

  return (
    <div className="activity-card-container">
      <h3 className="card-header-title">Recent Activity</h3>
      <div className="activity-items-wrapper">
        {activities.map((item, index) => (
          <div key={index} className="activity-row">
            <div className="icon-container">{renderIcon(item.type)}</div>
            <p className="activity-description">
              <span className="user-highlight">{item.user}</span> 
              {item.action} 
              <span className="message-text">{item.message}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;