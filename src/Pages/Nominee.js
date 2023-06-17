import React from 'react'
import Navbar from '../Components/Navbar'
import "./nominee.css"

function Nominee() {
    return (
        <div>
            <Navbar />
            <div className='nominee container'>
                <h3 style={{textAlign:"left"}}>
                    List Of Candidates
                </h3>
                <div className='my-3 p-3' style={{"backgroundColor":"silver"}}>
                <div className='row my-3'>
                  <div className='col'>
                    <h5>Firstname</h5>
                  </div>
                  <div className='col'>
                  <h5>Lastname</h5>
                    
                  </div>
                  <div className='col'>
                    <h5>VoterId</h5>
                  </div>
                  <div className='col'>
                    <h5>Photo</h5>
                  </div>
                </div>
          
                <div className='row my-3'>
                  <div className='col'>
                    <h5>Asdf</h5>
                  </div>
                  <div className='col'>
                  <h5>sds</h5>
                    
                  </div>
                  <div className='col'>
                    <h5>12121ded</h5>
                  </div>
                  <div className='col'>
                    <h5>Photo</h5>
                  </div>
                </div><div className='row my-3'>
                  <div className='col'>
                    <h5>dede</h5>
                  </div>
                  <div className='col'>
                  <h5>cdcdc</h5>
                    
                  </div>
                  <div className='col'>
                    <h5>21212cdc</h5>
                  </div>
                  <div className='col'>
                    <h5>Photo</h5>
                  </div>
                </div><div className='row my-3'>
                  <div className='col'>
                    <h5>Firstname</h5>
                  </div>
                  <div className='col'>
                  <h5>Lastname</h5>
                    
                  </div>
                  <div className='col'>
                    <h5>VoterId</h5>
                  </div>
                  <div className='col'>
                    <h5>Photo</h5>
                  </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Nominee