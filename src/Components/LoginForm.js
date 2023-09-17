import React, { useEffect, useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import './loginPage.css';

function LoginForm(props) {
  let navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const getResponse = async()=>{
    const fetch_userData = await fetch("http://localhost:8000/api/getUserData");
    setUserData(await fetch_userData.json());
  }
  
  const handleSubmitAdmin = async (e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/loginAdmin",{
      method:"POST",
      headers:{
        'Content-Type': 'application/json'  
      },

      body:JSON.stringify(
        {
          email:email,
          password:password
        }
      )

    });

    const json = await response.json();
    console.log(json);
    if(!json.success){
      alert("Enter valid credential");
    }
    if(json.success){
      localStorage.setItem("AdminEmail",email);
      localStorage.setItem("authToken",json.authToken);
      // console.log(localStorage.getItem("AdminEmail"));
      navigate("/adminPage")
    }
  }

  const handleSubmitUser = async (e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/loginUser",{
      method:"POST",
      headers:{
        'Content-Type': 'application/json'  
      },

      body:JSON.stringify(
        {
          email:email,
          password:password
        }
      )

    });

    const json = await response.json();
    console.log(json);
    if(!json.success){
      alert("Enter valid credential");
    }
    if(json.success){
      localStorage.setItem("UserEmail",email);
      localStorage.setItem("authToken",json.authToken);
      // console.log(localStorage.getItem("UserEmail"));
      const userObj = userData.find(obj=> obj.email === email);
      if(userObj.isCandidate === true){
        navigate("/candidatePage");
      }
      else{
        navigate("/voterPage");
      }
      
    }
  }
  
  useEffect(()=>{
    getResponse();
  },[])


  return (
   
    <div>
    <div className='login' >
    <h3>
      Login As an {props.temp === 1 ? "Admin" : "User"}
    </h3>
    <form className='container'  onSubmit={props.temp===1 ? handleSubmitAdmin : handleSubmitUser }>
    <div className="mb-3">
      <label  className="form-label">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
    </div>  
    <div className="mb-3">
      <label for="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
    </div>
    
    <button type="submit" className="btn btn-primary mx-3">Submit</button>
    
    {props.temp !== 1 && <Link to="/signUp">
    <button type="submit" className="btn btn-danger mx-3 ">I'm new user</button>
    </Link>}
    
    </form>
    </div>
    </div>
  )
}

export default LoginForm