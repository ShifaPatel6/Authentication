const express = require('express');
const cors = require('cors');
const connectDB = require('./Db.js');
const signupRoutes = require('./pages/Signup');
const otpRoutes = require('./pages/Sentemail.js');
const verifyOtp = require('./pages/VerifyEmail.js')

const app = express();

app.use(cors({
       origin: 'http://localhost:5173',
       credentials: true
}));

app.use(express.json());
connectDB();

// Route mounting
app.use('/', signupRoutes);
app.use('/', otpRoutes); // 
app.use('/', verifyOtp); // 


const port = 3000

app.listen(port, () => {
       console.log(`Server running at http://localhost:${port}`);

});




