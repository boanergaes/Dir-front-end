import { useState, useEffect } from 'react';
import Header from "../../common-components/Header/Header";
import Footer from "../../common-components/Footer/Footer";
import ExploreHero from "./components/ExploreHero";
import TagList from "./components/TagList";
import ProjectGrid from "./components/ProjectGrid";
import { fetchExploreRepos, fetchTopics } from "./api/repoService";

const ExploreContainer = () => {
  const [repos, setRepos] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true); // Track if more data exists

  useEffect(() => {
    const initLoad = async () => {
      setLoading(true);
      const [repoRes, tagRes] = await Promise.all([fetchExploreRepos(1), fetchTopics()]);
      setRepos(repoRes.data.repos);
      setTags(tagRes.data);
      setHasNextPage(repoRes.data.hasNextPage); // Set initial button visibility
      setLoading(false);
    };
    initLoad();
  }, []);

  const handleLoadMore = async () => {
    // Prevent multiple clicks while loading
    if (loading || !hasNextPage) return;

    setLoading(true); 
    const nextPage = page + 1;
    const res = await fetchExploreRepos(nextPage);
    
    // IMPORTANT: Append new repos to the existing array
    setRepos((prev) => [...prev, ...res.data.repos]);
    setPage(nextPage);
    setHasNextPage(res.data.hasNextPage); // Update button visibility based on backend
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-dark-bg text-white px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6"><ExploreHero /></div>
          <div className="mb-10"><TagList tags={tags} setTags={setTags} /></div>
          <div>
            <ProjectGrid 
              repos={repos} 
              onLoadMore={handleLoadMore} 
              isLoading={loading}
              // Pass a boolean to hide/show the Load More button in the UI
              showButton={hasNextPage} 
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ExploreContainer;