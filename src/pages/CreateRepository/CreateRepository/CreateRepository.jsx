import React, { useState } from 'react';
import './CreateRepository.css';

const CreateRepository = () => {
  const [repoName, setRepoName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('private');
  const [readme, setReadme] = useState('no');
  const [gitignore, setGitignore] = useState('no');

  const handleCreateRepository = (e) => {
    e.preventDefault();
    
    if (!repoName.trim()) {
      alert('Please enter a repository name');
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
    
    // Reset form
    setRepoName('');
    setDescription('');
    setVisibility('private');
    setReadme('no');
    setGitignore('no');
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
    <div className="repository-creation">
      <h1>Create New Repository</h1>
      <hr className="divider" />
      
      <form onSubmit={handleCreateRepository}>
        <div className="repo-field">
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
        
        <div className="repo-field">
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
        
        <div className="create">
          <button type="submit" className="create-repo-btn">
            Create Repository
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRepository;