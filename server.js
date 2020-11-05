// Dependecies
var express = require("express");
var app = express();
var path = require("path"); 
var fs= require("fs");
const { notEqual } = require("assert");


var PORT= process.env.PORT||3000 ; 

// ---Json middlewere-- 12. express translator to json. 13. look for css. 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

 // create a variable to hold path to db json
var dbPath = path.join(__dirname, "db/db.json")
//respond with hard coded notes from db.json
app.get("/api/notes", function(req, res) {
   
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
        // console.log(dataToJason); 
        // return data
        res.json(dataToJason); 
    })
}); 

  function saveNote(nota){
    
  const data = fs.readFileSync(dbPath, {encoding:'utf8', flag:'r'}); 
  
  // Display the file data 
    // convert to js object
  var noteList =  JSON.parse(data); 
  noteList.push(nota); 
    // console.log(noteList);
    // fs. waits for a string but in this case we need JSON string. 
  var noteListStr = JSON.stringify(noteList)  
  fs.writeFileSync(dbPath, noteListStr);
}

app.post("/api/notes",function(req,res)
  {
    var idDate = new Date().valueOf(); 
    // console.log(idDate); 
    // console.log(req.body); 
    // create note
    var newNote = {
      title : req.body.title, 
      text : req.body.text, 
      id : idDate
    }
    // save note
    saveNote(newNote); 

    //return  note client
    res.json(newNote); 
  }
 );
 function deleteNote(noteid){
   // get notes from db json - fs readfile. Return json string needs to be parse to 
   var dato = fs.readFileSync(dbPath, {encoding:'utf8', flag:'r'});
  //  console.log(dato); 
   var datoToOb = JSON.parse(dato); 
  //  console.log(datoToOb); 
   //iterate through array of notes, find where id ==== id to be delete
   for(var index=0; index < datoToOb.length; index= index+1)
    { 
      // console.log(index); 
      // variable to store and indexar id 
      var idIndex = datoToOb[index];
        // splice note from  with matching id
      if(noteid==idIndex.id)
         {
         datoToOb.splice(index,1); 
         } 
    }
    var upDatoOb = JSON.stringify(datoToOb);
    fs.writeFileSync(dbPath, upDatoOb); 
   // save new file with updated array -- fs writefileSync

 }
 
app.delete("/api/notes/:id", function(req,res){
  // console.log(req.params); 
  
  deleteNote(req.params.id); 
    // return request
    res.end() ; 
})

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
  
});


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT)});
  