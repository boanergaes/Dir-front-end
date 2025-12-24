// src/pages/Explore/data/projects.js
const projects = [
  {
    id: 1,
    name: "My-Project",
    owner:"boanergase",
    starCount:"300",
    visibility: "public",
    description: "A fully static multi-page website built for tracking inventory of the merchandise and the government services...more",
    languages: [
      { name: "JavaScript", percent: 50 },
      { name: "HTML", percent: 18 },
      { name: "CSS", percent: 32 },
    ],
    collaborators: [1, 2, 3],
  },
  {
    id: 2,
    name: "Traffic-Management",
    owner:"EfrataHabte",
    starCount: "140",
    visibility: "public",
    description: "Traffic system management dashboard.",
    languages: [
      { name: "Rust", percent: 50.3 },
      { name: "C", percent: 16.3 },
      { name: "Zig", percent: 33.4 },
    ],
    collaborators: [1, 2, 3, 4],
  },
   {
    id: 3,
    name: "School-Management",
    owner:"Meron-Bekele",
    starCount: "0",
    visibility: "public",
    description: "School system management for AAIT easier work flow.",
    languages: [
      { name: "Python", percent: 50.3 },
      { name: "JavaScript", percent: 16.3 },
      { name: "C", percent: 33.4 },
    ],
    collaborators: [1, 2, 3, 4],
  },
  {
    id: 3,
    name: "Smart-Home",
    owner:"Gelila-Sntayehu",
    starCount: "30",
    visibility: "public",
    description: "Smart home system management for AAIT easier work flow.",
    languages: [
      { name: "Python", percent: 30.3 },
      { name: "HTML", percent: 16.3 },
      { name: "Zig", percent: 33.4 },
    ],
    collaborators: [1, 2, 3, 4],
  },
];

export default projects;
