// pages/createRepository/createRepository.jsx - KEEP THIS EXACTLY AS YOU HAVE IT
import React, { useState } from 'react';
import './createRepository.css';

const CreateRepository = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [selectedRole, setSelectedRole] = useState('contributor');
  const [workspaceName, setWorkspaceName] = useState('');
  const [description, setDescription] = useState('');
  const [repoName, setRepoName] = useState('');

  const handleOpenModal = () => {
    console.log("Opening invite modal");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
    setSearchInput('');
  };

  const handleSendInvite = () => {
    if (!searchInput.trim()) {
      alert("Please enter a collaborator username");
      return;
    }
    
    console.log(`Sending invite to: ${searchInput} as ${selectedRole}`);
    alert(`Invitation sent to ${searchInput} as ${selectedRole}`);
    handleCloseModal();
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
    
    // Reset form
    setWorkspaceName('');
    setDescription('');
    setRepoName('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchInput.trim() && isModalOpen) {
      handleSendInvite();
    }
  };

  return (
    <div className="container">
      <div className="workspaceCreation">
        <h1>Create New Workspace</h1>
        <hr className="divider" />
        
        <form onSubmit={handleCreateWorkspace}>
          <div className="workspace">
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
          
          <div className="workspace">
            <label htmlFor="descriptionWorkspace">Description</label>
            <textarea 
              id="descriptionWorkspace"
              placeholder="This workspace is ..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            />
          </div>
          
          <div className="workspace">
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
          
          <div className="newRepoButtons">
            <button 
              type="button" 
              className="repoButton" 
              onClick={handleOpenModal}
            >
              Invite Collaborators
            </button>
            <button type="button" className="repoButton">
              <span className="plus-icon">+</span>Add Channel
            </button>
          </div>
          
          <div className="create">
            <button type="submit" className="createWorkspace">
              Create Workspace
            </button>
          </div>
        </form>
      </div>

      {/* Invite Collaborators Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
                  onClick={handleCloseModal}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRepository;