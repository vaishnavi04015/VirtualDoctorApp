const express = require('express');
const routes = require("./routes/authRouter.js")
const AuthRouter = require('./routes/user-AuthRouter.js')
require("./db/conn.js")
const cors = require('cors');
const app = express();
const PORT = 5000;
app.use(routes);


var corsOptions = {
    origin: 'http://127.0.0.1:5173',
    methods: "GET , POST, DELETE, PUT, PATCH, HEAD",
    credentials: true,
  }
app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth',AuthRouter)
app.listen(PORT,(e)=>{
    if (!e) {
        console.log(`Server running on ${PORT}`);
    }else{
        console.log(e);
    }
})

