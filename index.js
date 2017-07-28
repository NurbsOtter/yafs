'use strict';

const express = require('express');
const models = require('./models');
var routes = require('./routes');
const bodyParser = require('body-parser');
const app = express();

app.get("/",(req,res)=>{
	res.send("Hello world!");
});
app.use(bodyParser.json())
app.use("/api",routes);
app.listen(3000,()=>{
	console.log("Listenin!");
});