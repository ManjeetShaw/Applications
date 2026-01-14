const express = require ('express');
const{connectToMongoDB} = require('./connect');
const app = express();

const PORT = 3000;
const path = require('path');

//required Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//import Routes
const staticRoutes = require('./routes/staticRouter');
const userRoute = require('./routes/user');

connectToMongoDB("")
    .then(() => console.log("mongoDB connected"));
//setEJS
app.set('view engine', 'ejs');
app.set('views',path.resolve('./view'));    

app.use('user', userRoute);
app.use('/',staticRoutes);
app.listen (PORT, console.log("PORT started at 3000"));

