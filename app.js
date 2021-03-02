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
app.post('/test',(req,res)=>{
    console.log(req.hostname);
    console.log(req.headers);
    
    res.send({"data":{"header":req.headers, "body":req.body,"req":req})
})

app.post('/contact',(req,res)=>{
  console.log(req.body);
  res.render("contact");
})
//==========================================
const listener = app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port "+listener.address().port);
  });
//==========================================

  //url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=";



/* getData().then((res)=>{  
   /*  const randInt = Math.floor(Math.random()*res.data.photos.length);
    console.log(randInt) */
/*     console.log(res.data)
    img.src = res.data.url;
    textOutput.innerText = res.data.explanation;
    title.innerText = `NASA APOD - Picture of the Day - ${res.data.date}` */

   /*  console.log( res.data.photos[randInt] )
    const data = res.data.photos[randInt];
    textOutput.innerText =  data.earth_date;
    img.src =  data.img_src */
//})  

async function getNasaData(){
    url = "https://api.nasa.gov/planetary/apod?api_key=";
    nasa_APIkey = "4SbNxnRamTklkbyrTDTxVP3TutMdM1PnUDAlBwyC"  
    const res = await axios.get(url+nasa_APIkey, headers={'Content-Type':'application/json',"Accept":"application/json"});
    return res.data
}
//console.log( getNasaData() )