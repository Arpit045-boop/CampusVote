import React from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import Voters from '../Components/Voters';
import { useState } from 'react';
import Nominee from './Nominee';
import Elections from './Elections';
import DashBoard from '../Components/DashBoard';

function Admin() {
  const [value, setValue] = useState(0);

  return (
    <div>
      <Navbar />
      <h2 className='my-3'>
        Welcome to the Admin Page
      </h2>
      <div className="">

        <div className="row">
          <div className="col-3" style={{ "backgroundColor": "violet" }}>
            <ul className='my-3'>
              <li>
                <Link to="/adminPage" onClick={() => {
                  setValue(0);
                }}>
                  <h5>
                    Dashboard
                  </h5>
                </Link>
              </li>
              <li>
                <Link to="/adminPage" onClick={() => {
                  setValue(1);
                }}>
                  <h5>
                    Voters
                  </h5>
                </Link>
              </li>
              <li>
                <Link to="/adminPage" onClick={() => {
                  setValue(2);
                }}>
                  <h5>
                    Candidates
                  </h5>
                </Link>
              </li>
              <li>
                <Link to="/adminPage" onClick={() => {
                  setValue(3);
                }}>
                  <h5>
                    OnGoing Elections
                  </h5>
                </Link>
              </li>

            </ul>
          </div>
          <div className="col-9" style={{ "backgroundColor": "whitesmoke" }}>
            {value === 1 ? <Voters /> : value===2 ? <Nominee/> : value===3 ? <Elections/>: <DashBoard/>}
          </div>
        </div>
      </div></div>
  )
}

export default Admin