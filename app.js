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
app.use(express.urlencoded({
  extended: true
}));
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
  
  Steps.find({name:"Steps"}, (err, foundSteps) => {
    if (err) {
      console.log(`Error on Route / finding steps: ${err}`);
      res.render('index',{
        steps_count: ""
      })
    } else {
      const s = String(Math.round( foundSteps[0]['steps']));
      console.log(`GET Route: Found ${s} steps!`);
      res.render('index',{
        steps_count:s
      })
    }
  })
    
})
app.get('/apis',(req,res)=>{
  res.render('apis',{randomImage:"",statusText:"set a date and click the button!",imgCollection:"",imgNr:""})
})
app.post('/apis',(req,res)=>{
  console.log(req.body.requestDate);
 
  const requestDate = req.body.requestDate;
  const config = {
    'url': `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${requestDate}&api_key=${process.env.NASA_API_KEY}`,
    'method': 'get'
  };
  axios(config).then((response)=>{
    console.log((response.data.photos ? response.data.photos: []));
    const pictures = (response.data.photos ? response.data.photos: []);
    const picturesArray = [];
    if (pictures.length !== 0){
    for (pic in pictures){
      picturesArray.push(pictures[pic].img_src);
    }
    const randInt = Math.floor(Math.random()*pictures.length);
    console.log("random number: ",randInt);
    console.log("length of picture array: ", pictures.length);
    const randomImg = pictures[randInt].img_src;
    console.log("url of the randomImage: ",randomImg);
    res.render('apis',{randomImage:randomImg,statusText:requestDate,imgCollection:picturesArray,imgNr:randInt});
  }else{
    res.render('apis',{randomImage:"",statusText:`Sorry no pictures found for ${requestDate}!`,imgCollection:picturesArray,imgNr:""});
  }
  }).catch((error)=>{
    console.log(error);
    res.render('apis',{randomImage:"",statusText:requestDate,imgCollection:pictures,imgNr:randInt})
  })
})
app.get('/3dp',(req,res)=>{
  res.render('3dp');
});
app.get('/contact',(req,res)=>{
  res.render('contact');
})
app.post('/contact',(req,res)=>{
  res.render("contact");
})

app.post('/appleHealthData',(req,res)=>{
  if (req.headers.authorization === "Bearer "+process.env.WHSECRET){ 
    res.sendStatus(200);
    const appleHealthData = req.body;
    
  if( appleHealthData.data ){
    if(appleHealthData.data.metrics){
    try{
      
      const steps = String(Math.round(appleHealthData.data.metrics[10].data[0].qty));
      console.log(JSON.stringify(req.body));
    
    Steps.findOneAndUpdate({
      'name': "Steps"
    }, {
      steps: steps
    }, {
      upsert: true
    },
    (err, steps) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Successfully Upsert Steps to ${steps["steps"]}!`);
      }
    })
    }catch(e){
      const errorMsg = e.name + " " + e.message;
      console.log(errorMsg);
    }
  }else{
    console.log("No Data property!")
  }}else{
    console.log("No Data.metrics property!")
  }
   }else{
    res.sendStatus(403);
  }})
//==========================================
const listener = app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port "+listener.address().port);
  });