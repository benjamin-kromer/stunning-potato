//==========================================
//      DEPENDENCIES AND IMPORTS
//==========================================
require('dotenv').config();
const ejs = require('ejs');
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
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
app.use(express.static("public"));
//==========================================


//==========================================
//           DATABASE CONNECTION
//==========================================
const url = "mongodb+srv://" + process.env.MDBUSR+":"+process.env.MDBPW + "@" + process.env.MDBCLUSTER + ".mongodb.net/" +process.env.MDBNAME;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Connected to remote DB!")
  })
  .catch((err) => {
    console.log("An Error occured logging after this: ");
    console.log(err);
  });
mongoose.set('useCreateIndex', true);
//==========================================


//==========================================
//        MONGOOSE SCHEMAS
//==========================================
const stepsCountSchema = new mongoose.Schema({
  name: String,
  steps: String
});
//==========================================


//==========================================
//          SCHEMA PLUGINS
//==========================================
stepsCountSchema.plugin(findOrCreate);
//==========================================


//==========================================
//          MONGOOSE MODELS
//==========================================
const Steps = new mongoose.model('Steps',stepsCountSchema);
//==========================================

//==========================================
//               ROUTES
//==========================================
app.get('/',(req,res)=>{
  console.log("First route.")
  Steps.find({name:"Steps"}, (err, foundSteps) => {
    if (err) {
      console.log(err);
      res.render('index',{
        steps_count: ""
      })
    } else {
      const stepscount = foundSteps[0]['steps'];
      console.log(stepscount);
      console.log(typeof stepscount);
      res.render('index',{
        steps_count:stepscount
      })
    }
  })
    
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
app.post('/appleHealthData',(req,res)=>{
  if (req.headers.authorization === "Bearer "+process.env.WHSECRET){ 
    res.sendStatus(200).end();
    const appleHealthData = req.body;
    const steps = appleHealthData.data.metrics[10].data[0].qty;
    Steps.findOneAndUpdate({
      'name': "Steps"
    }, {
      steps:steps
    }, {
      upsert: true
    },
    (err, order) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Successfully Upsert Steps to ${steps}!`);
      }
    })}else{res.sendStatus(403).end()}
 

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
