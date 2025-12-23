import './App.css'
import { Routes, Route } from 'react-router'
import Dashboard from './pages/Dashboard/Dashboard/Dashboard'
import Repositories from './pages/Repositories/Repositories/Repositories'
import Workspace from './pages/Workspace/Workspace/Workspace'
import Repository from './pages/Repository/Repository/Repository'
import Workspaces from './pages/Workspaces/Workspaces/Workspaces'
<<<<<<< HEAD
import Header from "./common-components/Header/Header";
import Footer from "./common-components/Footer/Footer";
=======
import Header from "src/common-components/Header";    
import Footer from "src/common-components/Footer";
>>>>>>> 043c28d9de0cda705f5497976fce7a131ad432c6

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path='/' element={<Dashboard />}/> 
          <Route path='/repositories' element={<Repositories />} />
          <Route path='/repository' element={<Repository />} />
          <Route path='/workspace' element={<Workspace />} />
          <Route path='/workspaces' element={<Workspaces />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App;