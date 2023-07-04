const express = require('express');
const admin = require('../config/firebase-config');
const router = express.Router();
const User = require('../model/User');

router.post('/register', async (req, res) => {

   const userResponse = await admin.auth().createUser({
      email: req.body.email,
      password: req.body.password

   });
 
   const user = new User({ name: req.body.name, firebaseId: userResponse.uid });
   try {
      user.save();
       res.status(201).json(user);
       console.log(user);
   }
   catch (err) { 
      res.status(500).json({ message: err.message });

   }

  
}); 


router.get('/login', async (req, res) => {

   try {
      const users = await User.find();
      res.send({ users: users });
   }
   catch (err) {
      res.status(500).json({ message: err.message });
   }


});


module.exports = router;