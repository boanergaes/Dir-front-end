import React, {useState} from 'react'
import './ProjectCard.css'
import languageColors from '../../styles/languageColors'
import axios from 'axios';

function LanguageBar({languages}){
  // languages: [{name, percent}]
  return (
    <div className="pc-language-bar">
      {languages.map((l, i) => (
        <div
          key={l.name+i}
          className="pc-language-segment"
          style={{
            width: `${l.percent}%`,
            backgroundColor: languageColors[l.name] || '#666'
          }}
          title={`${l.name} ${l.percent}%`}
        />
      ))}
    </div>
  )
}

export default function ProjectCard({project}){
  const {
    name,
    visibility = 'public',
    stars = 0,
    owner,
    description,
    languages = [],
    collaborators = []
  } = project || {}
  const [expanded, setExpanded] = useState(false)
  const base = 'http://localhost:5000';

  return (
    <div className="pc-card" tabIndex={0} aria-label={`${name} project card`}>
      <div className="pc-header">
        <div className="pc-title">
          <span className="pc-icon">🔗</span>
          <h3>{name}</h3>
          <span className="pc-visibility">{visibility}</span>
        </div>
        <div className="pc-stats">
          <span className="pc-star">⭐</span>
          <span className="pc-star-count">{stars}</span>
        </div>
      </div>

      <div className="pc-owner">{owner} <span className="pc-owner-tag">owner</span></div>

      <p className="pc-desc">
        {expanded ? description : (description?.length > 120 ? description.slice(0,120) + '...' : description)}
        {description && description.length > 120 && (
          <button className="pc-more-btn" onClick={() => setExpanded(s => !s)} aria-expanded={expanded} aria-controls="pc-desc-full">
            {expanded ? 'less' : 'more'}
          </button>
        )}
      </p>

      <LanguageBar languages={languages} />

      <div className="pc-language-list">
        {languages.map(l => (
          <div key={l.name} className="pc-language-item">
            <span className="pc-dot" style={{backgroundColor: languageColors[l.name] || '#888'}} />
            <span className="pc-lang-name">{l.name}</span>
            <span className="pc-lang-percent">{l.percent}%</span>
          </div>
        ))}
      </div>

      <div className="pc-collab-title">Collaborators</div>
      <div className="pc-collaborators" role="list">
        {collaborators.map((c, i) => (
          <img key={i} src={c.avatar} alt={c.name || 'collaborator'} className="pc-avatar" role="listitem" />
        ))}
      </div>
         {console.log('hi there')}
      { axios.get(`${base}/explore`).then(res=>{
        console.log('Axios Data', res.data)
        }).catch(err => console.log(err))
        }
       
    </div>
  )
}
