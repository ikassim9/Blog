const express = require('express');

const app = express();

app.get('/', (req, res) => {
   res.send('Welcome') 
});

app.listen(3000, function () {
   console.log(`Express server listening at http://localhost:3000`);
});