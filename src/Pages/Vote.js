import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Card from '../Components/Card';

function Vote() {
    const VoterEmail = localStorage.getItem("UserEmail");
    // console.log(VoterEmail);

    const [electionData, setelectionData] = useState(null)
    const [candidate, setCandidate] = useState(null);
    const [VoteValue,setVoteValue] = useState(null);
    const [electionName,setelectionName] = useState(null);
    const [VoterData,setvoterData] = useState(null);

     const getResponse = async () => {
      const fetchElectionData = await fetch("http://localhost:8000/api/getElectionData")
      const fetch_candidateData = await fetch("http://localhost:8000/api/getCandidateData");
      const fetch_voterData = await fetch("http://localhost:8000/api/getUserData");
      setCandidate(await fetch_candidateData.json());
      setelectionData(await fetchElectionData.json());
      setvoterData(await fetch_voterData.json());
    }
  
    useEffect(() => {
      getResponse();  
    }, [])

    const handleSubmit= async ()=>{
      const voterObj = VoterData.find(obj=> obj.email === VoterEmail);
      

      const voteData = await fetch("http://localhost:8000/api/createVotes",{
          method:"POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(
           {
            candidateName: VoteValue,
            electionName:  electionName,
            voterName: voterObj.name
           } 
          )
        });
        
        const vote = await voteData.json();
        // console.log(vote);
        if (voteData.ok) {
            alert("Vote add successfully");
        }
        if (!vote.success) {
            // alert("Enter valid details")
            // console.log(await resp.message.code);
            if(vote.message.code === 11000)
                alert("Duplicate Key Error");
            else{
                alert("Enter valid details")
            }
        }
        
    }
    const handleCallback = (VoteValueParameter,electionName)=>{
        setVoteValue(VoteValueParameter);
        setelectionName(electionName);
        
    }

  return (
    <div>
        <Navbar/>
        <div className='container'>
            <h1 className='my-3'>
                Council Election
            </h1>
            <span style={{fontStyle:"oblique"}}>
              (Please submit a vote for one election at a time)
            </span>
        {electionData && electionData.map((item,index)=>{
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
                <Card 
                parentCallback = {handleCallback}
                electionName = {item.name}
                candidateName = {candidateName}/>
                
            )
        })}

        <button className='btn btn-success my-3 btn-lg' onClick={handleSubmit}>Submit Vote</button>

        
        </div>
        


    </div>
  )
}

export default Vote