const express = require('express');
const cp = require('cookie-parser');
const bp = require('body-parser');
require('dotenv').config(); 
//reads in configuration from a .env file
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5050;
const dbPort = process.env.DB_PORT || 27017;
const dbUrl = process.env.DB_URL || "localhost";
const dbCollection = process.env.DB_COLLECTION || "auth-test";
//sets the required variables from Environment Variables.
// mongoose.set('useCreateIndex', true);
//fixes an issue with a depricated default in Mongoose.js

// mongoose.connect(`mongodb://${dbUrl}/${dbCollection}`, {useNewUrlParser: true})
//        .then(_ => console.log('Connected Successfully to MongoDB'))
//        .catch(err => console.error(err));
app.use(passport.initialize());
//initializes the passport configuration.
require('./passport/passport-config')(passport);
//imports our configuration file which holds our verification callbacks and things like the secret for signing.
app.use(cp());
app.use(bp.urlencoded({extended: false}))
app.use(bp.json());
app.use(cors())
//custom Middleware for logging the each request going to the API
app.use((req,res,next) => {
      next();
});
app.get('/',(req,res)=>{
    res.send('Server running')
})
app.use('/users', require('./routes'))
//registers our authentication routes with Express.
app.listen(port, err => {
    if(err) console.error(err);
    console.log(`Listening for Requests on port: ${port}`);
});