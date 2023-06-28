import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import "./election.css"
import { Link } from 'react-router-dom'


function Elections() {
  const [response, setResponse] = useState(null);
  const [candidate, setCandidate] = useState(null);
  const getResponse = async () => {
    const res = await fetch("http://localhost:8000/api/getElectionData")
    const fetch_candidateData = await fetch("http://localhost:8000/api/getCandidateData");
    setCandidate(await fetch_candidateData.json());
    setResponse(await res.json());
  }

  useEffect(() => {
    getResponse();  
  }, [])


  return (
    <div>
      <div className='election'>
        <div className='d-flex-inline'>
          <h4 className='mt-3' style={{ display: "inline" }}>
            List Of Elections
          </h4>
          <Link to="/electionForm" className='mt-3' style={{ display: "inline-block", marginLeft: "780px" }}>
            <button className='btn btn-success'>
              Add Election Form
            </button>
          </Link>
        </div>
        <div className='m-3 py-3'>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Candidates Names</th>
              </tr>
            </thead>
            
              {response && response.map((item,index) => {
                // console.log(item);
                const CandidateNames = [];
                const startdate = new Date(item.startdate);
                const endDate = new Date(item.enddate);
                const candidateId = item.candidateIds;
                candidateId && candidateId.map((item1,index1)=>{
                  const candidateObj = candidate.find(obj=> obj._id === item1);
                  if(candidateObj){
                    const candidateName = candidateObj.name;
                    CandidateNames.push(candidateName);
                  }
                  else{
                    console.log("No Candidate Found");
                  }
                })

                
                return (
                  <tbody>
                  <tr>
                    <th scope="row">{index+1}</th>
                    <td>{item.name}</td>
                    <td>{startdate.toLocaleDateString()}</td>
                    <td>{endDate.toLocaleDateString()}</td>
                    <td>{CandidateNames+""}</td>
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