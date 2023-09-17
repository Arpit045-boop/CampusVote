import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Carousal from '../Components/Carousal'
import PostCard from '../Components/PostCard'

function Home() {
  const[postData,setPostData] = useState(null);
  const getResponse = async ()=>{
    const fetch_postData = await fetch("https://kaskalskal.onrender.com/api/getPost");
    // console.log(img);
    setPostData(await fetch_postData.json());
  }
  useEffect(()=>{
    getResponse();
  },[postData])
  return (
    
    <div>
    <Navbar/>
    <Carousal/>
    <div className='my-3'>
      <h2>
        Candidates Post
      </h2>
    </div>
    {postData && postData.map((item, index) => {
          return (
              <PostCard name={item.candidate} partyname={item.partyName} slogan={item.slogan} desc={item.desc} img={item.img} isUpvote={false}/>
            )

          })}
    </div>
  )
}

export default Home