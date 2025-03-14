const express = require('express');
const routes = require("./routes/authRouter.js")
const AuthRouter = require('./routes/user-AuthRouter.js')
const docAuth = require('./routes/doc-Routes.js')
const schedule = require("./routes/Schedule.js")
const userBookings = require('./routes/userBookingRoutes.js');
const prescription = require('./routes/PrescriptionRoutes.js');
require("./db/conn.js")
var cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;
app.use(routes);

app.use(cors({ origin: "https://virtualdoctorapp.netlify.app" }));


var corsOptions = {
    origin: 'http://127.0.0.1:5173',
    methods: "GET , POST, DELETE, PUT, PATCH, HEAD",
    credentials: true,
  }
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())


app.use('/auth',AuthRouter)
app.use('/docauth',docAuth)
app.use('/Booking',userBookings)
app.use('/pres',prescription)
app.use(schedule)
app.listen(PORT,(e)=>{
    if (!e) {
        console.log(`Server running on ${PORT}`);
    }else{
        console.log(e);
    }
})

