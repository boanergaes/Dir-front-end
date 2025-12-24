// src/pages/Explore/Explore.jsx
import Header from "../../../common-components/Header/Header";
import Footer from "../../../common-components/Footer/Footer";
import ExploreHero from "../components/ExploreHero";
import TagList from "../components/TagList";
import ProjectGrid from "../components/ProjectGrid";

const Explore = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-dark-bg text-white px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 ">
            <ExploreHero />
          </div>
          <div className="mb-10">
            <TagList />
          </div>
          <div>
            <ProjectGrid />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Explore;
