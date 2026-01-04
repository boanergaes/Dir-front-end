import ProjectCard from "./ProjectCard";
import { ChevronDown } from 'lucide-react';

const ProjectGrid = ({ repos, onLoadMore, isLoading }) => {
  return (
    <>
      <div className="w-auto max-w-75 pt-1 px-3 bg-(--card-bg-lighter) border border-(--main-border-color) border-b-none rounded-tl-2xl rounded-tr-[76px] text-(--secondary-text-color) text-[14px]">
        <button className="w-auto px-4 pt-1.5 bg-(--active-tab-bg) border border-(--main-border-color) border-b-none rounded-t-2xl">All</button>
        <button className="px-4">Repositories</button>
        <button className="">Workspaces</button>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-(--dimmer-dark-bg) border border-(--main-border-color) rounded-b-2xl rounded-tr-2xl">
        {repos.map((repo) => (
          <ProjectCard key={repo.githubId} project={repo} />
        ))}
      </div>

      <div className="text-center mt-4" >
        <button 
          onClick={onLoadMore}
          disabled={isLoading}
          className="bg-(--primary-button) hover:bg-(primary-button-hover) px-6 py-2 rounded-md text-sm flex items-center gap-2 mx-auto disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Load More"}
          <ChevronDown size={16} />
        </button>
      </div>
    </>
  );
};

export default ProjectGrid;