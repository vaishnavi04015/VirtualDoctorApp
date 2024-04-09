const express = require('express');
const router = express.Router();
const DoctorAuth = require("../controllers/doc-auth-controller")

router.post('/docLogin', DoctorAuth.docLogin);

module.exports = router;