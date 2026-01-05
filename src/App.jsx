<<<<<<< HEAD
﻿// App.jsx
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Repositories from './pages/Repositories/Repositories'
import Workspace from './pages/Workspace/Workspace'
import Repository from './pages/Repository/Repository'
import Workspaces from './pages/Workspaces/Workspaces/Workspaces'
import Header from "./common-components/Header/Header";
import Footer from "./common-components/Footer/Footer";
import CreateRepository from './pages/createRepository/createRepository/CreateRepository';
import Signup from './pages/Auth/Signup/Signup/Signup';
=======
import "./App.css";
import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import Repositories from "./pages/Repositories/Repositories";
import Workspace from "./pages/Workspace/Workspace";
import Repository from "./pages/Repository/Repository";
import Profile from "./pages/Profile/Profile/Profile";
import CreateRepo from "./pages/CreateRepository/CreateRepo";
import Workspaces from "./pages/Workspaces/Workspaces";
import ExploreContainer from "./pages/Explore/ExploreContainer";

>>>>>>> b21d0a42e37742098603a4371376151ee9cd5daf
function App() {
  return (
    <>
      <Routes>
<<<<<<< HEAD
        {/* Change home to Signup so you can click "Login with GitHub" */}
        <Route path='/' element={<Signup />}/> 
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />}/> 
        
        {/* Rest of your routes */}
        <Route path='/repositories' element={<Repositories />} />
        <Route path='/repository' element={<Repository />} />
        <Route path='/workspace' element={<Workspace />} />
        <Route path='/workspaces' element={<Workspaces />} />
=======
        <Route path="/" element={<Dashboard />} />
        <Route path="/repositories" element={<Repositories />} />
        <Route path="/repository" element={<Repository />} />
        <Route path="/repository/create" element={<CreateRepo />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/workspaces" element={<Workspaces />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/explore" element={<ExploreContainer />} />
>>>>>>> b21d0a42e37742098603a4371376151ee9cd5daf
      </Routes>
      
    </>
<<<<<<< HEAD
  )
}
export default App;
=======
  );
}

export default App;
>>>>>>> b21d0a42e37742098603a4371376151ee9cd5daf
