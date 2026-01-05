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
      <Routes>
        {/* Change home to Signup so you can click "Login with GitHub" */}
        <Route path='/' element={<Signup />}/> 
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />}/> 
        
        {/* Rest of your routes */}
        <Route path='/repositories' element={<Repositories />} />
        <Route path='/repository' element={<Repository />} />
        <Route path='/workspace' element={<Workspace />} />
        <Route path='/workspaces' element={<Workspaces />} />
      </Routes>
    </>
  )
}
export default App;