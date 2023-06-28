const express = require('express');

const router = express.Router();

router.get("/getCandidateData",async(req,res)=>{
    try{
        res.send(CandidateData);
    }
    catch(error){
        res.status(404).json({message:error})
    }
    
})


router.post("/createCandidate",async(req,res)=>{
    try{
        var electionId = [];
        const electionObj = ElectionData.find(obj=> obj.name === req.body.electionName);
        // console.log(electionObj);
        if(electionObj){
            electionId.push(electionObj._id);
            // console.log(electionId);
        }
        if(!electionObj){
            console.log("Error");
        }
       await fetched_candidate_data.insertOne(
        {
           name: req.body.userName,
           electionId: electionId,
           party:req.body.party
        }
       )
       res.json({success:true}) 
    }
    catch(error){
        res.status(404).json({message:error});
        console.log(error);
    }
})


module.exports = router;