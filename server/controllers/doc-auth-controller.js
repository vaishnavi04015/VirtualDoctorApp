const doctor = require('../models/doctor-registration-schema');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const docLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isDoctor = await doctor.findOne({ email });

    if (!isDoctor) {
      res.status(401).json({ msg: 'Doctor dont exists' });
    } else {
      const isPasscorrect = await bcrypt.compare(password, isDoctor.password);
      console.log(isPasscorrect);
      if (!isPasscorrect) {
        res.send('INVALID CERD');
      } else {
        const token = jwt.sign(
          {
            email: email,
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: '1d',
          }
        );
        const response = {
          email,
          token,
        };
        res.status(200).json({ msg: 'Doc Successful', response });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { docLogin };
