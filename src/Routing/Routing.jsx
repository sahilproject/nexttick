import React from 'react'
import { Route , Routes , BrowserRouter as Router } from 'react-router-dom'
import Home from '../Pages/Home'


const Routing = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default Routing
