const express = require("express"); //importing "express"
const path = require("path");  //importing "path"
const app = express();  //creates express app
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/CustomerDB', {useNewUrlParser: true , useUnifiedTopology: true});    // creating database named as CustomerDB

const port = 5000;  

//define mongoose schema
const CustomerSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    text: String
});

//compiling mongoose schema into model
const CustomerDetails = mongoose.model('CustomerDetails', CustomerSchema);



// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())


// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory


// ENDPOINTS
app.get('/', (req, res)=>{ 
        
    res.status(200).render('index.pug');
})

app.post('/', (req, res)=>{ 
    var myData = new CustomerDetails(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Item is not saved");
    });    
    
})



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});