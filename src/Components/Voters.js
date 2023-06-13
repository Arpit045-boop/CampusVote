import React from 'react'

function Voters() {
  return (
    <div>
      <h2 className='my-2 mx-3' style={{"textAlign":"left"}}>
        Voters List
      </h2>
      {/* Main grid */}
      <div className='m-3 py-3' style={{"backgroundColor":"silver"}}>
      <div className='row my-3'>
        <div className='col'>
          <h5>Firstname</h5>
        </div>
        <div className='col'>
        <h5>Lastname</h5>
          
        </div>
        <div className='col'>
          <h5>VoterId</h5>
        </div>
        <div className='col'>
          <h5>Photo</h5>
        </div>
      </div>

      <div className='row my-3'>
        <div className='col'>
          <h5>Asdf</h5>
        </div>
        <div className='col'>
        <h5>sds</h5>
          
        </div>
        <div className='col'>
          <h5>12121ded</h5>
        </div>
        <div className='col'>
          <h5>Photo</h5>
        </div>
      </div><div className='row my-3'>
        <div className='col'>
          <h5>dede</h5>
        </div>
        <div className='col'>
        <h5>cdcdc</h5>
          
        </div>
        <div className='col'>
          <h5>21212cdc</h5>
        </div>
        <div className='col'>
          <h5>Photo</h5>
        </div>
      </div><div className='row my-3'>
        <div className='col'>
          <h5>Firstname</h5>
        </div>
        <div className='col'>
        <h5>Lastname</h5>
          
        </div>
        <div className='col'>
          <h5>VoterId</h5>
        </div>
        <div className='col'>
          <h5>Photo</h5>
        </div>
      </div>
      </div>
      

    </div>
  )
}

export default Voters