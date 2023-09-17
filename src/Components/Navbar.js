import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const AdminEmail = localStorage.getItem("AdminEmail");
  const UserEmail = localStorage.getItem("UserEmail")
// console.log(AdminEmail);
  let navigate = useNavigate(); 
  const handleLogOut = ()=>{
    localStorage.removeItem("authToken");
    localStorage.removeItem("AdminEmail");
    localStorage.removeItem("UserEmail");
    navigate("/")
  }

  return (
    <div><nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"><img style={{height:"50px",width:"60px",borderRadius:"50%"}} src='img3.png'/></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" aria-current="page" to="/">Home</Link>
            {AdminEmail!=null && <Link className="nav-link" aria-current="page" to="/adminPage">Admin</Link>
           }

{UserEmail!=null && <Link className="nav-link" aria-current="page" to="/voterPage">User</Link>
           }
            

          </div>

        </div>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup" >
          {!localStorage.getItem("authToken") ?
            <div style={{marginLeft:"auto"}}>
              <Link to="/loginAdmin">
                <button type="button" className="btn btn-success m-3" >Login As an Admin</button>
              </Link>
              <Link to="/loginUser">
                <button type="button" className="btn btn-success m-3" >Login As a User</button>
              </Link>
            </div>

            :
            <div style={{marginLeft:"auto"}}>
              <button type="button" className="btn btn-success m-3" onClick={handleLogOut}>Log Out</button>
            </div>

          }



        </div>
      </div>
    </nav></div>
  )
}

export default Navbar
