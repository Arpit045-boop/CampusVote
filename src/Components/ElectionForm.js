import React, { useState } from 'react'
import Navbar from './Navbar'

function ElectionForm() {
    const [electionData, setElectionData] = useState({ name: "", startdate: "", enddate: "" });
    const handleChange = async (event) => {
        setElectionData({ ...electionData, [event.target.name]: event.target.value });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("https://kaskalskal.onrender.com/api/createElection", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    name: electionData.name,
                    startdate: electionData.startdate,
                    enddate: electionData.enddate,
                    candidateId: []
                }
            )

        }

        );
        const resp = await response.json();
        console.log(resp);
        if (response.ok) {
            alert("Elections add successfully");
        }
        if (!resp.success) {
            // alert("Enter valid details")
            // console.log(await resp.message.code);
            if(resp.message.code === 11000)
                alert("Duplicate Key Error");
            else{
                alert("Enter valid details")
            }
        }
        
    }
    return (
        <div>
            <Navbar />

            <h3 className='mt-3'>
                Create the New Election
            </h3>
            <form className='container electionForm ' onSubmit={handleSubmit}>
                <div className='divLabel'>
                <label for="exampleInputEmail1" className="form-label m-3">Election Name</label>
                <input type="text" className="form-control my-3" placeholder='Election Name' name='name' value={electionData.name}
                    onChange={handleChange}
                />
                </div>
                <div className='divLabel'>
                <label className="form-label m-3">Start Date</label>
                <input type="date" className="form-control my-3" name='startdate' value={electionData.startdate}
                    onChange={handleChange}
                />
                </div>
                <div className='divLabel'>
                <label className="form-label m-3" >End Date</label>
                <input type="date" className="form-control my-3" name='enddate' value={electionData.enddate}
                    onChange={handleChange}
                />
                </div>
                <button type="submit" className="btn btn-success my-3">Add Election</button>
            </form>
        </div>
    )
}

export default ElectionForm