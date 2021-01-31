//==========================================
//      DEPENDENCIES AND IMPORTS
//==========================================
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
//==========================================

//==========================================
//        GLOBAL VARIABLES
//==========================================
const app = express();
//==========================================


//==========================================
//     APP CONFIGURATIONS & SETTINGS
//==========================================
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(bodyParser.json())
//==========================================



//==========================================
//               ROUTES
//==========================================
app.get('/',(req,res)=>{
    res.render('index')

//==========================================
const listener = app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port "+listener.address().port);
  });
//==========================================