import React, { useEffect, useState } from 'react'

import "./election.css"
import { useNavigate } from 'react-router-dom';



function Elections() {
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [candidate, setCandidate] = useState(null);
  const [userData,setUserData] = useState(null);
  const [selectedUserName,setSelectedUserName] = useState("");
  const [selectedElectionName,setSelectedElectionName] = useState("");
  const [partyName,setPartyName] = useState("");
  // const [showModal,setShowModal] = useState(false);
  

  const handleClickForUser = (value)=>{
    setSelectedUserName(value);
  }
  const handleClickForElection = (value)=>{
    setSelectedElectionName(value);
  }
  const getResponse = async () => {
    const res = await fetch("http://localhost:8000/api/getElectionData")
    const fetch_candidateData = await fetch("http://localhost:8000/api/getCandidateData");
    const fetch_userData = await fetch("http://localhost:8000/api/getUserData");
    setCandidate(await fetch_candidateData.json());
    setResponse(await res.json());
    setUserData(await fetch_userData.json());
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/createCandidate",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(
        {
          userName : selectedUserName, 
          electionName: selectedElectionName,
          party: partyName
        }
      )
    
    });

    const resp = await response.json();
    // console.log(json);


    if (!resp.success) {
        alert("Please enter valid data")
    }
    if(resp.success){
        const userResponse = await fetch("http://localhost:8000/api/updateUser",{
          method:"PATCH",
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(
           {
            name: selectedUserName
           } 
          )
        });
        const userResp = await userResponse.json();
        console.log(userResp);
        if(userResp.success){
          navigate("/adminPage");
        }
        // navigate("/adminPage");
    }
  }
  useEffect(() => {
    getResponse();
  }, [])


  return (
    <div>
      <div className='election'>
        <div className='d-flex-inline'>
          <h4 className='mt-3' style={{ marginRight: "750px", display: "inline" }}>
            List Of Candidates
          </h4>
          <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add New Candidate
          </button>
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Add Candidate</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                </div>
                <div class="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        {selectedUserName?selectedUserName:"Candidate Name"} 
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
                    <div className="mb-3">
                      <label className="form-label">Elections</label>
                      <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        {selectedElectionName?selectedElectionName:"Ongoing Elections"} 
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          {
                            response && response.map((item,index)=>{
                              return(
                                <div>
                                <li><a class="dropdown-item" href="#" name="electionName" onClick={()=>handleClickForElection(item.name)}>{item.name}</a></li>
                                
                                </div>
                              )
                            })
                          }
                         
                          
                        </ul>
                      </div>
                      
                    </div>
                    <div class="mb-3">
                      <label className="form-label">Party</label>
                      <input type="text" class="form-control" name='party' value={partyName} onChange={(event)=>{
                            setPartyName(event.target.value);
                        }}/>

                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                </div>

              </div>
            </div>
          </div>
        
        </div>
        <div className='m-3 py-3'>
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Party</th>
                <th scope="col">Participating Elections</th>
                

              </tr>
            </thead>

            {candidate && candidate.map((item, index) => {
              // console.log(item);
              const ElectionNames = [];
              // const startdate = new Date(item.startdate);
              // const endDate = new Date(item.enddate);
              const electionIds = item.electionId;
              electionIds&& electionIds.map((item1, index1) => {
                const electionObj = response && response.find(obj => obj._id === item1);
                if (electionObj) {
                  const electionName = electionObj.name;
                  ElectionNames.push(electionName);
                }
                else {
                  console.log("No Candidate Found");
                }
              })
              // console.log(item.electionId);


              return (
                <tbody>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.party}</td>
                    <td>{ElectionNames + " "}</td>
                  </tr>
                </tbody>
              )

            })}


          </table>
        </div>
      </div>
    </div>
  )
}

export default Elections