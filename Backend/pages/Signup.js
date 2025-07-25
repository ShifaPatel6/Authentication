const mongoose = require('mongoose');
const dotenv = require('dotenv')
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../UserSchema')
const router = express.Router();

require('dotenv').config();

//Signup API

router.post('/signup', async (req, res) => {
       const { name, email, password, mobile } = req.body;
       try {
              // Check if user exists
              const existingUser = await User.findOne({ email });
              if (existingUser) return res.status(400).json({ message: 'Email already registered' });
              const hashedPassword = await bcrypt.hash(password, 10);

              //Create User

              const user = new User({ name, email, password: hashedPassword, mobile });
              await user.save();
              res.status(201).json({ message: 'User created successfully' });
       } catch (err) {
              res.status(500).json({ error: err.message });
       }

})


//Login API 

router.post('/Login', async (req, res) => {

       const { email, password } = req.body;
       try {
              //Find User
              const user = await User.findOne({ email });
              if (!user) res.status(400).json({ message: 'Invalid Credentials' });

              //Compare password

              const isMatch = await bcrypt.compare(password, user.password);
              if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

              // Generate token
              const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

              res.status(200).json({ token, message: 'Login successful' });
       } catch (err) {
              res.status(500).json({ error: err.message });
       }
})
router.put('/update-email', async (req, res) => {
       const { oldEmail, newEmail } = req.body;

       try {
              // Find the user by old (wrong) email
              const user = await User.findOne({ email: oldEmail });
              console.log("update reach");


              if (!user) {
                     return res.status(404).json({ message: "Old email not found" });
              }

              // If already verified, don't allow change
              if (user.verified) {
                     return res.status(400).json({ message: "Email already verified. Cannot change." });
              }

              // Update the email
              user.email = newEmail;
              await user.save();

              return res.json({ message: "Email updated successfully" });
       } catch (err) {
              console.error("Error updating email:", err);
              return res.status(500).json({ message: "Server error" });
       }
});

module.exports = router;