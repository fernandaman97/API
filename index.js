const express= require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan= require('morgan');

const bodyParser= require('body-parser');

app.use(bodyParser.json())

const postRoute=require('./routes/post')

app.use('./servicios',postRoute);

mongoose.connect('mongodb+srv://Cluster0:0nXxBBanGlPnSzla@cluster1.sfuh05w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


app.listen(10000);
