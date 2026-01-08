import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Plus, Menu } from 'lucide-react';

import NotificationPanel from './components/NotificationPanel';
import CreateRepoModal from './components/CreateRepoModal';
import SidebarMenu from './components/SidebarMenu';

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isCreateRepoOpen, setIsCreateRepoOpen] = useState(false);
  
  const [userData, setUserData] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [apiNotifications, setApiNotifications] = useState([]);
  
  const [pastNotifications, setPastNotifications] = useState([]);
  const [expandedMessages, setExpandedMessages] = useState({});
  const [isLoadingPast, setIsLoadingPast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const notificationPanelRef = useRef(null);
  const bellBtnRef = useRef(null);

  useEffect(() => {
    fetchUserData();
    fetchUserStats();
    fetchNotifications();
  }, []);
  
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/me', {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.status === 'success') {
        setUserData(data.data);
      }
    } catch (error) {
      console.log('User data fetch failed:', error.message);
    }
  };

  const fetchUserStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stats', {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.status === 'success') {
        setUserStats(data.data);
      }
    } catch (error) {
      console.log('Stats fetch failed:', error.message);
    }
  };

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/notifications', {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.status === 'success' && data.data) {
        const transformed = data.data.map((notif, index) => ({
          id: notif._id || `api-${index}`,
          type: notif.type || 'message',
          label: notif.type === 'github' ? 'GitHub' : 
                 notif.type === 'alert' ? 'Alert' : 'Message',
          time: formatTimeAgo(notif.createdAt),
          read: notif.isRead || false,
          channel: extractChannelFromMessage(notif.message) || '#general',
          userImg: '/assets/images/person.jpg',
          userName: 'User',
          shortMessage: notif.message?.substring(0, 50) + '...' || 'New notification',
          fullMessage: notif.message || 'No details available',
          hasMore: notif.message?.length > 50 || false,
          isApiNotification: true
        }));
        setApiNotifications(transformed);
      }
    } catch (error) {
      console.log('Notifications fetch failed:', error.message);
      setMockNotifications();
    } finally {
      setIsLoading(false);
    }
  };

  const setMockNotifications = () => {
    const mock = [
      {
        id: 1,
        type: 'message',
        label: 'Message',
        time: '2hrs ago',
        channel: '#Front-end team',
        userImg: '/assets/images/person.jpg',
        userName: 'Efrata',
        shortMessage: 'Efrata: Have you finished designing...',
        fullMessage: 'Efrata: Have you finished designing the header component...',
        hasMore: true,
        read: false,
        isApiNotification: false
      },
      {
        id: 2,
        type: 'github',
        label: 'GitHub',
        time: '2hrs ago',
        repo: 'My-repository',
        user: 'Abrsh123',
        shortPR: 'I implemented the file browsing features...',
        fullPR: 'I implemented the file browsing features with drag-and-drop...',
        hasMore: true,
        read: false,
        isApiNotification: false
      },
      {
        id: 3,
        type: 'alert',
        label: 'Alert',
        time: '2hrs ago',
        repo: 'My-repository',
        shortAlert: 'Someone logged in with your GitHub account...',
        fullAlert: 'Someone logged in with your GitHub account from a new device...',
        hasMore: true,
        read: false,
        isApiNotification: false
      }
    ];
    setApiNotifications(mock);
  };

  const extractChannelFromMessage = (message) => {
    if (!message) return '#general';
    if (message.includes('channel')) {
      const match = message.match(/channel\s+([^\s]+)/i);
      return match ? `#${match[1]}` : '#general';
    }
    return '#general';
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}hrs ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      const data = await response.json();
      if (data.status === 'success') {
        window.location.href = '/';
      }
    } catch (error) {
      console.log('Logout failed:', error.message);
      window.location.href = '/';
    }
  };

  const handleMarkAllAsRead = async () => {
    const updatedNotifications = [...notifications];
    const apiNotifs = updatedNotifications.filter(n => n.isApiNotification);
    const mockNotifs = updatedNotifications.filter(n => !n.isApiNotification);
    
    const updatedMock = mockNotifs.map(notification => ({
      ...notification,
      read: true
    }));
    
    setNotifications([...apiNotifs, ...updatedMock]);
    
    if (apiNotifs.length > 0) {
      try {
        await Promise.all(apiNotifs.map(async (notif) => {
          if (!notif.read) {
            await fetch(`http://localhost:5000/api/notifications/${notif.id}/read`, {
              method: 'PATCH',
              credentials: 'include'
            });
          }
        }));
      } catch (error) {
        console.log('Mark as read failed:', error.message);
      }
    }
  };

  const handleCloseNotification = async (id) => {
    const notificationToRemove = notifications.find(n => n.id === id);
    
    if (notificationToRemove?.isApiNotification) {
      try {
        await fetch(`http://localhost:5000/api/notifications/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
      } catch (error) {
        console.log('Delete notification failed:', error.message);
      }
    }
    
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleActionButton = async (action, notificationId) => {
    const notification = notifications.find(n => n.id === notificationId);
    
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
        
        if (notification?.isApiNotification) {
          try {
            await fetch(`http://localhost:5000/api/notifications/${notificationId}/read`, {
              method: 'PATCH',
              credentials: 'include'
            });
          } catch (error) {
            console.log('Mark as read API failed:', error.message);
          }
        }
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

  const toggleNotificationPanel = (e) => {
    if (e) e.stopPropagation();
    setIsNotificationOpen(!isNotificationOpen);
    if (!isNotificationOpen) {
      setNotifications([...apiNotifications]);
    }
  };

  const closeNotificationPanel = () => {
    setIsNotificationOpen(false);
  };

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
      if (event.key === 'Escape') {
        if (isNotificationOpen) {
          closeNotificationPanel();
        }
        if (isCreateRepoOpen) {
          handleCloseCreateRepo();
        }
      }
    };

    if (isNotificationOpen || isCreateRepoOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isNotificationOpen, isCreateRepoOpen]);

  const handleNewRepoClick = () => {
    setIsCreateRepoOpen(true);
  };

  const handleCloseCreateRepo = () => {
    setIsCreateRepoOpen(false);
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
          shortMessage: 'Sarah: Can you review the new UI mockups...',
          fullMessage: 'Sarah: Can you review the new UI mockups for the dashboard...',
          hasMore: true,
          past: true,
          isApiNotification: false
        }
      ];
      
      setPastNotifications(prev => [...newPastNotifications, ...prev]);
      setIsLoadingPast(false);
    }, 1200);
  };

  const toggleMessageExpansion = (notificationId) => {
    setExpandedMessages(prev => ({
      ...prev,
      [notificationId]: !prev[notificationId]
    }));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const displayCount = userStats?.unreadNotifications || unreadCount || 0;

  return (
    <>
      <nav 
        className="p-4 fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: 'var(--dark-bg)',
          borderBottom: '1px solid var(--main-border-color)'
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="cursor-pointer" onClick={() => navigate('/')}>
              <img 
                src="/assets/images/Dir logo.png" 
                alt="logo" 
                className="h-10 w-auto"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={handleNewRepoClick}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all hover:-translate-y-0.5"
              style={{
                backgroundColor: 'var(--primary-button)',
                color: 'var(--primary-text-color)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-button-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-button)'}
            >
              <Plus size={16} />
              <span>New Repository</span>
            </button>

            <div className="relative">
              <button
                ref={bellBtnRef}
                onClick={toggleNotificationPanel}
                className="p-2 rounded-md transition-colors relative"
                style={{ color: 'var(--secondary-text-color)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--secondary-button-hover)';
                  e.currentTarget.style.color = 'var(--primary-text-color)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--secondary-text-color)';
                }}
              >
                <Bell size={24} />
                {displayCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    style={{ backgroundColor: 'var(--notification-count-bg)' }}
                  >
                    {displayCount}
                  </span>
                )}
              </button>

              {isNotificationOpen && (
                <div ref={notificationPanelRef}>
                  <NotificationPanel
                    notifications={notifications}
                    pastNotifications={pastNotifications}
                    expandedMessages={expandedMessages}
                    isLoadingPast={isLoadingPast}
                    onClose={closeNotificationPanel}
                    onMarkAllAsRead={handleMarkAllAsRead}
                    onCloseNotification={handleCloseNotification}
                    onActionButton={handleActionButton}
                    onToggleMessageExpansion={toggleMessageExpansion}
                    onLoadPastNotifications={handleLoadPastNotifications}
                  />
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-md transition-colors"
              style={{ color: 'var(--secondary-text-color)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--secondary-button-hover)';
                e.currentTarget.style.color = 'var(--primary-text-color)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--secondary-text-color)';
              }}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <SidebarMenu
        isMenuOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        userData={userData}
        onLogout={handleLogout}
      />

      {isCreateRepoOpen && (
        <CreateRepoModal
          onClose={handleCloseCreateRepo}
        />
      )}

      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div className="pt-8"></div>
    </>
  );
}

export default Header;