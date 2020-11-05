// Dependecies
var express = require("express");
var app = express();
var path = require("path"); 
var fs= require("fs");


var PORT= process.env.PORT||3000 ; 

// ---Json middlewere-- 12. express translator to json. 13. look for css. 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


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
        var dataToJason = JSON.parse(data); 
        console.log(dataToJason); 
        // return data
        res.json(dataToJason); 
    })
}); 

app.post("/api/notes",function(req,res)
  {

  }
 );

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
  
});



app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT)});
  