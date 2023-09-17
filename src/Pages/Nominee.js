import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';


import "./election.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function Elections() {
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [candidate, setCandidate] = useState(null);
  const [newCandidate, setNewCandidate] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedElectionName, setSelectedElectionName] = useState("");
  const [partyName, setPartyName] = useState("");
    // const [showModal,setShowModal] = useState(false);

  const handleDelete = async (id)=>{
    if (window.confirm("Do you really want to delete the candidate?")) {
      try{
        await axios.delete(`http://localhost:8000/api/deleteCandidate/${id}`)
        .then(()=>{
          alert("Candidate Delete Successfully");
          
        })
        .catch((error)=>{
          alert(error);
        })
      }
      catch(error){
        console.error(error);
      }

    }
    
  }

  const handleClickForUser = (value) => {
    setSelectedUserName(value);
    // console.log(selectedUserName);
  }
  const handleClickForElection = (value) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/createCandidate", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          userName: selectedUserName,
          electionName: selectedElectionName,
          party: partyName,
          nomineeId: selectedUserName + "786"
        }
      )

    });

    const resp = await response.json();
    // console.log("Candidate data: ",resp);


    if (!resp.success) {
      alert("Please enter valid data")
    }
    if (resp.success) {
      const fetchNewCandidateData = await fetch("http://localhost:8000/api/getCandidateData");

      setNewCandidate(await fetchNewCandidateData.json());
      const userResponse = await fetch("http://localhost:8000/api/updateUser", {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            name: selectedUserName
          }
        )
      });
      const userResp = await userResponse.json();
      // console.log(userResp);

      


      const electionResponse = await fetch("http://localhost:8000/api/updateElectionData", {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            electionName: selectedElectionName,
            candidateId: selectedUserName + "786"
          }
        )
      });

      setTimeout(() =>
        electionResponse
        , 5000);
      const eleRes = await electionResponse.json();







      alert("Candidate added successfully");
    }

  }
  useEffect(() => {
    getResponse();


  }, [])


  return (
    <div>
      <div className='election'>
        <div className='nomineeDiv'>
          <h4 className='mx-3'>
            Candidate List
          </h4>
          <button type="button" className="btn btn-success buttonCandidate" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add New Candidate
          </button>
        </div>
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
                        {selectedUserName ? selectedUserName : "Candidate Name"}
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {
                          userData && userData.map((item, index) => {
                            return (
                              <div>
                                <li><a className="dropdown-item" name="userName" onClick={() => handleClickForUser(item.name)}>{item.name}</a></li>

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
                        {selectedElectionName ? selectedElectionName : "Ongoing Elections"}
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {
                          response && response.map((item, index) => {
                            return (
                              <div>
                                <li><a class="dropdown-item" href="#" name="electionName" onClick={() => handleClickForElection(item.name)}>{item.name}</a></li>

                              </div>
                            )
                          })
                        }


                      </ul>
                    </div>

                  </div>
                  <div class="mb-3">
                    <label className="form-label">Party</label>
                    <input type="text" class="form-control" name='party' value={partyName} onChange={(event) => {
                      setPartyName(event.target.value);
                    }} />

                  </div>

                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>

            </div>
          </div>
        </div>

      </div>
      <div className='m-3 py-3'>
        <table className="table table-danger table-striped">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Party</th>
              <th scope="col">Participating Elections</th>
              <th scope="col">Remove</th>



            </tr>
          </thead>

          {candidate && candidate.map((item, index) => {
            var ElectionNames ;
            const electionId = item.electionId;
            const electionObj = response && response.find(obj => obj._id === electionId);
            if (electionObj) {
              const electionName = electionObj.name;
              ElectionNames = electionName ;
            }
            return (
              <tbody>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.party}</td>
                  <td>{ElectionNames + " "}</td>
                  <td><button className='btn btn-primary btn-sm' onClick={() => handleDelete(item._id)}>Delete</button></td>
                </tr>
              </tbody>
            )

          })}


        </table>
      </div>
    </div>
  )
}

export default Elections