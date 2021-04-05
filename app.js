//==========================================
//      DEPENDENCIES AND IMPORTS
//==========================================
require('dotenv').config();
const ejs = require('ejs');
const express = require('express');
//const bodyParser = require('body-parser');
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
app.use(express.json());
//app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//app.use(bodyParser.json())
//==========================================


//==========================================
//               ROUTES
//==========================================
app.get('/',(req,res)=>{
    res.render('index'); 
})
app.post('/',(req,res)=>{
    res.redirect('/');
})
app.get('/test',(req,res)=>{
    res.send( getRandomNasaImage() );
})
app.get('/contact',(req,res)=>{
  res.render('contact');
})
app.post('/contact',(req,res)=>{
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

async function getRandomNasaImage(){
    url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=";
    nasa_APIkey = process.env.NASA_API_KEY;
    const res = await axios.get(url+nasa_APIkey, headers={'Content-Type':'application/json',"Accept":"application/json"});
    return res.data
}
//console.log( getNasaData() )


//URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key="
//img = re['photos'][0]['img_src']
