const express = require('express');
const AuthController = require('../controllers/user-auth-controller')
const router = express.Router();
const fsPromises = require("fs/promises");
const docSchema= require("../models/doctor-registration-schema.js");
const cors = require("cors");
require("../db/conn.js")
// router.use(express.urlencoded({ extended: true }));
router.use(express.json())
router.use(cors())

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../frontend/public/Doctordetails');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname+'-'+uniqueSuffix+file.originalname)
  }
})

const upload = multer({ storage: storage })

router.post("/docSubmit",upload.fields([{name:"photo"},{name:"license"},{name:"degree"}]),async(req,res)=>{
  try
  {
    const { name, email,phone,password,expertise,experience,address,gender} = req.body;
    const license = req.files["license"][0].filename;
    const photo = req.files["photo"][0].filename;
    const degree = req.files["degree"][0].filename;
    await docSchema.create({ name,email,phone,password,degree,license,expertise,experience,address,gender,photo});
    res.send("Data Submitted successfully");
  }
  catch(e)
  {
    console.log(e);
  }
})

router.get("/docDetails",async(req,res)=>{
  let data = await docSchema.find();
  res.send(data);
})

router.patch("/docVerfication",async(req,res)=>{
   let {email}= req.body;
   let data = await docSchema.findOne({email:email});
   await docSchema.findByIdAndUpdate({_id:data._id},{$set:{verified:true}})
   res.send("Accepted")
})

router.delete("/docDelete/:email",async(req,res)=>{
  let email= req.params.email;
  let data = await docSchema.findOne({email:email});
  await fsPromises.unlink(`../frontend/public/Doctordetails/${data.photo}`);
  await fsPromises.unlink(`../frontend/public/Doctordetails/${data.degree}`);
  await fsPromises.unlink(`../frontend/public/Doctordetails/${data.license}`);
  await docSchema.findByIdAndDelete({_id:data._id});
  res.send("Deleted");
})
// router.post('/register',AuthController.register)

module.exports = router;




