const express = require('express');
require("./db/conn.js")
const app = express();
const PORT = 5000;



app.listen(PORT,(e)=>{
    if (!e) {
        console.log(`Server running on ${PORT}`);
    }else{
        console.log(e);
    }
})