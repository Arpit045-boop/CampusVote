import React from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import Voters from '../Components/Voters';
import { useState } from 'react';

function admin() {
const [value,setValue] = useState(0);

  return (
    <div>
    <Navbar/> 
    <div className="">
    <div className="row">
      <div className="col-3" style={{"backgroundColor":"violet"}}>
        <ul>
        <li>
        <Link to="/adminPage">
        Dashboard
        </Link>
        </li> 
        <li>
        <Link to="/adminPage" onClick={()=>{
            setValue(1);
        }}>
        Voters
        </Link>
        </li> 
        <li>
        Candidates
        </li>   
        <li>
        Positions   
        </li> 
        
        </ul>
        
        
    
      </div>
      <div className="col-9"  style={{"backgroundColor":"green"}}>
      {value===1 && <Voters/>}
      </div>
    </div>
  </div></div>
  )
}

export default admin