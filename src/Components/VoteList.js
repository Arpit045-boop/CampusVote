import React, { useEffect, useState } from 'react'

function VoteList() 
{
    const [voteData, setVoteData] = useState(null);
    const getResponse = async () => {
      const fetch_voteData = await fetch("http://localhost:8000/api/getVotes");
      setVoteData(await fetch_voteData.json());
    //   console.log(voteData);
    }
    useEffect(() => {
      getResponse();
    }, [])
  
    return (
      <div>
        <div className='d-flex'>
        <h4 className='mt-3 mx-3' style={{"textAlign":"left"}}>
          Vote list
        </h4>
        </div>
        
        {/* Main grid */}
        <div className='m-3 py-3'>
            <table className="table table-success table-striped">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Candidate Name</th>
                  <th scope="col">Election Name</th>
                  <th scope="col">Voter Name</th>            
                </tr>
              </thead>
  
              
              
                {voteData && voteData.map((item,index)=>{
                  return(
                    <tbody>
                    <tr>
                      <th scope="row">{index+1}</th>
                      <td>{item.candidate}</td>
                      <td>{item.position}</td>
                      <td>{item.voterName}</td>
                    </tr>
                    </tbody>
                  )
                })}
                    
              
  
  
            </table>
          </div>
        
  
      </div>
    )
  }

export default VoteList