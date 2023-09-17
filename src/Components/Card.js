import React, { useEffect, useState } from 'react'
import "./Card.css"
function Card(props) {

    const [ value, setValue] = useState("");
    const handleChange = (e)=>{
        setValue(e.target.value);
        // console.log("Child",value);

        e.preventDefault();
    }
    useEffect(() => {
        // Execute the callback when the value changes
        value && props.parentCallback(value,props.electionName);

      }, [value, props]);
        
    
    

    return (
        <div className='card'>
            <h4>
                {props.electionName}
            </h4>
            <hr />
            <h5>
                Select only one candidate
            </h5>


            {
            props.candidateName && props.candidateName.map((item,index)=>{
                return (
                    <div className='row my-3 mt-3'>
                    <div className='col-4' style={{width:"80px",paddingTop:"10px"}}>
                        <input className="form-check-input" type="radio" name="exampleRadios" id="" value={item} onChange={handleChange}/>
                    </div>
                    <div className='col-4'>
                       <h2>
                        {item}   
                       </h2>
                    </div>
                </div>
                )
            })
            }
            

        </div>
    )
}

export default Card