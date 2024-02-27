const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, enum: ['M', 'F'], required: true },
  courses: [String],
  file: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
