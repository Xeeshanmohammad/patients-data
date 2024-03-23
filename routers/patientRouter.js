const express = require("express");
const { registerPatient, getAllPatients, getSinglePatient } = require("../controllers/patients");
const router = express.Router()

router.post('/patientRegisteration', registerPatient);
router.get('/getAllPatients', getAllPatients);
router.get('/getPatient/:id', getSinglePatient);


module.exports = router