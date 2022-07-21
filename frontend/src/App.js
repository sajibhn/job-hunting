import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AddJob from './components/AddJob';
import Auth from './components/Auth'
import Header from './components/Header';
import Jobs from './components/Jobs';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './components/store/store';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.isLoggedIn)

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login())
    }
  }, [dispatch])
  return (
    <div>
      <BrowserRouter>
        {isLoggedIn ? <Header /> : null}
        <Routes>
          {!isLoggedIn ? (
            <Route path='/' element={<Auth />} />
          ) : (
            <>
              <Route path='/' element={<Jobs />} />
              <Route path='/addjob' element={<AddJob />} />
            </>
          )}

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App