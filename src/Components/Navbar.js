import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  let navigate = useNavigate();
  const handleLogOut = ()=>{
    localStorage.removeItem("authToken");
    navigate("/")
  }

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
           

          </div>

        </div>
        <div>
          {!localStorage.getItem("authToken") ?
            <div>
              <Link to="/loginAdmin">
                <button type="button" className="btn btn-success m-3">Login As an Admin</button>
              </Link>
              <Link to="/loginUser">
                <button type="button" className="btn btn-success m-3">Login As a User</button>
              </Link>
            </div>

            :
            <div>
              <button type="button" className="btn btn-success m-3" onClick={handleLogOut}>LogOut</button>
            </div>

          }



        </div>
      </div>
    </nav></div>
  )
}

export default Navbar
