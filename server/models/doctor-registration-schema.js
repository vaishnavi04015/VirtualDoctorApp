const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    password: {
        type: String,
    },  
    degree:{
        type:String,
    },
    license:{
        type:String, 
    },
    expertise:{
        type:String,
    },
    experience:{
        type:Number,
    },
    address:{
        type:String,
    },
    gender:{
        type:String,
    },
    photo:{
        type:String,
    },
    verified:{
        type:Boolean,
        default: false
    }
})

module.exports = mongoose.model('doctor', doctorSchema);