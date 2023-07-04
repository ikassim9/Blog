require('dotenv').config();
const mongoose = require("mongoose");

const connectToDb = async () => {

    await mongoose.connect(process.env.DB_STRING)
    .then(() => console.log('Connected!'))
    .catch(err => {console.log(err)});
 }

 module.exports = connectToDb; 