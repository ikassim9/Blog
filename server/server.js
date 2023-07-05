require('dotenv').config();

const express = require('express');
const usersRoute = require('./routes/users');
const app = express();
const connectToDb = require('./config/db-config');

connectToDb(); 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/users', usersRoute);



app.get('/', (req, res) => {
   res.send('Home');

});


app.listen(80, function () {
   console.log(`Express server listening at http://localhost:80`);
});



