const mongoose = require('mongoose');
const User = require('./UserSchema');

const seedUsers = async () => {
       await mongoose.connect('mongodb+srv://shifapatel232002:Authetication06@authetication.dxis7sx.mongodb.net/');
       const users = [
              { name: 'Alice', email: 'alice@example.com', password: '1234', mobile: '8390160253' },
              { name: 'Bob', email: 'bob@example.com', password: 'abcd', mobile: '8390160253' },
       ];

       await User.insertMany(users);
       console.log('Sample users added');
       process.exit(1); //to exit immediately 
};

seedUsers();
