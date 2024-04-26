const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
const userBookings = require('../models/userBookings.js');

router.post("/addBooking", async (req,res)=>{
    let {name,email,doctorEmail,date,time,meetingId,docName,expertise,sta,reason}=req.body
    await userBookings.create({ name,email,doctorEmail,dnt:{date,time},meetingId,docName,expertise,sta,reason});
    res.send("Booking done");
})

router.get("/getBooking/:email",async(req,res)=>{
    let email= req.params.email;
    let data = await userBookings.find({email:email})
    res.send(data)
})

router.patch("/cancelBooking",async(req,res)=>{
    let {email,doctorEmail,date,time,reason} = req.body;
    let data = await userBookings.find({$and:[{email:email},{doctorEmail:doctorEmail}]});
    let searchData= data.filter((temp)=>temp.dnt.date===date && temp.dnt.time===time);
    searchData[0].sta="Cancelled";
    searchData[0].reason=reason;
    searchData[0].meetingId="";
    await userBookings.findByIdAndUpdate(searchData[0]._id,searchData[0]);
    res.send("Booking cancelled")
})

router.patch("/updateBooking",async(req,res)=>{
    let {_id} = req.body;
    let updateData = await userBookings.find({$and:[{_id:_id},{sta:"Upcomming"}]})
    if(updateData.length>0)
    {
        updateData[0].sta="Completed";
        await userBookings.findByIdAndUpdate(_id,updateData[0]);
        res.send("Connected with doctor")
    }
    else
    {
        res.send("Could not connect with doctor")
    }
})

router.get("/getDoctorBooking/:email",async(req,res)=>{
    let email= req.params.email;
    let data = await userBookings.find({doctorEmail:email})
    res.send(data)
})


module.exports = router