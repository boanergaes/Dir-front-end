// src/pages/Explore/components/ProjectCard.jsx
import { Star } from 'lucide-react';
import { useState } from 'react';
import languageColors from '../../../styles/languageColors';
import { FaGithub } from "react-icons/fa";

const ProjectCard = ({ project }) => {
  const [visibility, setVisibility] = useState(project.visibility);

  return (
    <div className="bg-(--card-bg) p-5 rounded-xl border border-(--main-border-color) hover:border-(--primary-button-active) transition">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className='flex gap-2 justify-center items-center'>
          <h3 className="font-bold text-[22px]">{project.name}</h3>
          <button
            className='bg-(--meta-tag-color) px-2 py-0.5 rounded-[34px] text-[12px] text-(--secondary-text-color)'
            onClick={() => setVisibility(visibility === 'public' ? 'private' : 'public')}
          >
            {visibility}
          </button>
        </div>
        <span className="text-xs text-(--secondary-text-color) flex items-center gap-1">
          <Star size={16} />
          {project.starCount}
          <FaGithub size={16}/>
        </span>
      </div>

      {/* Owner */}
      <div className='flex items-center gap-3 mb-2'>
        <h4 className='font-semibold text-(--mid-dim-font-color) text-[20px]'>{project.owner}</h4>
        <button className='bg-(--meta-tag-color) px-2 py-0.5 rounded-[34px] text-[12px] text-(--secondary-text-color)'>
          Owner
        </button>
      </div>

      {/* Description */}
      <p className="text-sm font-light text-(--primary-text-color) mb-4">
        {project.description}
      </p>

      {/* Languages */}
      <div className="mb-4">
        <div className="h-2 bg-gray-700 rounded overflow-hidden flex">
          {project.languages.map((lang) => (
            <div
              key={lang.name}
              className="h-full"  
              style={{
                width: `${lang.percent}%`,
                backgroundColor: languageColors[lang.name] || '#6b7280',
                borderRightRadius:"10px",
              }}
              title={`${lang.name}: ${lang.percent}%`}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {project.languages.map((lang) => (
            <div key={lang.name} className="flex items-center gap-2 text-xs">
              <div
                className="w-2 h-2 rounded"
                style={{ backgroundColor: languageColors[lang.name] || '#6b7280' }}
              />
              <span className="text-(--mid-dim-text-color)">{lang.name}</span>
              <span className="text-(--secondary-text-color)">{lang.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Collaborators */}
      <h3 className='font-semibold text-[12px] mb-2'>Collaborators</h3>   
      <div className="flex -space-x-2">
        {project.collaborators.map((_, i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-full bg-gray-600 border border-[#141722]"
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
