// services/auth.service/auth.service.js
import API from '../api/api'; 

export const authService = {
  // 1. Get user profile data
  getCurrentUser: () => API.get('/api/me'),

  // 2. Get user stats
  getUserStats: () => API.get('/api/stats'),

  // 3. NEW: Get Workspaces/Repos
  getActiveWorkspaces: () => API.get('/api/repos'),

  // 4. NEW: Get Activity Feed
  getActivityFeed: (page = 1, limit = 10) => 
    API.get(`/api/activity?page=${page}&limit=${limit}`),

  // 5. NEW: Get Heatmap data
  getContributionHeatmap: () => API.get('/api/activity/heatmap'),

  // 6. Logout
  logout: () => API.post('/auth/logout')
};