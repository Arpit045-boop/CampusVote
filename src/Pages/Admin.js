import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import Voters from '../Components/Voters';
import { useState } from 'react';
import Nominee from './Nominee';
import Elections from './Elections';
import VoteList from '../Components/VoteList';
import RequestTask from '../Components/RequestTask';

function Admin() {
  const adminEmail = localStorage.getItem("AdminEmail");
  const [value, setValue] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth>650);
  const updateMedia = ()=>{
    setIsDesktop(window.innerWidth > 650);
  }
  useEffect(()=>{
    window.addEventListener("resize",updateMedia);
    return ()=> window.removeEventListener("resize",updateMedia);
  },[])


  return (
    <>
    {
      adminEmail ?  <div>
      <Navbar />
      <h2 className='my-3'>
        Welcome to the Admin Page
      </h2>
       <div className="adminMenu">

<div className="row">
  <div className="col-3">
    <ul className='my-3'>
      <li className= {isDesktop ?'listMenu m-2 p-2' : 'listMenuRes m-2 p-2' }>
        <Link to="/adminPage" onClick={() => {
          setValue(4);
        }}>
          <h5>
            Vote
          </h5>
        </Link>
      </li>
      <li className={isDesktop ?'listMenu m-2 p-2' : 'listMenuRes m-2 p-2' }>
        <Link to="/adminPage" onClick={() => {
          setValue(1);
        }}>
          <h5>
            Voters
          </h5>
        </Link>
      </li>
      <li className={isDesktop ?'listMenu m-2 p-2' : 'listMenuRes m-2 p-2' }>
        <Link to="/adminPage" onClick={() => {
          setValue(2);
        }}>
          <h5>
            Candidates
          </h5>
        </Link>
      </li>
      <li className={isDesktop ?'listMenu m-2 p-2' : 'listMenuRes m-2 p-2' }>
        <Link to="/adminPage" onClick={() => {
          setValue(3);
        }}>
          <h5>
            OnGoing Elections
          </h5>
        </Link>
      </li>

      <li className={isDesktop ?'listMenu m-2 p-2' : 'listMenuRes m-2 p-2' }>
        <h5 className='hover-cursor' onClick={()=>{
          setValue(5);
        }}>
          Requests
          </h5>
      </li>

    </ul>
  </div>
  <div className="col-9" style={{ "backgroundColor": "whitesmoke" }}>
    {value === 1 ? <Voters /> : value===2 ? <Nominee/> : value===3 ? <Elections/>: value===4 ? <VoteList/> : value===5 ? <RequestTask/> : <img style={{maxHeight:"350px",width:"58rem"}} src='https://www.democracydocket.com/wp-content/uploads/2020/08/5-steps-for-colleges-WEB.png'/>}
  </div>
</div>
</div> 
      
      </div> : 
      <>
      <Navbar/>
      <h1>
        Please Login...
      </h1>
      </>
      
    }
    
    </>
    
  )
}

export default Admin