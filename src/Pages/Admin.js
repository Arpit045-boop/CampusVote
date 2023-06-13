import React from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import Voters from '../Components/Voters';
import { useState } from 'react';

function Admin() {
const [value,setValue] = useState(0);

  return (
    <div>
    <Navbar/> 
    <div className="">
    <div className="row">
      <div className="col-3" style={{"backgroundColor":"violet"}}>
        <ul className='my-3'>
        <li>
        <Link to="/adminPage">
          <h5>
        Dashboard
        </h5>
        </Link>
        </li> 
        <li>
        <Link to="/adminPage" onClick={()=>{
            setValue(1);
        }}>
          <h5>
        Voters
        </h5>
        </Link>
        </li> 
        <li>
          <h5>
        Candidates
        </h5>
        </li>   
        <li>
          <h5>
        Positions
        </h5>   
        </li> 
        
        </ul>
        
        
    
      </div>
      <div className="col-9"  style={{"backgroundColor":"whitesmoke"}}>
      {value===1 && <Voters/>}
      </div>
    </div>
  </div></div>
  )
}

export default Admin