import React from 'react'

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className=" container container-fluid d-flex justify-content-between">
                    <a className="navbar-brand">Job Hunter</a>
                    <button className="btn btn-primary" type="button">Logout</button>
                </div>
            </nav>
        </>
    )
}

export default Header