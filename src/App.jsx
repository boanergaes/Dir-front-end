// App.jsx
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard/Dashboard'
import Repositories from './pages/Repositories/Repositories'
import Workspace from './pages/Workspace/Workspace'
import Repository from './pages/Repository/Repository'
import Workspaces from './pages/Workspaces/Workspaces/Workspaces'
import Header from "./common-components/Header/Header";
import Footer from "./common-components/Footer/Footer";
import CreateRepository from './pages/createRepository/createRepository/CreateRepository';
import Signup from './pages/Auth/Signup/Signup/Signup';
function App() {
  return (
    <>
      {/* This is temporary routing to let everyone see the page they are building */}
      <Routes>
        <Route path='/' element={<Dashboard />}/> 
        <Route path='/repositories' element={<Repositories />} />
        <Route path='/repository' element={<Repository />} />
        <Route path='/workspace' element={<Workspace />} />
        <Route path='/workspaces' element={<Workspaces />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App;