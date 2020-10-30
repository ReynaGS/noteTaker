var express = require("express");
var app = express();
var path = require("path"); 
var fs= require("fs");

var PORT= 3000; 

// ---Json middlewere-- express translator to json. 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});
//respond with hard coded notes from db.json
app.get("/api/notes", function(req, res) {
    // create a variable to hold path
    var dbPath = path.join(__dirname, "db/db.json")
    //test to see if route is working
    console.log(dbPath);
    //read file ( 3 parameters. 1- Path, 2- "utf-8", 3- call back function with 2 params)
    fs.readFile(dbPath, "utf-8",function(error, data){
        //handle for error
        if(error){
            throw "Error"
        }
        //test if readFile is working
        console.log(data)
    })




}); 

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
  
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT)});
  