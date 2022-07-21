import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Auth from './components/Auth'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App