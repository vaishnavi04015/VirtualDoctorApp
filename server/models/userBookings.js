const mongoose = require('mongoose');

const userBookings = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  doctorEmail: {
    type: String
  },
  dnt: {
    date: {
      type: String,
    },
   time:{
      type:String,
    }
  },
});

module.exports = mongoose.model('userBookings', userBookings);
