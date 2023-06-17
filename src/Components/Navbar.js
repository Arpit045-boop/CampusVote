import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div><nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Campus Vote</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-link" aria-current="page" to="/">Home</Link>
          <Link className="nav-link" to="/nominee">Candidates</Link>
          <Link className="nav-link" to="/election">Elections</Link>
              
        </div>
        
      </div>
      <div>
      <Link to="/loginAdmin">
      <button type="button" className="btn btn-success m-3">Login As an Admin</button>
      </Link>

      <Link to="/loginNominee">
      <button type="button" className="btn btn-success m-3">Login As a Nominee</button>
      </Link>
      <Link to="/loginVoter">
        <button type="button" className="btn btn-success m-3">Login As a Voter</button>
        </Link>
        </div>
    </div>
  </nav></div>
  )
}

export default Navbar
