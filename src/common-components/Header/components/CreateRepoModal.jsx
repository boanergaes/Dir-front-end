import React, { useState } from 'react';
import { X } from 'lucide-react';

function CreateRepoModal({ onClose }) {
  const [repoName, setRepoName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('private');
  const [readme, setReadme] = useState('no');
  const [gitignore, setGitignore] = useState('no');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateRepository = async (e) => {
    if (e) e.preventDefault();
    
    if (!repoName.trim()) {
      setError("Please enter a repository name");
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const requestData = {
        name: repoName,
        description: description,
        isPrivate: visibility === 'private' ? 'private' : 'public',
        auto_init: readme === 'yes' ? 'Yes' : 'No',
        gitignore_template: gitignore === 'yes' ? 'Node' : null
      };
      
      const response = await fetch('http://localhost:5000/api/repos/create-remote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestData)
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        alert(`Repository "${repoName}" created successfully!`);
        handleClose();
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        setError(data.message || 'Failed to create repository');
      }
    } catch (error) {
      console.error('Error creating repository:', error);
      setError('Error creating repository. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setRepoName('');
    setDescription('');
    setVisibility('private');
    setReadme('no');
    setGitignore('no');
    setError('');
    setIsLoading(false);
    onClose();
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

  return (
    <div 
      className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      onClick={handleClose}
    >
      <div 
        className="rounded-xl w-full max-w-md overflow-hidden"
        style={{
          backgroundColor: 'var(--dark-bg)',
          border: '1px solid var(--main-border-color)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="p-6 border-b flex justify-between items-center"
          style={{ borderColor: 'var(--main-border-color)' }}
        >
          <div className="w-6"></div>
          
          <h2 className="text-lg font-semibold flex-1 text-center" style={{ color: 'var(--primary-text-color)' }}>
            Create New Repository
          </h2>
          
          <button 
            className="p-1 rounded w-6 flex items-center justify-center"
            style={{ color: 'var(--secondary-text-color)' }}
            onClick={handleClose}
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-md text-sm" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleCreateRepository}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--primary-text-color)' }}>
                Repository name
              </label>
              <input 
                type="text" 
                placeholder="My repository..." 
                value={repoName}
                onChange={(e) => {
                  setRepoName(e.target.value);
                  setError('');
                }}
                required
                disabled={isLoading}
                className="w-full px-3 py-2 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--active-text-color)] focus:border-transparent disabled:opacity-50"
                style={{
                  backgroundColor: '#303036',
                  border: '1px solid var(--main-border-color)'
                }}
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--primary-text-color)' }}>
                Description
              </label>
              <input 
                type="text" 
                placeholder="The repo is..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--active-text-color)] focus:border-transparent disabled:opacity-50"
                style={{
                  backgroundColor: '#303036',
                  border: '1px solid var(--main-border-color)'
                }}
              />
            </div>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium" style={{ color: 'var(--primary-text-color)' }}>
                  Choose Visibility
                </label>
                <div className="flex gap-1">
                  <button 
                    type="button"
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-20 mr-8 ${visibility === 'public' ? 'text-white' : 'text-gray-400 hover:text-white'} disabled:opacity-50 disabled:cursor-not-allowed`}
                    style={{
                      backgroundColor: visibility === 'public' ? '#1D1D29' : 'var(--secondary-button)',
                    }}
                    onClick={() => handleOptionChange('visibility', 'public')}
                  >
                    Public
                  </button>
                  <button 
                    type="button"
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-20 mr-8 ${visibility === 'private' ? 'text-white' : 'text-gray-400 hover:text-white'} disabled:opacity-50 disabled:cursor-not-allowed`}
                    style={{
                      backgroundColor: visibility === 'private' ? '#1D1D29' : 'var(--secondary-button)',
                    }}
                    onClick={() => handleOptionChange('visibility', 'private')}
                  >
                    Private
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium" style={{ color: 'var(--primary-text-color)' }}>
                  Add README
                </label>
                <div className="flex gap-1">
                  <button 
                    type="button"
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-20 mr-8 ${readme === 'yes' ? 'text-white' : 'text-gray-400 hover:text-white'} disabled:opacity-50 disabled:cursor-not-allowed`}
                    style={{
                      backgroundColor: readme === 'yes' ? '#1D1D29' : 'var(--secondary-button)',
                    }}
                    onClick={() => handleOptionChange('readme', 'yes')}
                  >
                    Yes
                  </button>
                  <button 
                    type="button"
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-20 mr-8 ${readme === 'no' ? 'text-white' : 'text-gray-400 hover:text-white'} disabled:opacity-50 disabled:cursor-not-allowed`}
                    style={{
                      backgroundColor: readme === 'no' ? '#1D1D29' : 'var(--secondary-button)',
                    }}
                    onClick={() => handleOptionChange('readme', 'no')}
                  >
                    No
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium" style={{ color: 'var(--primary-text-color)' }}>
                  Add .gitignore
                </label>
                <div className="flex gap-1">
                  <button 
                    type="button"
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-20 mr-8 ${gitignore === 'yes' ? 'text-white' : 'text-gray-400 hover:text-white'} disabled:opacity-50 disabled:cursor-not-allowed`}
                    style={{
                      backgroundColor: gitignore === 'yes' ? '#1D1D29' : 'var(--secondary-button)',
                    }}
                    onClick={() => handleOptionChange('gitignore', 'yes')}
                  >
                    Yes
                  </button>
                  <button 
                    type="button"
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-20 mr-8 ${gitignore === 'no' ? 'text-white' : 'text-gray-400 hover:text-white'} disabled:opacity-50 disabled:cursor-not-allowed`}
                    style={{
                      backgroundColor: gitignore === 'no' ? '#1D1D29' : 'var(--secondary-button)',
                    }}
                    onClick={() => handleOptionChange('gitignore', 'no')}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-3 rounded-lg font-semibold transition-colors hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                style={{
                  backgroundColor: 'var(--primary-button)',
                  color: 'var(--primary-text-color)'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = 'var(--primary-button-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = 'var(--primary-button)';
                  }
                }}
              >
                {isLoading ? 'Creating...' : 'Create Repository'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateRepoModal;