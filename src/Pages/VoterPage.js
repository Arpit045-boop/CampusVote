import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom';
import PostCard from '../Components/PostCard';

function VoterPage() {
  const userEmail = localStorage.getItem("UserEmail");

  const [electionData, setElectionData] = useState(null);
  const [candidateData, setCandidateData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [userData,setUserData] = useState(null);
  const [isCandidate,setIsCandidate] = useState(false);
  
  const [loading, setLoading] = useState(true);

  const [electionName, setElectionName] = useState("");
  const getData = async () => {
    const response = await fetch("https://kaskalskal.onrender.com/api/getElectionData");
    const fetchCandidateData = await fetch("https://kaskalskal.onrender.com/api/getCandidateData");
    const fetch_postData = await fetch("https://kaskalskal.onrender.com/api/getPost");
    const fetch_userData = await fetch("https://kaskalskal.onrender.com/api/getUserData");
    setUserData(await fetch_userData.json());
    setPostData(await fetch_postData.json());  
    setElectionData(await response.json());
    setCandidateData(await fetchCandidateData.json());
    setLoading(false);
  }
  const handleClickForUser=(value)=>{
    setElectionName(value);
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch("https://kaskalskal.onrender.com/api/createTask",{
      method:"POST",
      headers:{
        'Content-Type': 'application/json'  
      },

      body:JSON.stringify(
        {
          electionName: electionName,
          email: localStorage.getItem("UserEmail")
        }
      )

    });

    const json = await response.json();
    console.log(json);
    if(!json.success){
      alert("Enter valid Details");
    }
    if(json.success){
      alert("Request sent successfully");
      // navigate("/adminPage")
    }
  }


  useEffect(() => {
    getData();
  }, [])

  useEffect(()=>{
    // console.log("saasas");
    if (userEmail) {
      const userObj = userData && userData.find(obj => obj.email === userEmail);
      if (userObj) {
        if(userObj.isCandidate === true){
          setIsCandidate(true)
        }
      }
    }
  },[userEmail,userData])

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Navbar />
      <h4 className='my-3'>Here you can vote....</h4>
      <div className='voterPageButtons'>
      
      <Link to="/votepage">
      <button type="button" className="btn btn-success btn-lg" >
        Choose Your Leader
      </button>
      </Link>    

      {
        !isCandidate && <button className='btn btn-success btn-lg mx-3' data-bs-toggle="modal" data-bs-target="#exampleModal">Request for Nominee</button>
      }
        
      </div>
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Select Ongoing Election</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                </div>
                <div className="modal-body" style={{height:"300px"}}>
                  <form onSubmit={handleSubmit}>
                  <div className="dropdown">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        {electionName ? electionName :"Ongoing Elections"} 
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          {

                            electionData && electionData.map((item,index)=>{
                              return(
                                <div>
                                <li><a className="dropdown-item" name="electionName" onClick={()=>handleClickForUser(item.name)}>{item.name}</a></li>
                                
                                </div>
                              )
                             
                            })
                          }
                         
                          
                        </ul>
                      </div>

                    <button type="submit" style={{marginTop:"200px"}} className="btn btn-primary">Submit</button>
                  </form>
                </div>

              </div>
            </div>
          </div>
      <div className='my-3'>
      <div>
  {postData && postData.map((item,index)=>{
    return(
      <PostCard name={item.candidate} partyname={item.partyName} slogan={item.slogan} desc={item.desc} isUpvote={true} img={item.img}/> 
    )
  })}
  
</div>
      </div>

    </div>
  )
}

export default VoterPage