const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(
    cors({
      origin: 'http://localhost:3000', // Replace with your frontend URL
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allow the necessary HTTP methods
      allowedHeaders: ['Content-Type', 'Authorization'], // Allow the necessary headers
    })
  );
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// })


mongoose.connect("mongodb://127.0.0.1:27017/CampusVote?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2", {useNewurlParser:true})
.then(
    async (result,err)  =>{
        try{
            console.log("Connected");

            const fetched_user = await mongoose.connection.db.collection("AdminData");
            global.fetched_election_data = await mongoose.connection.db.collection("ElectionData");
            global.fetched_candidate_data = await mongoose.connection.db.collection("CandidatesData");
            // console.log(fetched_user);
            fetched_user.find({}).toArray().then(
                async(adminData,err)=>{
                    try{
                        if(err){
                            console.log("Error ----",err);
                            return;
                        }
                        global.AdminData = adminData;
                        // console.log(adminData);
                    }
                    catch(err){
                        console.log(err);
                    }
                }
            )

            fetched_election_data.find({}).toArray().then(
                async (res,err)=>{
                    try{
                        if(err){
                            console.log("Error----",err);
                        }
                        else{
                            global.ElectionData = res;
                            
                        }
                    }
                    catch(error){
                        console.log(error);
                    }

                }
            )

            
            fetched_candidate_data.find({}).toArray().then(
                async (res,err)=>{
                    try{
                        if(err){
                            console.log("Error----",err);
                        }
                        else{
                            global.CandidateData = res;
                            // console.log(CandidateData);
                        }
                    }
                    catch(error){
                        console.log(error);
                    }

                }
            )
            
        }
        catch(err){
            console.log(err);
        }
        

    }
)



app.use(express.json())
app.use('/api',require("./Routes/UserAuth"))
app.use('/api',require("./Routes/GetOrCreateElection"))

app.use('/api',require("./Routes/GetOrCreateCandidate"))

app.listen(8000,console.log("server is started"))
