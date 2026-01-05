import React, { useState } from 'react';

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
    <div className="min-h-screen flex justify-center items-center p-4 sm:p-6 bg-[var(--dark-bg)]">
      <div className="w-full max-w-2xl">
        {/* Workspace Creation Card */}
        <div 
          className="bg-[var(--dark-bg)] rounded-xl p-6 sm:p-8 shadow-lg border border-[var(--main-border-color)]"
          style={{ backgroundColor: 'var(--dark-bg)', borderColor: 'var(--main-border-color)' }}
        >
          <h1 className="text-xl sm:text-2xl font-semibold text-center text-[var(--primary-text-color)] mb-2">
            Create New Workspace
          </h1>
          
          <hr 
            className="w-4/5 mx-auto mb-6 border-[var(--main-border-color)]" 
            style={{ borderColor: 'var(--main-border-color)' }}
          />
          
          <form onSubmit={handleCreateWorkspace} className="space-y-6">
            {/* Workspace Name */}
            <div className="space-y-2">
              <label 
                htmlFor="workspaceName" 
                className="block text-sm font-medium text-[var(--primary-text-color)]"
              >
                Workspace name
              </label>
              <input
                type="text"
                id="workspaceName"
                placeholder="My workspace.."
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--main-border-color)] bg-[#303036] text-[var(--primary-text-color)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--active-text-color)] focus:border-transparent transition-colors"
                style={{
                  backgroundColor: '#303036',
                  borderColor: 'var(--main-border-color)',
                  color: 'var(--primary-text-color)'
                }}
              />
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <label 
                htmlFor="descriptionWorkspace" 
                className="block text-sm font-medium text-[var(--primary-text-color)]"
              >
                Description
              </label>
              <textarea
                id="descriptionWorkspace"
                placeholder="This workspace is ..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-[var(--main-border-color)] bg-[#303036] text-[var(--primary-text-color)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--active-text-color)] focus:border-transparent transition-colors resize-none"
                style={{
                  backgroundColor: '#303036',
                  borderColor: 'var(--main-border-color)',
                  color: 'var(--primary-text-color)'
                }}
              />
            </div>
            
            {/* Working Repository */}
            <div className="space-y-2">
              <label 
                htmlFor="workingRepository" 
                className="block text-sm font-medium text-[var(--primary-text-color)]"
              >
                Working Repository
              </label>
              <input
                type="text"
                id="workingRepository"
                placeholder="Repo name..."
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--main-border-color)] bg-[#303036] text-[var(--primary-text-color)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--active-text-color)] focus:border-transparent transition-colors"
                style={{
                  backgroundColor: '#303036',
                  borderColor: 'var(--main-border-color)',
                  color: 'var(--primary-text-color)'
                }}
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleOpenModal}
                className="flex-1 py-3 px-4 rounded-lg bg-[var(--secondary-button)] text-[var(--primary-text-color)] font-medium hover:bg-[var(--secondary-button-hover)] transition-colors duration-200 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: 'var(--secondary-button)',
                  color: 'var(--primary-text-color)'
                }}
              >
                <span>Invite Collaborators</span>
              </button>
              
              <button
                type="button"
                className="flex-1 py-3 px-4 rounded-lg bg-[var(--secondary-button)] text-[var(--primary-text-color)] font-medium hover:bg-[var(--secondary-button-hover)] transition-colors duration-200 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: 'var(--secondary-button)',
                  color: 'var(--primary-text-color)'
                }}
              >
                <span className="text-lg font-bold">+</span>
                <span>Add Channel</span>
              </button>
            </div>
            
            {/* Create Workspace Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg bg-[var(--primary-button)] text-[var(--primary-text-color)] font-semibold hover:bg-[var(--primary-button-hover)] transition-colors duration-200 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  backgroundColor: 'var(--primary-button)',
                  color: 'var(--primary-text-color)'
                }}
              >
                Create Workspace
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Invite Collaborators Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          onClick={handleCloseModal}
        >
          <div 
            className="w-full max-w-md mx-4 sm:mx-0 rounded-xl overflow-hidden"
            style={{
              backgroundColor: 'var(--dark-bg)',
              border: '1px solid var(--main-border-color)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div 
              className="p-6 border-b text-center"
              style={{ borderColor: 'var(--main-border-color)' }}
            >
              <h2 className="text-xl font-semibold text-[var(--primary-text-color)] mb-2">
                Invite Collaborators
              </h2>
              <p className="text-sm text-[var(--secondary-text-color)]">
                Search by Username, Full name or Email
              </p>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Search Input */}
              <div className="space-y-2">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Collaborator username"
                  autoFocus
                  className="w-full px-4 py-3 rounded-lg border border-[var(--main-border-color)] bg-[#303036] text-[var(--primary-text-color)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--active-text-color)] focus:border-transparent transition-colors"
                  style={{
                    backgroundColor: '#303036',
                    borderColor: 'var(--main-border-color)',
                    color: 'var(--primary-text-color)'
                  }}
                />
              </div>
              
              {/* Role Section */}
              <div className="space-y-4">
                <h3 className="text-base font-medium text-[var(--primary-text-color)]">
                  Role
                </h3>
                
                <hr 
                  className="border-[var(--main-border-color)]" 
                  style={{ borderColor: 'var(--main-border-color)' }}
                />
                
                <div className="space-y-3">
                  {['owner', 'admin', 'contributor'].map((role) => (
                    <label
                      key={role}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                        selectedRole === role 
                          ? 'bg-[#3a3a40]' 
                          : 'bg-[#303036] hover:bg-[#3a3a40]'
                      }`}
                      style={{ backgroundColor: selectedRole === role ? '#3a3a40' : '#303036' }}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        checked={selectedRole === role}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-4 h-4 accent-[var(--active-text-color)]"
                        style={{ accentColor: 'var(--active-text-color)' }}
                      />
                      <span className="text-sm font-medium text-[var(--primary-text-color)] capitalize">
                        {role}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleSendInvite}
                  type="button"
                  className="w-full py-3 rounded-lg bg-[var(--primary-button)] text-[var(--primary-text-color)] font-semibold hover:bg-[var(--primary-button-hover)] transition-colors duration-200 hover:-translate-y-0.5 active:translate-y-0"
                  style={{
                    backgroundColor: 'var(--primary-button)',
                    color: 'var(--primary-text-color)'
                  }}
                >
                  Invite Collaborators
                </button>
                
                <button
                  onClick={handleCloseModal}
                  type="button"
                  className="w-full py-3 rounded-lg bg-[var(--secondary-button)] text-[var(--primary-text-color)] font-medium hover:bg-[var(--secondary-button-hover)] transition-colors duration-200"
                  style={{
                    backgroundColor: 'var(--secondary-button)',
                    color: 'var(--primary-text-color)'
                  }}
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