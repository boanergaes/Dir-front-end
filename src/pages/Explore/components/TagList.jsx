import { Plus } from 'lucide-react';

const TagList = ({ tags }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div>
        <h3 className='text-center text-(--secondary-text-color) text-[15px] mb-3'>Tags</h3>
        <hr className='border-t border-(--main-border-color) w-100 mb-3'></hr>
      </div>
      <div className="flex flex-wrap justify-center gap-x-2 gap-y-3 mb-3">
        {tags.map((tag) => (
          <button
            key={tag.name}
            className="px-4 py-1 text-sm rounded-full bg-(--meta-tag-color) border border-(--main-border-color) hover:bg-(--secondary-button-hover) cursor-pointer transition flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tag.color }}></div>
            {tag.label}
          </button>
        ))}
      </div>
      <button className="w-40 h-10 px-4 text-sm rounded-lg bg-(--secondary-button) border border-(--main-border-color) flex items-center justify-center gap-2">
        <Plus size={18} />
        <span>Custom tag</span>
      </button>
    </div>
  );
};

export default TagList;