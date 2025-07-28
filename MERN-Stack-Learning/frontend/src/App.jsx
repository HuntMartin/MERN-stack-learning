import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import CreatePj from './pages/CreateProjects';
import ShowPj from './pages/ShowProject';
import EditPj from './pages/EditProject';
import DeletePj from './pages/DeleteProject';


const App = () => {
  return (  
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/projects/create' element={<CreatePj />} />
      <Route path='/projects/details/:id' element={<ShowPj />} />
      <Route path='/projects/edit/:id' element={<EditPj />} />
      <Route path='/projects/delete/:id' element={<DeletePj />} />
    
    </Routes>
  )
}

export default App;