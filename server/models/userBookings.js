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
  meetingId:{
    type:String,
  },
  docName:{
    type:String,
  },
  expertise:{
    type:String,
  },
  sta:{
    type:String,
  },
  reason:{
    type:String
  },
});

module.exports = mongoose.model('userBookings', userBookings);
