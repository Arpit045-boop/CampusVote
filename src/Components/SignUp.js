import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
    return (
        <div className='my-4'>
        <h3>
        Create your Profile
        </h3>
        
        
        <form className='container'>
        
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" id="" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label className="form-label">Phone No</label>
                <input type="tel" className="form-control" id="" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <Link to="/adminPage">
                <button type="submit" className="btn btn-primary mx-3">Submit</button>
            </Link>
            <Link to="/login">
                <button type="submit" className="btn btn-danger mx-3 ">Already a User</button>
            </Link>
        </form></div>
    )
}

export default SignUp