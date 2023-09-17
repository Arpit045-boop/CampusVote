import React, { useState,useEffect } from 'react'

function Voters() {
  const [userData,setUserData] = useState(null);
  const getResponse = async () => {
    const fetch_userData = await fetch("https://kaskalskal.onrender.com/api/getUserData"); 
    setUserData(await fetch_userData.json());
  }
  useEffect(() => {
    getResponse();
  }, [])

  return (
    <div>
      <div className='d-flex'>
      <h4 className='mt-3 mx-3' style={{"textAlign":"left"}}>
        Voters List
      </h4>
      </div>
      
      {/* Main grid */}
      <div className='m-3 py-3'>
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">VoterId</th>            
              </tr>
            </thead>

            
            
              {userData && userData.map((item,index)=>{
                return(
                  <tbody>
                  <tr>
                    <th scope="row">{index+1}</th>
                    <td>{item.name}</td>
                    <td>{item.voterId}</td>
                  </tr>
                  </tbody>
                )
              })}
                  
            


          </table>
        </div>
      

    </div>
  )
}
export default Voters