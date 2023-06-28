import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {
    let navigate = useNavigate();
    const [userData, setUserData] = useState({ username: "", email: "", name: "", dateOfBirth: "", password: "", isVoter: false })
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(userData);
        const response = await fetch("http://localhost:8000/api/createUser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: userData.email,
                    password: userData.password,
                    username: userData.username,
                    name: userData.name,
                    dateOfBirth: userData.dateOfBirth,
                    isVoter: userData.isVoter
                }
            )
        })

        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Please enter valid data")
        }
        if(json.success){
            navigate("/");
        }


    }

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }
    return (
        <div className='my-4 '>
            <h3>
                Create your Profile
            </h3>


            <form className='container' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">UserName</label>
                    <input type="text" className="form-control" name='username' value={userData.username}
                        onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' value={userData.name}
                        onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={userData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Date Of Birth</label>
                    <input type="date" className="form-control" id="" aria-describedby="" name='dateOfBirth' value={userData.dateOfBirth}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={userData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className='row'>
                <div className='col-6' style={{ marginBottom: "20px" }}>
                    <div>
                        <label className="form-label">Voter</label>
                    </div>
                    <input type="radio" value={userData.isVoter} name="isVoter" onChange={(e) => {
                        setUserData({ ...userData, [e.target.name]: true });
                        // console.log(userData.isVoter);
                    }} /> Yes
                    <input type="radio" value={userData.isVoter} name="isVoter" onChange={(e) => {
                        setUserData({ ...userData, [e.target.name]: false });
                        // console.log(userData.isVoter);
                    }} /> No
                </div>
                
                </div>

                <button type="submit" className="btn btn-primary mx-3">Submit</button>

                <Link to="/loginUser">
                    <button type="submit" className="btn btn-danger mx-3 ">Already a User</button>
                </Link>
            </form></div>
    )
}

export default SignUp