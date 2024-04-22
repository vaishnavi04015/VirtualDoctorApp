const doctor = require('../models/doctor-registration-schema');
const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const docLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isDoctor = await doctor.findOne({ email });

    if (!isDoctor) {
      res.status(401).json({ msg: 'Doctor does not exist' });
    } else {
      const isPassCorrect = await bcrypt.compare(password, isDoctor.password);
      console.log(isPassCorrect);

      if (!isPassCorrect) {
        res.send('Invalid Credentials');
      } else {
        const token = jwt.sign(
          {
            email
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: '1d',
          }
        );

        res.status(200).json({
          msg: 'Doctor Logged In Successfully',
          token,
         email: email,
         name: isDoctor.name,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { docLogin };
