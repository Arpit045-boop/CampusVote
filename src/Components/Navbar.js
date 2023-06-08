import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div><nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">Campus Vote</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-link" aria-current="page" href="/">Home</a>
          <a className="nav-link" href="/">Voters</a>
          <a className="nav-link" href="/">Elections</a>
              
        </div>
        
      </div>
      <div>
      <Link to="/login">
      <button type="button" className="btn btn-success m-3">Login As a Admin</button>
      </Link>
      <button type="button" className="btn btn-success m-3">Login As a Nominee</button>

        <button type="button" className="btn btn-success m-3">Login As a Voter</button>
    </div>
    </div>
  </nav></div>
  )
}

export default Navbar
