import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {
    let navigate = useNavigate();
    const [userData, setUserData] = useState({ voterId: "", email: "", name: "", dateOfBirth: "", password: "", isVoter: false })
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(userData);
        const response = await fetch("https://kaskalskal.onrender.com/api/createUser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: userData.email,
                    password: userData.password,
                    voterId: userData.voterId,
                    name: userData.name,
                    dateOfBirth: userData.dateOfBirth,
                    isVoter: true
                }
            )
        })

        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Please enter valid data")
        }
        if(json.success){
            if (userData.isVoter === true) {
                const responseIsVoter = await fetch("https://kaskalskal.onrender.com/api/createVoter", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            userName: userData.name,
                            voterId: "Will be Update"
                        }
                    )

                });

                const respIsVoter = await responseIsVoter.json();
                console.log("hjgj"+respIsVoter);
                if (!respIsVoter) {
                    alert("Please enter valid data");
                }
                if (respIsVoter) {
                    alert("Voter added successfully");
                }
            }
            navigate("/");
        }


    }

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }
    return (
        <div className='my-4 signup'>
            <h3>
                Create your Profile
            </h3>


            <form className='container' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">VoterId</label>
                    <input type="text" className="form-control" name='voterId'  value={userData.voterId}
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
                {/* <div className='col-6' style={{ marginBottom: "20px" }}>
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
                </div> */}
                
                </div>

                <button type="submit" className="btn btn-primary mx-3">Submit</button>

                <Link to="/loginUser">
                    <button type="submit" className="btn btn-danger mx-3 ">Already a User</button>
                </Link>
            </form></div>
    )
}

export default SignUp