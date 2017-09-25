//load built in module helping in setting paths especially when going one folder up
const path = require('path');  //built in module, no need to install
const express = require('express');

const publicPath = path.join(__dirname, '../public');  //as public path is one folder up and then the public folder
const port = process.env.PORT || 3000;

var app = express();

//set root route to the public path
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
