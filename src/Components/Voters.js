import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Voters() {
  const [userData,setUserData] = useState(null);
  const [selectedUserName,setSelectedUserName] = useState("");
  const [voterId,setVoterId] = useState("");
  const handleClickForUser = (value)=>{
    setSelectedUserName(value);
  }
  // Bhai mujhe ab createVoters vali api bnani h or getVoter vali bhi
  // fir mujhe iss interface par handle submit me use krna h.....
  // then me Votes vale data pr kam krunga.....Bye Good night
  const handleSubmit= async ()=>{
    const resp = fetch("http://localhost:8000/api/")
  }
  return (
    <div>
      <div className='d-flex'>
      <h4 className='mt-3 mx-3' style={{"textAlign":"left"}}>
        Voters List
      </h4>
      <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add Voter
          </button>
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Add Voter</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                </div>
                <div class="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        {selectedUserName?selectedUserName:"Voter Name"} 
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          {
                            userData && userData.map((item,index)=>{
                              return(
                                <div>
                                <li><a className="dropdown-item" name="userName" onClick={()=>handleClickForUser(item.name)}>{item.name}</a></li>
                                
                                </div>
                              )
                            })
                          }
                         
                          
                        </ul>
                      </div>
                      
                    </div>
                    
                    <div class="mb-3">
                      <label className="form-label">VoterId</label>
                      <input type="text" class="form-control" name='voterId' value={voterId} onChange={(event)=>{
                            setVoterId(event.target.value);
                        }}/>

                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                </div>

              </div>
            </div>
          </div>
      </div>
      
      {/* Main grid */}
      <div className='m-3 py-3'>
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">VoterId</th>
                <th scope="col">Remove</th>            
              </tr>
            </thead>

            
            <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>sxss</td>
                    <td>cdcd</td>
                    <td>crfrf</td>
                  </tr>
            </tbody>


          </table>
        </div>
      

    </div>
  )
}

export default Voters