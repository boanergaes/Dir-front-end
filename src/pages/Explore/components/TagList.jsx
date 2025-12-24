// src/pages/Explore/components/TagList.jsx
import { Plus } from 'lucide-react';

const tags = [
  "Health", "Agriculture", "Government", "System programming",
  "Web development", "Front-end", "Full-stack", "Back-end",
  "Java", "PHP", "UI/UX", "JavaScript", "C++", "Rust", "Linux"
];

const TagList = () => {
  return (
    <div className="flex flex-col items-center gap-3">
    <div>
      <h3 className='text-center text-(--secondary-text-color) text-[15px] mb-3'>Tags</h3>
      <hr className='border-t border-(--main-border-color) w-100 mb-3'></hr>
    </div>
      <div className="flex flex-wrap justify-center gap-x-2 gap-y-3 mb-3">
        {tags.map((tag) => (
          <button
            key={tag}
            className="px-4 py-1 text-sm rounded-full bg-(--meta-tag-color) border border-(--main-border-color) hover:bg-(--secondary-button-hover) cursor-pointer transition"
          >
            {tag}
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
