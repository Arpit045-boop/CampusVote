import axios from 'axios';
import React, { useEffect, useState } from 'react'

function RequestTask() {


  const [tasks, setTasks] = useState(null);
  const [newCandidate, setNewCandidate] = useState(null);
  const [showConfirmation, setshowConfirmation] = useState(false);
  const [TaskId, setTaskId] = useState(null);
  const getResponse = async () => {
    const fetch_RequestTask = await fetch("http://localhost:8000/api/getTask");
    setTasks(await fetch_RequestTask.json());
  }

  const handleDelete = async (id)=>{
    if (window.confirm("Do you really want to delete the task?")) {
      try{
        await axios.delete(`http://localhost:8000/api/deleteTask/${id}`)
        .then(()=>{
          alert("Task Delete Successfully");
          
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

  useEffect(() => {
    getResponse();
  }, [])
  const handleConfirmation = async (confirmed) => {
    var tempVoterName ;
    var tempElectionName;
    if (confirmed) {
       
      console.log(TaskId);
      const taskObj = tasks.find(obj=> obj._id === TaskId);
      if(taskObj){
        console.log(taskObj);
        tempVoterName = taskObj.voterName;
        tempElectionName = taskObj.electionName;
      }
      const response = await fetch("http://localhost:8000/api/createCandidate", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            userName:  tempVoterName ,
            party: "Will be updated",
            electionName: tempElectionName,
            nomineeId: tempVoterName + "786",
            isForTask : true
          }
        )

      });

      const resp = await response.json();

      if (!resp.success) {
        alert("Please enter valid data")
      }
      if (resp.success) {
        const fetchNewCandidateData = await fetch("http://localhost:8000/api/getCandidateData");

        setNewCandidate(await fetchNewCandidateData.json());
        console.log("new Camd: ", await newCandidate);
        const userResponse = await fetch("http://localhost:8000/api/updateUser", {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              name: tempVoterName
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
              electionName: tempElectionName,
              candidateId: tempVoterName + "786"
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
    else {
      console.log('Delete action canceled.');
    }
    setshowConfirmation(false);
  };

  return (
    <div>
      <div className='d-flex'>
        <h4 className='mt-3 mx-3' style={{ "textAlign": "left" }}>
          Task List
        </h4>
      </div>
      {showConfirmation && <div style={{ backgroundColor: "wheat", width: "fit-content", margin: "auto", padding: "10px" }}>
        <p>Are you sure you want to approve this user?</p>
        <button className='m-2' onClick={() => handleConfirmation(true)}>Yes</button>
        <button className='m-2' onClick={() => handleConfirmation(false)}>No</button>
      </div>}
      {/* Main grid */}
      <div className='m-3 py-3'>
        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Voter Name</th>
              <th scope="col">Voter Id</th>
              <th scope="col">Election Name</th>
              <th scope="col">Approve</th>
              <th scope="col">Reject</th>
            </tr>
          </thead>

          {tasks && tasks.map((item, index) => {
            return (
              <tbody>
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.voterName}</td>
                  <td>{item.voterId}</td>
                  <td>{item.electionName}</td>
                  <td><button className='btn btn-success btn-sm' onClick={
                    () => {
                      setshowConfirmation(true);
                      setTaskId(item._id);
                    }}
                  >
                    Approve</button></td>
                  <td><button className='btn btn-danger btn-sm' onClick={()=> handleDelete(item._id)} >Reject</button></td>

                </tr>
              </tbody>
            )

          })}






        </table>
      </div>
    </div>
  )
}

export default RequestTask