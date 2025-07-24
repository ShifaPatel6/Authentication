const { verify } = require('jsonwebtoken');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
       name: { type: String, required: true },
       email: { type: String, required: true, unique: true },
       password: { type: String, required: true },
       mobile: { type: String, required: true },
       verify: {
              type: Boolean,
              default: false
       },
       otp: {
              type: Number,
       },
       otpExpiry: {
              type: Date,
       },
});

module.exports = mongoose.model('user', userSchema);
