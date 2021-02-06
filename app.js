//==========================================
//      DEPENDENCIES AND IMPORTS
//==========================================
require('dotenv').config();
const ejs = require('ejs');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
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
})
app.post('/',(req,res)=>{
    console.log(req);
    res.redirect("/");
})
app.post('/contact',(req,res)=>{
  console.log(req);
  res.render("contact");
})
//==========================================
const listener = app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port "+listener.address().port);
  });
//==========================================


//==========================================
//          FUNCTIONS
//==========================================

  //==========================================