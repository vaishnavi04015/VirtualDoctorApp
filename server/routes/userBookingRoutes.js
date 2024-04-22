const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
const userBookings = require('../models/userBookings.js');

router.post("/addBooking", async (req,res)=>{
    let {name,email,doctorEmail,date,time}=req.body
    await userBookings.create({ name,email,doctorEmail,dnt:{date,time}});
    res.send("Booking done");
})


module.exports = router