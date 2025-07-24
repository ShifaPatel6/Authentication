const mongoose = require('mongoose');

const connectDB = async () => {
       try {
              await mongoose.connect('mongodb+srv://shifapatel232002:Authetication06@authetication.dxis7sx.mongodb.net/');

              console.log('MongoDB Connected');
       } catch (error) {
              console.error('MongoDB connection failed:', error.message);

       }
};

module.exports = connectDB;
