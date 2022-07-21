import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Auth from './components/Auth'
import Jobs from './components/Jobs';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Jobs />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App