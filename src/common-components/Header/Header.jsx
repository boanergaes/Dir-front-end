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
  const [repoName, setRepoName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('private');
  const [readme, setReadme] = useState('no');
  const [gitignore, setGitignore] = useState('no');
  
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
    setRepoName('');
    setDescription('');
    setVisibility('private');
    setReadme('no');
    setGitignore('no');
  };

  const handleCreateRepository = (e) => {
    if (e) e.preventDefault();
    
    if (!repoName.trim()) {
      alert("Please enter a repository name");
      return;
    }
    
    console.log('Creating repository:', {
      name: repoName,
      description,
      visibility,
      readme,
      gitignore
    });
    
    alert(`Repository "${repoName}" created successfully!`);
    
    handleCloseCreateRepo();
  };

  const handleOptionChange = (optionType, value) => {
    switch (optionType) {
      case 'visibility':
        setVisibility(value);
        break;
      case 'readme':
        setReadme(value);
        break;
      case 'gitignore':
        setGitignore(value);
        break;
      default:
    }
  };

  // ===== MENU NAVIGATION =====
  const handleMenuItemClick = (itemName) => {
    const routeMap = {
      'Dashboard': '/',
      'Repositories': '/repositories',
      'Workspaces': '/workspaces'
      // No 'Create Repository' here
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

        {/* Menu Items - NO CREATE REPOSITORY HERE */}
        <div className="menu-item" onClick={() => handleMenuItemClick('Dashboard')}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div>

        <div className="menu-item" onClick={() => navigate('/repositories')}>
          <Folder size={20} />
          <span>Repositories</span>
        </div>

        <div className="menu-item" onClick={() => navigate('/workspaces')}>
          <Briefcase size={20} />
          <span>Workspaces</span>
        </div>

        <div className="menu-item" onClick={() => {
          // Settings - you might need to create this page
          setIsMenuOpen(false);
        }}>
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
          setIsMenuOpen(false);
        }}>
          <LogOut size={20} />
          <span>Log out</span>
        </div>
      </div>

      {/* Create Repository Modal - Only opens from header button */}
      {isCreateRepoOpen && (
        <div className="modal-overlay" onClick={handleCloseCreateRepo}>
          <div 
            className="modal-content create-repo-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Create New Repository</h2>
              <button 
                className="close-modal-btn"
                onClick={handleCloseCreateRepo}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleCreateRepository}>
                <div className="form-group">
                  <label htmlFor="repoName">Repository name</label>
                  <input 
                    type="text" 
                    placeholder="my-repository" 
                    id="repoName"
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input 
                    type="text" 
                    id="description" 
                    placeholder="A brief description of your repository..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                
                {/* All options in one flex container */}
                <div className="options-container">
                  {/* Visibility */}
                  <div className="option-item">
                    <label className="option-question">Visibility</label>
                    <div className="toggle-buttons">
                      <button 
                        type="button"
                        className={`toggle-btn ${visibility === 'public' ? 'active' : ''}`}
                        onClick={() => handleOptionChange('visibility', 'public')}
                      >
                        Public
                      </button>
                      <button 
                        type="button"
                        className={`toggle-btn ${visibility === 'private' ? 'active' : ''}`}
                        onClick={() => handleOptionChange('visibility', 'private')}
                      >
                        Private
                      </button>
                    </div>
                  </div>
                  
                  {/* README */}
                  <div className="option-item">
                    <label className="option-question">Add README</label>
                    <div className="toggle-buttons">
                      <button 
                        type="button"
                        className={`toggle-btn ${readme === 'yes' ? 'active' : ''}`}
                        onClick={() => handleOptionChange('readme', 'yes')}
                      >
                        Yes
                      </button>
                      <button 
                        type="button"
                        className={`toggle-btn ${readme === 'no' ? 'active' : ''}`}
                        onClick={() => handleOptionChange('readme', 'no')}
                      >
                        No
                      </button>
                    </div>
                  </div>
                  
                  {/* .gitignore */}
                  <div className="option-item">
                    <label className="option-question">Add .gitignore</label>
                    <div className="toggle-buttons">
                      <button 
                        type="button"
                        className={`toggle-btn ${gitignore === 'yes' ? 'active' : ''}`}
                        onClick={() => handleOptionChange('gitignore', 'yes')}
                      >
                        Yes
                      </button>
                      <button 
                        type="button"
                        className={`toggle-btn ${gitignore === 'no' ? 'active' : ''}`}
                        onClick={() => handleOptionChange('gitignore', 'no')}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="modal-actions">
                  <div className="action-row">
                    <button type="submit" className="primary-btn">
                      Create Repository
                    </button>
                  </div>
                </div>
              </form>
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