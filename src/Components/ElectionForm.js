import React, { useState } from 'react'
import Navbar from './Navbar'

function ElectionForm() {
    const[electionData,setElectionData] = useState({name:"",startdate:"",enddate:""});
    const handleChange = async(event)=>{
        setElectionData({...electionData , [event.target.name]:event.target.value});
    }    
    const handleSubmit = async(event)=>{ 
        event.preventDefault();
        const response = await fetch("http://localhost:8000/api/createElection",{
            method:"POST",
            headers:{
            'Content-Type': 'application/json'  
            },
            body: JSON.stringify(
                {
                    name: electionData.name,
                    startdate:electionData.startdate,
                    enddate:electionData.enddate
                }
            )

        }
        
        );
        const resp = await response.json();
        console.log(resp); 
        if(!resp.success){
            alert("Enter valid details");
        }
        if(resp.success){
            alert("Elections add successfully");
        }
    }
    return (
        <div>
            <Navbar/>
            <h3 className='mt-3'>
                Create the New Election
            </h3>
            <form className='container' onSubmit={handleSubmit}> 
            <div className="mb-3" >
                <label for="exampleInputEmail1" className="form-label">Election Name</label>
                <input type="text" className="form-control" style={{width:""}} name='name' value={electionData.name}
                onChange={handleChange}
                />
            </div>
            <div className='row'>
                <div className='col-6'>
                <div className="mb-3">
                <label for="" className="form-label">Start Date</label>
                <input type="date" className="form-control" name='startdate' value={electionData.startdate}
                onChange={handleChange}
                />
            </div>

                </div>
                <div className='col-6'>
                <div className="mb-3">
                <label for="" className="form-label">Last Date</label>
                <input type="date" className="form-control" name='enddate' value={electionData.enddate}
                onChange={handleChange}
                />
            </div>

                </div>
            </div>
            
            <button type="submit" className="btn btn-success">Add Election</button>
        </form>
        </div>
    )
}

export default ElectionForm