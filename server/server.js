const express = require('express');
const routes = require("./routes/authRouter.js")
require("./db/conn.js")
const app = express();
const PORT = 5000;
app.use(routes);

app.listen(PORT,(e)=>{
    if (!e) {
        console.log(`Server running on ${PORT}`);
    }else{
        console.log(e);
    }
})