import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { authActions } from './store/store'

const Header = () => {
    const dispatch = useDispatch()
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className=" container container-fluid d-flex justify-content-between">
                    <Link to="/" className="navbar-brand">Job Hunter</Link>
                    <Link to="/" className="btn btn-primary" type="button" onClick={() => dispatch(authActions.logout())}>Logout</Link>
                </div>
            </nav>
        </>
    )
}

export default Header