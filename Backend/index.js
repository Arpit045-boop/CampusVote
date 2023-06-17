const express = require('express');

const app = express();


app.get('/',(req,res)=>{
    res.send("Hello Campus Vote project")
})

app.listen(8000,console.log("server is started"))
