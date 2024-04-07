const express = require('express');
const router = express.Router();
const doctorSchedule= require("../models/doctorSchedule.js");
const cors = require("cors");
require("../db/conn.js")
// router.use(express.urlencoded({ extended: true }));
router.use(express.json())
router.use(cors())

router.post("/createSchedule",async(req,res)=>{
    let {name,email,date,time}=req.body
    await doctorSchedule.create({ name,email,dnt:{date,time}});
    res.send("schedule added");
})

router.get("/getSchedule/:email",async(req,res)=>{
    let email=req.params.email;
    let data=await doctorSchedule.find({email:email})
    res.send(data)
})

module.exports = router;