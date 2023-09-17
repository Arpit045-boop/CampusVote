import React, { useEffect, useState } from 'react'

function PostCard(props) {
    const[upvote,setUpvote] = useState(0);
    const [candidateData, setCandidateData] = useState(null);
    const[partyName,setPartyName]= useState("");
    const handleclick = ()=>{
        setUpvote(upvote+1)
    }


    const getResponse = async ()=>{
        const fetch_candidateData = await fetch("https://kaskalskal.onrender.com/api/getCandidateData");
        setCandidateData(await fetch_candidateData.json());
    }

    useEffect(()=>{
        getResponse();
    },[])

    setTimeout(() => {
        const candidateObj = candidateData && candidateData.find(obj=> obj.name === props.name);
        // console.log(candidateObj);
        if(candidateObj){
            setPartyName(candidateObj.party);
        }
        else{
            console.log("No candidate found");
        }
    }, 1000);
    
    return (

    <div className='container my-3 mt-3 p-3' style={{backgroundColor:"violet",width:"500px", minHeight:"700px"}}>
        <h1>{props.name}</h1>
        <hr/>
        <h4 className='my-3 mt-3' style={{textAlign:"left"}}>Party Name: {partyName}</h4>
        <h4 className='my-3 mt-3' style={{textAlign:"left"}}>Slogan: {props.slogan}</h4>
        <img className='my-3 mt-3' style={{width:"300px",height:"300px"}} src={props.img}/>
        
        <p className='my-3 mt-3' style={{textAlign:"left", color:"blue",fontWeight:"bold"}}>Thoughts: {props.desc}</p>
<hr/>
{props.isUpvote ? 
    <div style={{display:"flex",alignItems:"center",marginTop:"50px"}}>
<button onClick={handleclick}>Upvote</button>
<span style={{marginLeft:"10px"}}>{upvote}</span>
</div>:""
}

    </div>
  )
}

export default PostCard