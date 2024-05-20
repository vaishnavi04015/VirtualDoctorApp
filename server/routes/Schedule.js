const express = require('express');
const router = express.Router();
const doctorSchedule= require("../models/doctorSchedule.js");
const cors = require("cors");
const { route } = require('./userBookingRoutes.js');
require("../db/conn.js")
// router.use(express.urlencoded({ extended: true }));
router.use(express.json())
router.use(cors())

router.post("/createSchedule",async(req,res)=>{

    let {name,email,date,time}=req.body
    let data=await doctorSchedule.findOne( {$and : [ {email : email} , {"dnt.date" : date} ] } );
    
    if(data)
    {
        let selectedtime = time.filter((t)=>{
            return !data.dnt.time.some((temp)=> temp.t === t.t);
        })
        data.dnt.time = data.dnt.time.concat(selectedtime);
        await doctorSchedule.findByIdAndUpdate(data._id,data);
    }
    else
    {
        await doctorSchedule.create({ name,email,dnt:{date,time}});
    }

    res.send("schedule added");
})

router.get("/getSchedule/:email",async(req,res)=>{
    let email=req.params.email;
    let data=await doctorSchedule.find({email:email})
    res.send(data)
})

router.patch("/scheduleStatus", async (req,res) => {
    let {email,date,time} = req.body;
    let data = await doctorSchedule.find({$and:[{email:email},{"dnt.date":date}]})
    let schedule=data[0].dnt.time.map((temp)=>{
        if(temp.t===time)
        {
            temp.booked = true
            return temp;
        }
        else
        {
            return temp;
        }
    });
    data[0].dnt.time=schedule;
    await doctorSchedule.findByIdAndUpdate(data[0]._id,data[0]);
    res.send("booking updated")
})

module.exports = router;