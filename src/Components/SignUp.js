import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
    return (
        <div><form className='container'>
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
            <Link to="/signUp">
                <button type="submit" className="btn btn-danger mx-3 ">I'm new user</button>
            </Link>
        </form></div>
    )
}

export default SignUp