const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    firebaseId: String,
})




module.exports = mongoose.model('User', userSchema);