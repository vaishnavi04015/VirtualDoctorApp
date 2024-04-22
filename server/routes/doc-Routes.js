const express = require('express');
const router = express.Router();
const DoctorAuth = require("../controllers/doc-auth-controller")
const cors = require('cors');
router.use(cors());
router.post('/docLogin', DoctorAuth.docLogin);

module.exports = router;