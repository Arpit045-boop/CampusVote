const express = require('express');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require("../models/Users");

const jsonwebtoken = require('jsonwebtoken');
const bcryptjs = require('bcrypt');

const jwtSecret =  "asdfghjklzxcrt";

router.get("/getUserData",async(req,res)=>{
    try{
        const userData = await User.find({});
        if(userData){
            res.send(userData);
        }
        else{
            res.status(404).json({message:"Error found"});
        }
        
    }
    catch(error){
        res.status(404).json({message:error});
    }
    

})

router.post("/createUser",[
    body('email').isEmail(),
    body('password').isLength({min:5})
],
    async (req,res)=>{
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()});
        }
        const salt = await bcryptjs.genSalt(10);
        const secPassword = await bcryptjs.hash(req.body.password,salt);
        try{
            await User.create(
                {
                    username:req.body.username,
                    email: req.body.email,
                    name: req.body.name,
                    dateOfBirth: req.body.dateOfBirth,
                    password : secPassword,
                    isVoter : req.body.isVoter,
                    createdAt: new Date().now,
                    isCandidate:false
                }
            )
            res.json({success:true})
        }
        catch(error){
            console.log(error);
            res.send({success:false});
        }
    })

router.post("/loginUser",[
    body('email').isEmail(),
    body('password').isLength({min:5})
    ],
    async (req,res)=>{
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()});
        }
        
        let email = req.body.email;
        try{
            const userData = await User.findOne({email});
            if(!userData){
                return res.status(400).json({error:"Please check your credential"});
            }

            const passCompare = await bcryptjs.compare(req.body.password , userData.password);
            if(!passCompare){
                return res.status(400).json({error:"Please check your credential"});
            }

            
            const data = {
                user:{
                    id:userData.id
                }
            }

            const authToken = jsonwebtoken.sign(data,jwtSecret)
            
            return res.send({success:true,authToken:authToken})

        }
        catch(error){
            console.log(error);
            res.json({success:false})
        }
    }

    )

router.post("/loginAdmin",[
    body('email').isEmail(),
    body('password').isLength({min:5})
    ],
    async (req,res)=>{
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()});
        }
        let arr=[];
        let userData = {};
        let email = req.body.email;
        try{
            AdminData.map((data,index)=>{
                arr.push(data.email);
            })
            if(!arr.includes(email)){
                return res.status(400).json({error:"Please check credentials"});
            }
            AdminData.map((data,index)=>{
                if(data.email === email){
                    userData = data;
                }
            })
            
            // console.log(userData.password);
            // console.log(req.body.password);

            if(! (userData.password === req.body.password)){
                // console.log(userData.password);
                return res.status(400).json({error:"Please check credentials"});
            }
            const data = {
                AdminData:{
                    id:AdminData._id
                }
            }
            const authToken = jsonwebtoken.sign(data,jwtSecret)
            // console.log(authToken);
            return res.send({success:true,authToken:authToken})
            
            

        }
        catch(error){
            console.log(error);
            res.json({success:false})
        }
    }

    )
    
router.patch('/updateUser',async(req,res)=>{
    try{
        // const isCandidate = true;
        User.findOneAndUpdate(
            {name: req.body.name},
            {isCandidate: true},
        ).then(
            (result)=>{
                res.json(result)
            }
        )
    }
    catch(error){
        res.status(404).json({message:error})
    }
})
module.exports = router