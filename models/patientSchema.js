const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  medicalIssue: {
    type: String,
    required: true
  },
  pastTreatmentHistory: {
    type: String
  },
  state: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
