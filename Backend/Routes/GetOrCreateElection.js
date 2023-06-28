const express = require('express');

const router = express.Router();

router.get("/getElectionData",async(req,res)=>{
    try{
        res.send(ElectionData);
    }
    catch(error){
        console.log("Error---",error);
    }
})

router.post("/createElection",async(req,res)=>{
    try{
       await fetched_election_data.insertOne(
        {
            name: req.body.name,
            startdate:req.body.startdate,
            enddate: req.body.enddate
        }
       )
       res.json({success:true}) 
    }
    catch(error){
        res.status(404).json({message:error});
        console.log(error);
    }
})



module.exports = router