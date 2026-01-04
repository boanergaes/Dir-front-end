// Mocking the backend responses provided in the requirements
export const fetchExploreRepos = async (page = 1, query = "", tag = "") => { // eslint-disable-line no-unused-vars
  // In the future, replace this with:
  // const res = await fetch(`/api/repos/explore?page=${page}&q=${query}&tag=${tag}`);
  // return res.json();

  const baseRepos = [
    {
      githubId: "12345678",
      name: "Dir-Platform",
      owner: "boanergase",
      avatar: "https://avatars.githubusercontent.com/u/1",
      description: "A developer-focused platform designed to help users discover software repositories...more",
      stars: 300,
      tags: ["javascript", "web-development"],
      languages: [
        { label: "JavaScript", value: 50, color: "#f1e05a" },
        { label: "HTML", value: 18, color: "#e34c26" },
        { label: "CSS", value: 32, color: "#563d7c" }
      ],
      visibility: "public"
    },
    {
      githubId: "87654321",
      name: "Traffic-Management",
      owner: "EfrataHabte",
      avatar: "https://avatars.githubusercontent.com/u/2",
      description: "Traffic system management dashboard for urban infrastructure.",
      stars: 140,
      tags: ["rust", "system-programming"],
      languages: [
        { label: "Rust", value: 50.3, color: "#dea584" },
        { label: "C", value: 16.3, color: "#555555" },
        { label: "Zig", value: 33.4, color: "#ec915c" }
      ],
      visibility: "public"
    },
    {
      githubId: "11111111",
      name: "AI-Assistant",
      owner: "johndoe",
      avatar: "https://avatars.githubusercontent.com/u/3",
      description: "An AI-powered assistant for developers.",
      stars: 450,
      tags: ["python", "ai"],
      languages: [
        { label: "Python", value: 70, color: "#3572A5" },
        { label: "JavaScript", value: 30, color: "#f1e05a" }
      ],
      visibility: "public"
    },
    {
      githubId: "22222222",
      name: "Blockchain-Explorer",
      owner: "cryptodev",
      avatar: "https://avatars.githubusercontent.com/u/4",
      description: "Explore blockchain transactions and data.",
      stars: 200,
      tags: ["blockchain", "javascript"],
      languages: [
        { label: "JavaScript", value: 60, color: "#f1e05a" },
        { label: "Solidity", value: 40, color: "#AA6746" }
      ],
      visibility: "public"
    }
  ];

  // Simulate pagination: return 2 repos per page
  const startIndex = (page - 1) * 2;
  const endIndex = startIndex + 2;
  const repos = baseRepos.slice(startIndex, endIndex);

  return {
    status: "success",
    data: {
      total: 100,
      repos: repos,
      hasNextPage: endIndex < baseRepos.length
    }
  };
};

export const fetchTopics = async () => {
  return {
    status: "success",
    data: [
      { name: "health", label: "Health", color: "#10b981" },
      { name: "agriculture", label: "Agriculture", color: "#059669" },
      { name: "javascript", label: "JavaScript", color: "#f1e05a" },
      { name: "web-development", label: "Web Development", color: "#4b5563" },
      { name: "rust", label: "Rust", color: "#dea584" }
    ]
  };
};