import { useState } from 'react';
import { WorkspacesContext } from './WorkspacesContext';

export default function WorkspacesProvider({ children }) {
  const [workspaces, setWorkspaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWorkspace = (workspaceId) => {
    return workspaces.find(ws => ws._id === workspaceId);
  };

  const createWorkspace = async (workspaceData) => {
    try {
      // TODO: Replace with real API call when integrating backend
      // const response = await axios.post('/api/repos', { ...workspaceData, isWorkspace: true });
      // setWorkspaces(prev => [...prev, response.data.data]);
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 500));
      const newWorkspace = {
        _id: `workspace_${Date.now()}`,
        ...workspaceData,
        isWorkspace: true,
        channels: [{ channel_id: `ch_${Date.now()}`, name: "general", _id: `ch_${Date.now()}`, created_at: new Date().toISOString(), participants: [] }],
        members: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setWorkspaces(prev => [...prev, newWorkspace]);
      return newWorkspace;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    workspaces,
    setWorkspaces,
    getWorkspace,
    createWorkspace,
    isLoading,
    error
  };

  return (
    <WorkspacesContext.Provider value={value}>
      {children}
    </WorkspacesContext.Provider>
  );
}
