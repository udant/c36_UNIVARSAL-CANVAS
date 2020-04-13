//UDANT KANDARPA
//UNIVARSAL CANVAS


var stroke1,stroke2,stroke3,stroke4;
var pointer;
var drawing = [];
var currentPath = [];
var values;
var dbdrawing = [];
var j=0,k=0;

function setup(){
  canvas = createCanvas(400,400);
  canvas.mousePressed(startPath);
  database = firebase.database();
  values = database.ref("screen/mouse");
  
}

function startPath() {
  currentPath=[];
  drawing.push(currentPath);
  database.ref("screen/mouse").set(drawing);
  }
function displaydb() {
  database.on();
}
  
function readPosition(data) {
  dbdrawing = data.val();
 
 console.log("dbdrawing "+ dbdrawing.length);
 for (var i = 0; i < dbdrawing.length; i++) {
  var dbpath = dbdrawing[i];
  

  beginShape();
  for (var j = 0; j < dbpath.length; j++) {
    vertex(dbpath[j].x,dbpath[j].y) ;   
  }
  endShape(); 
} 
  
  
}

function draw(){
  background(0);
  
 
 
 function  update(state){
    database.ref("/").update({
        gameState: state
    });
}
 
  

  if (mouseIsPressed) {
    var point = {
      x: mouseX,
      y: mouseY,
   }

   
   
  currentPath.push(point);
  }
  stroke(255);
  
  noFill();

  strokeWeight(5)
  
  
  for (var i = 0; i < drawing.length; i++) {
    var path = drawing[i];
  

    beginShape();
    for (var j = 0; j < path.length; j++) {
      vertex(path[j].x,path[j].y) ;   
    }
    endShape(); 
  }
 
  values.on("value",readPosition); 
 
  drawSprites();
}