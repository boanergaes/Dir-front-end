import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import {
  Bell,
  MessageSquare,
  Github,
  AlertCircle,
  Plus,
  Menu,
  X,
  ExternalLink,
  GitBranchPlus,
  CheckCheck,
  LogOut,
  LayoutDashboard,
  Search,
  Folder,
  Briefcase,
  Settings
} from 'lucide-react';

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isCreateRepoOpen, setIsCreateRepoOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [selectedRole, setSelectedRole] = useState('contributor');
  const [workspaceName, setWorkspaceName] = useState('');
  const [description, setDescription] = useState('');
  const [repoName, setRepoName] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'message',
      label: 'Message',
      time: '2hrs ago',
      channel: '#Front-end team',
      userImg: '/assets/images/person.jpg',
      userName: 'Efrata',
      message: 'Have you finished designing the header component for the repository page? We need it by tomorrow...',
      hasMore: true
    },
    {
      id: 2,
      type: 'github',
      label: 'GitHub',
      time: '2hrs ago',
      repo: 'My-repository',
      user: 'Abrsh123',
      prDescription: 'I implemented the file browsing features with drag-and-drop support and improved the UI...',
      hasMore: true
    },
    {
      id: 3,
      type: 'alert',
      label: 'Alert',
      time: '2hrs ago',
      repo: 'My-repository',
      message: 'Someone logged in with your GitHub account from a new device in London, UK. If this wasn\'t you, please secure your account...',
      hasMore: true
    }
  ]);
  
  const [pastNotifications, setPastNotifications] = useState([]);
  const [isLoadingPast, setIsLoadingPast] = useState(false);

  const notificationPanelRef = useRef(null);
  const bellBtnRef = useRef(null);

  // ===== CREATE REPOSITORY MODAL =====
  const handleNewRepoClick = () => {
    setIsCreateRepoOpen(true);
  };

  const handleCloseCreateRepo = () => {
    setIsCreateRepoOpen(false);
    setWorkspaceName('');
    setDescription('');
    setRepoName('');
    setIsInviteModalOpen(false);
  };

  const handleCreateWorkspace = (e) => {
    if (e) e.preventDefault();
    
    if (!workspaceName.trim()) {
      alert("Please enter a workspace name");
      return;
    }
    
    if (!repoName.trim()) {
      alert("Please enter a repository name");
      return;
    }
    
    console.log(`Creating workspace: ${workspaceName} with repo: ${repoName}`);
    alert(`Workspace "${workspaceName}" created successfully!`);
    
    handleCloseCreateRepo();
  };

  const handleOpenInviteModal = (e) => {
    if (e) e.stopPropagation();
    setIsInviteModalOpen(true);
  };

  const handleCloseInviteModal = () => {
    setIsInviteModalOpen(false);
    setSearchInput('');
  };

  const handleSendInvite = () => {
    if (!searchInput.trim()) {
      alert("Please enter a collaborator username");
      return;
    }
    
    console.log(`Sending invite to: ${searchInput} as ${selectedRole}`);
    alert(`Invitation sent to ${searchInput} as ${selectedRole}`);
    handleCloseInviteModal();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchInput.trim() && isInviteModalOpen) {
      handleSendInvite();
    }
  };

  // ===== MENU NAVIGATION =====
  const handleMenuItemClick = (itemName) => {
    const routeMap = {
      'Dashboard': '/dashboard',
      'Explore': '/explore',
      'Repositories': '/repositories',
      'Workspaces': '/workspaces',
      'Settings': '/settings',
      'Create Repository': '/create-repository'
    };
    
    const route = routeMap[itemName];
    if (route) {
      navigate(route);
    }
    
    setIsMenuOpen(false);
  };

  // ===== NOTIFICATION PANEL =====
  const toggleNotificationPanel = (e) => {
    if (e) e.stopPropagation();
    setIsNotificationOpen(!isNotificationOpen);
  };

  const closeNotificationPanel = () => {
    setIsNotificationOpen(false);
  };

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
  };

  const handleCloseNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleLoadPastNotifications = () => {
    setIsLoadingPast(true);
    
    setTimeout(() => {
      const newPastNotifications = [
        {
          id: Date.now() + 1,
          type: 'message',
          label: 'Message',
          time: 'Yesterday',
          channel: '#Design-team',
          userImg: '/assets/images/person.jpg',
          userName: 'Sarah',
          message: 'Can you review the new UI mockups for the dashboard? I\'ve uploaded them to Figma...',
          hasMore: true,
          past: true
        },
        {
          id: Date.now() + 2,
          type: 'github',
          label: 'GitHub',
          time: '1 day ago',
          repo: 'Design-system',
          user: 'DesignLead',
          prDescription: 'Added new color variables and typography scale to the design system...',
          hasMore: true,
          past: true
        }
      ];
      
      setPastNotifications(prev => [...newPastNotifications, ...prev]);
      setIsLoadingPast(false);
    }, 1200);
  };

  const handleActionButton = (action, notificationId) => {
    switch(action.toLowerCase()) {
      case 'reply':
        break;
      case 'mark as read':
        setNotifications(prev => 
          prev.map(notification => 
            notification.id === notificationId 
              ? { ...notification, read: true }
              : notification
          )
        );
        break;
      case 'review':
        break;
      case 'reject':
        handleCloseNotification(notificationId);
        break;
      case 'checkout':
        break;
      case 'ignore':
        handleCloseNotification(notificationId);
        break;
      default:
    }
  };

  // Close notification panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationPanelRef.current && 
        !notificationPanelRef.current.contains(event.target) &&
        bellBtnRef.current && 
        !bellBtnRef.current.contains(event.target)
      ) {
        closeNotificationPanel();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isNotificationOpen) {
        closeNotificationPanel();
      }
    };

    if (isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isNotificationOpen]);

  const renderNotificationItem = (notification, isPast = false) => {
    if (notification.type === 'message') {
      return (
        <div className={`notification-item ${notification.read ? 'read' : ''}`} key={notification.id}>
          <div className="notification-header-row">
            <div className="notification-type">
              <MessageSquare size={16} className="notification-icon" />
              <span className="notification-label">{notification.label}</span>
              <span className="notification-time">{notification.time}</span>
            </div>
            <button 
              className="close-notification-btn"
              onClick={() => handleCloseNotification(notification.id)}
            >
              <X size={12} />
            </button>
          </div>
          <h4 className="notification-channel">{notification.channel}</h4>
          <div className="notification-content">
            <div className="user-avatar">
              <img src={notification.userImg} alt={notification.userName} />
            </div>
            <div className="message-preview">
              <p><strong>{notification.userName}:</strong> {notification.message}</p>
              {notification.hasMore && <button className="view-more-btn">more</button>}
            </div>
          </div>
          <div className="notification-actions-row">
            <button 
              className="action-btn reply-btn"
              onClick={() => handleActionButton('Reply', notification.id)}
            >
              Reply
            </button>
            <button 
              className="action-btn mark-read-btn"
              onClick={() => handleActionButton('Mark as read', notification.id)}
            >
              Mark as read
            </button>
          </div>
        </div>
      );
    } else if (notification.type === 'github') {
      return (
        <div className={`notification-item ${notification.read ? 'read' : ''}`} key={notification.id}>
          <div className="notification-header-row">
            <div className="notification-type">
              <Github size={16} className="notification-icon" />
              <span className="notification-label">{notification.label}</span>
              <ExternalLink size={12} className="external-link" />
              <span className="notification-time">{notification.time}</span>
            </div>
            <button 
              className="close-notification-btn"
              onClick={() => handleCloseNotification(notification.id)}
            >
              <X size={12} />
            </button>
          </div>
          <h4 className="notification-repo">{notification.repo}</h4>
          <div className="notification-content">
            <div className="github-icon">
              <GitBranchPlus size={32} />
            </div>
            <div className="pr-details">
              <p><strong>{notification.user}</strong> created a pull request</p>
              <p className="pr-description">{notification.prDescription}</p>
              {notification.hasMore && <button className="view-more-btn">more</button>}
            </div>
          </div>
          <div className="notification-actions-row">
            <button 
              className="action-btn review-btn"
              onClick={() => handleActionButton('Review', notification.id)}
            >
              Review
            </button>
            <button 
              className="action-btn reject-btn"
              onClick={() => handleActionButton('Reject', notification.id)}
            >
              Reject
            </button>
          </div>
        </div>
      );
    } else if (notification.type === 'alert') {
      return (
        <div className={`notification-item ${notification.read ? 'read' : ''}`} key={notification.id}>
          <div className="notification-header-row">
            <div className="notification-type">
              <span className="notification-label">{notification.label}</span>
              <AlertCircle size={16} className="notification-icon" />
              <span className="notification-time">{notification.time}</span>
            </div>
            <button 
              className="close-notification-btn"
              onClick={() => handleCloseNotification(notification.id)}
            >
              <X size={12} />
            </button>
          </div>
          <div className="alert-repo">
            <Github size={16} />
            <h4>{notification.repo}</h4>
            <ExternalLink size={12} className="external-link" />
          </div>
          <div className="notification-content">
            <div className="alert-message">
              <p>{notification.message}</p>
              {notification.hasMore && <button className="view-more-btn">more</button>}
            </div>
          </div>
          <div className="notification-actions-row">
            <button 
              className="action-btn checkout-btn"
              onClick={() => handleActionButton('Checkout', notification.id)}
            >
              Checkout
            </button>
            <button 
              className="action-btn ignore-btn"
              onClick={() => handleActionButton('Ignore', notification.id)}
            >
              Ignore
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className="nav">
        <div className="nav-container">
          {/* Left: Logo */}
          <div className="left-section">
            <div className="logo-div" onClick={() => navigate('/')}>
              <img 
                src="/assets/images/Dir logo.png" 
                alt="logo" 
              />
            </div>
          </div>

          {/* Right: Button + Bell + Hamburger */}
          <div className="right-section">
            {/* New Repository Button - Opens Create Repository Modal */}
            <button
              onClick={handleNewRepoClick}
              className="new-repo-btn"
            >
              <Plus size={16} />
              <span>New Repository</span>
            </button>

            {/* Bell Icon with Notification Panel */}
            <div className="bell-container">
              <button
                ref={bellBtnRef}
                onClick={toggleNotificationPanel}
                className="bell-btn"
              >
                <Bell size={24} />
                {notifications.length > 0 && (
                  <span className="notification-badge">{notifications.length}</span>
                )}
              </button>

              {/* Notification Panel */}
              <div 
                ref={notificationPanelRef}
                className={`notification-panel ${isNotificationOpen ? 'active' : ''}`}
              >
                <div className="notification-header">
                  <div className="notification-title">
                    <Bell size={20} />
                    <h3>Notifications ({notifications.length})</h3>
                  </div>
                  <div className="notification-actions">
                    <button 
                      className="mark-all-btn"
                      onClick={handleMarkAllAsRead}
                    >
                      <span>Mark all as read</span>
                      <CheckCheck size={12} />
                    </button>
                    <button 
                      className="close-panel-btn"
                      onClick={closeNotificationPanel}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                <div className="notifications-list">
                  {notifications.map(notification => renderNotificationItem(notification))}
                  {pastNotifications.map(notification => renderNotificationItem(notification, true))}
                </div>

                <div className="notification-footer">
                  <button 
                    className="load-past-btn"
                    onClick={handleLoadPastNotifications}
                    disabled={isLoadingPast}
                  >
                    {isLoadingPast ? 'Loading...' : 'Load past notifications'}
                  </button>
                </div>
              </div>
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="hamburger"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Menu */}
      <div className={`sidebar-menu ${isMenuOpen ? 'open' : ''}`}>
        <button
          onClick={() => setIsMenuOpen(false)}
          className="close-btn"
        >
          <X size={20} />
        </button>

        {/* User Profile */}
        <div className="user-profile">
          <img src="/assets/images/person.jpg" alt="person" className="profile-pic" />
          <div className="user-info">
            <p className="user-name">Efrata</p>
            <p className="user-handle">@zeamanuel</p>
          </div>
        </div>

        <hr className="menu-divider" />

        {/* Menu Items */}
        <div className="menu-item" onClick={() => handleMenuItemClick('Dashboard')}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div>

        <div className="menu-item" onClick={() => handleMenuItemClick('Explore')}>
          <Search size={20} />
          <span>Explore</span>
        </div>

        <div className="menu-item" onClick={() => handleMenuItemClick('Repositories')}>
          <Folder size={20} />
          <span>Repositories</span>
        </div>

        <div className="menu-item" onClick={() => handleMenuItemClick('Workspaces')}>
          <Briefcase size={20} />
          <span>Workspaces</span>
        </div>

        <div className="menu-item" onClick={() => handleMenuItemClick('Create Repository')}>
          <Plus size={20} />
          <span>Create Repository</span>
        </div>

        <div className="menu-item" onClick={() => handleMenuItemClick('Settings')}>
          <Settings size={20} />
          <span>Settings</span>
        </div>

        <hr className="menu-divider" />

        {/* Logout */}
        <div className="menu-item logout-item" onClick={() => {
          const confirmLogout = window.confirm('Are you sure you want to log out?');
          if (confirmLogout) {
            // Handle logout logic here
          }
        }}>
          <LogOut size={20} />
          <span>Log out</span>
        </div>
      </div>

      {/* Create Repository Modal */}
      {isCreateRepoOpen && (
        <div className="modal-overlay" onClick={handleCloseCreateRepo}>
          <div 
            className="modal-content create-repo-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Create New Workspace</h2>
              <button 
                className="close-modal-btn"
                onClick={handleCloseCreateRepo}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleCreateWorkspace}>
                <div className="form-group">
                  <label htmlFor="workspaceName">Workspace name</label>
                  <input 
                    type="text" 
                    placeholder="My workspace.." 
                    id="workspaceName"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="descriptionWorkspace">Description</label>
                  <textarea 
                    id="descriptionWorkspace"
                    placeholder="This workspace is ..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="workingRepository">Working Repository</label>
                  <input 
                    type="text" 
                    id="workingRepository" 
                    placeholder="Repo name..."
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="modal-actions">
                  <div className="action-row">
                    <button 
                      type="button" 
                      className="secondary-btn"
                      onClick={handleOpenInviteModal}
                    >
                      Invite Collaborators
                    </button>
                    <button type="button" className="secondary-btn">
                      <Plus size={16} /> Add Channel
                    </button>
                  </div>
                  <div className="action-row">
                    <button type="submit" className="primary-btn">
                      Create Workspace
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Invite Collaborators Modal */}
      {isInviteModalOpen && (
        <div className="modal-overlay invite-modal-overlay" onClick={handleCloseInviteModal}>
          <div 
            className="modal-content invite-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Invite Collaborators</h2>
              <p>Search by Username, Full name or Email</p>
            </div>
            
            <div className="modal-body">
              <div className="input-group">
                <div className="search-input">
                  <input 
                    type="text" 
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Collaborator username"
                    className="search-field"
                    autoFocus
                  />
                </div>
              </div>
              
              <div className="role-section">
                <h3>Role</h3>
                <hr className="modal-divider" />
                <div className="role-options">
                  <label className="role-option">
                    <input 
                      type="radio" 
                      name="role" 
                      value="owner" 
                      checked={selectedRole === 'owner'}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    />
                    <span>Owner</span>
                  </label>
                  <label className="role-option">
                    <input 
                      type="radio" 
                      name="role" 
                      value="admin" 
                      checked={selectedRole === 'admin'}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    />
                    <span>Admin</span>
                  </label>
                  <label className="role-option">
                    <input 
                      type="radio" 
                      name="role" 
                      value="contributor" 
                      checked={selectedRole === 'contributor'}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    />
                    <span>Contributor</span>
                  </label>
                </div>
              </div>

              <div className="invite-buttons">
                <button 
                  className="invite-action-btn" 
                  onClick={handleSendInvite}
                  type="button"
                >
                  Invite Collaborators
                </button>
                <button 
                  className="cancel-action-btn" 
                  onClick={handleCloseInviteModal}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Overlay */}
      <div 
        className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />
    </>
  );
}

export default Header;