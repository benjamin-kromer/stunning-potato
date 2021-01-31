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
    console.log(req.body);
    sendEmail(req.body.email, req.body.message)
    .then((response)=>{console.log("Antwort: "+response)})
    .catch((err)=>{console.log("Fehler: "+err)})
    res.redirect("/");
})
//==========================================
const listener = app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port "+listener.address().port);
  });
//==========================================


//==========================================
//          FUNCTIONS
//==========================================
async function sendEmail(mail,msg){
    var config = {
      method: 'post',
      url : `https://api.sendgrid.com/v3/mail/send`,
      headers: {'Content-Type': 'application/json','Accept':'application/json','Authorization':`Bearer ${process.env.SEND_GRID_TOKEN}`},
      data: {
        personalizations: [{
                to: [{
                        email: mail
                    }]
            }],
        from: {
            email: mail
        },
        subject: "New Contact",
        content: [{
                type: "text/html",
                value: "msg"
            }]
    
    }}
    const promSendMail = axios(config);
    const sendGridMailres = await promSendMail;
    return sendGridMailres
  }
  //==========================================