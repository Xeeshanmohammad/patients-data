const Patient = require('../models/patientSchema');
const asyncHandler = require("express-async-handler");

const registerPatient = asyncHandler(
    async (req, res) => {
        const { name, age, medicalIssue, pastTreatmentHistory, state, phone, email } = req.body;
      
        try {
          const newPatient = new Patient({
            name,
            age,
            medicalIssue,
            pastTreatmentHistory,
            state,
            phone,
            email
          });
         const savedPatient =  await newPatient.save();
      
          // Determine discount based on state
          let discount = 0;
          if (['Maharashtra', 'Rajasthan'].includes(state)) {
            discount = 0.5;
          } else if (['Karnataka', 'Tamil Nadu', 'Kerala'].includes(state)) {
            discount = 0.6;
          } else {
            discount = 0.4;
          }
      
          // Response with discount information
          res.json({success:true, 
            savedPatient,
            discount 
          });
        } catch (error) {
         throw new Error('Error registering patient:', error.message);
        }
      }
);

const getAllPatients = asyncHandler(async (req, res) => {
    try {
      const patients = await Patient.find({},'-discount')
      res.status(200).json({ patients, counts: patients.length });
    } catch (error) {
      throw new Error(error);
    }
  });

  const getSinglePatient = asyncHandler(async (req, res) => {
    try {
      const getpatient = await Patient.findById(req.params.id);
      res.status(201).json({ getpatient });
    } catch (error) {
      throw new Error("Something went wrong!", error);
    }
  });

  module.exports = {registerPatient, getAllPatients, getSinglePatient}
  