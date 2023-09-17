import React, { useEffect, useState } from 'react'

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
        <div className='nomineeDiv'>
          <h4 className='mx-3'>
            Elections List
          </h4>
          <div className='buttonCandidate'>
          <Link to="/electionForm" className='mt-3'>
            <button className='btn btn-success'>
              Add Election Form
            </button>
          </Link>
          </div>
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
                
                const startdate = new Date(item.startdate);
                const endDate = new Date(item.enddate);
                const electionId = item._id;
                const candidateObj = candidate.filter(obj=> obj.electionId === electionId );
               
                var candidateName = [];
                if(candidateObj){
                  candidateObj.map((item,index)=>{
                    candidateName.push(item.name)
                  })  
                }
                else{
                  candidateName = "No Candidate Found";
                }
                
                return (
                  <tbody>
                  <tr>
                    <th scope="row">{index+1}</th>
                    <td>{item.name}</td>
                    <td>{startdate.toLocaleDateString()}</td>
                    <td>{endDate.toLocaleDateString()}</td>
                    <td>{candidateName+""}</td>
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