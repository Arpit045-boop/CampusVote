const mongoose = require('mongoose');
// Voters or students models
const candidateSchema = new mongoose.Schema({
  candidateId: {
    type: int,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  progress: {
    type: int,
    required: true
  },
  Name: {
    type: String,
    required: true
  },
  PhoneNo: {
    type: String,
    required: true
  },
  Status: {
    type: Boolean,
    required: true
  },
  
  dateOfBirth: {
    type: Date,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }

});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
