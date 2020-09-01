// Get move logic set up
// Get the pieces into pieces array and when they hit the bottom add them to allPieces and pop + generate new Piece
//Get Logic for New Piece generation

const cnv= document.getElementById("Gameboard");
const ctx= cnv.getContext("2d");
const box= 25;
let directD;
let direct;
let piece=[];
let allPieces=[];
let count=0;


document.addEventListener("keydown", move);

generatePiece();
function Piecebuilder (x1,y1,x2,y2,x3,y3,x4,y4) {
    this.x1=x1;
    this.x2=x2;
    this.x3=x3;
    this.x4=x4;
    this.y1=y1;
    this.y2=y2;
    this.y3=y3;
    this.y4=y4;
}
function generatePieceOne() {
let pieceOne= new Piecebuilder(10*box,0,11*box,undefined,12*box,undefined,13*box);
piece[0]=pieceOne;

}
function generatePieceTwo() {
    let pieceTwo= new Piecebuilder(10*box,box,11*box,0,10*box,undefined,11*box);
    piece[0]=pieceTwo;

}
function generatePieceThree() {

}
function generatePieceFour() {

}
function move (event) {
if (event.keyCode===40) {
    directD="DOWN"  
    draw();
}
if (event.keyCode===39) {
    direct="RIGHT"  
}
if (event.keyCode===38) {
    direct="UP"
}
if (event.keyCode===37) {
    direct="LEFT"
}

}
function clear (c) {
    c.clearRect(0,0,600,600);
 }
function generatePiece() {
    let randomSelect=Math.floor(Math.random()*2);
    if (randomSelect===0) {
        generatePieceOne();
    }
     if (randomSelect===1) {
         generatePieceTwo();
     }
    // if (randomSelect===2) {
    //     generatePieceThree();
    // }
    // if (randomSelect===3) {
    //     generatePieceFour();
    // }
    
}
function checkYDistance() {
 let arr=[];   
for (let i=0;i<allPieces.length;i++) {
    if (!isNaN(allPieces[i].y2)) {

let y2Distance=allPieces[i].y2-piece[0].y1;

arr.push(y2Distance);
    }
    else {
        let y1Distance=allPieces[i].y1-piece[0].y1
        arr.push(y1Distance);
    }
}
return Math.min(...arr);

}
function collision() {
    for (let i=0;i<allPieces.length;i++) {
        if(checkYDistance()<=25)
        {
         if (piece[0].x1===allPieces[i].x1||piece[0].x1===allPieces[i].x2||piece[0].x1===allPieces[i].x3||piece[0].x1===allPieces[i].x4) {
            console.log("IM HERE");
            return false;
            }
        }
    }
    return true;
}
function draw() {
   if (piece[0].y1===575 || collision()!==true) {
       allPieces[count]=piece[0];
       console.log("NOW HERE");
       count++;
       piece.pop();
       generatePiece();
        }
    //Check which piece is on canvas by amount of y coordinates and clear each time draw() is called
      if (piece[0].y1!==575 && collision()) {
        if (piece[0].y2===undefined || isNaN(piece[0].y2)) {
        ctx.clearRect(piece[0].x1-1,piece[0].y1-1,box+4,box+4);
        ctx.clearRect(piece[0].x2-1,piece[0].y1-1,box+4,box+4);
        ctx.clearRect(piece[0].x3-1,piece[0].y1-1,box+4,box+4);
        ctx.clearRect(piece[0].x4-1,piece[0].y1-1,box+4,box+4);
        ctx.beginPath();
        }
        if  (piece[0].y2!==undefined && piece[0].y2!==null) {
            ctx.clearRect(piece[0].x1-1,piece[0].y2-1,box+4,box+4);
            ctx.clearRect(piece[0].x2-1,piece[0].y2-1,box+4,box+4);
            ctx.clearRect(piece[0].x3-1,piece[0].y1-1,box+4,box+4);
            ctx.clearRect(piece[0].x4-1,piece[0].y1-1,box+4,box+4);
            ctx.beginPath();
        }
      }
     
    

    
    pieceX1=piece[0].x1;
    pieceX2=piece[0].x2;
    pieceX3=piece[0].x3;
    pieceX4=piece[0].x4;
    pieceY1=piece[0].y1;
    pieceY2=piece[0].y2;
    piece.pop();
    
    if (direct === "LEFT") {
        pieceX1-= box;
        pieceX2-= box;
        pieceX3-= box;
        pieceX4-= box;
        direct="";
    }
    if (direct === "RIGHT") {  
        pieceX1+= box;
        pieceX2+= box;
        pieceX3+= box;
        pieceX4+= box;
        direct="";};
    if (directD === "DOWN") {
        pieceY1 += box;
        pieceY2 += box;
    }
  

let newPiece = {
    x1:pieceX1,
    x2:pieceX2,
    x3:pieceX3,
    x4:pieceX4,
    y1:pieceY1,
    y2:pieceY2
};

piece.unshift(newPiece);

if (piece[0].y2===undefined || isNaN(piece[0].y2)) {
    ctx.beginPath();
    ctx.fillStyle="Green";
    ctx.fillRect(piece[0].x1,piece[0].y1,box,box);
    ctx.fillRect(piece[0].x2,piece[0].y1,box,box);
    ctx.fillRect(piece[0].x3,piece[0].y1,box,box);
    ctx.fillRect(piece[0].x4,piece[0].y1,box,box);
    ctx.strokeStyle= "black";
    ctx.strokeRect(piece[0].x1,piece[0].y1,box,box);
    ctx.strokeRect(piece[0].x2,piece[0].y1,box,box);
    ctx.strokeRect(piece[0].x3,piece[0].y1,box,box);
    ctx.strokeRect(piece[0].x4,piece[0].y1,box,box);
}
if (piece[0].y2!==undefined && piece[0].y2!==null) {
    ctx.beginPath();
    ctx.fillStyle="Green";
    ctx.fillRect(piece[0].x1,piece[0].y2,box,box);
    ctx.fillRect(piece[0].x2,piece[0].y2,box,box);
    ctx.fillRect(piece[0].x3,piece[0].y1,box,box);
    ctx.fillRect(piece[0].x4,piece[0].y1,box,box);
    ctx.strokeStyle= "black";
    ctx.strokeRect(piece[0].x1,piece[0].y2,box,box);
    ctx.strokeRect(piece[0].x2,piece[0].y2,box,box);
    ctx.strokeRect(piece[0].x3,piece[0].y1,box,box);
    ctx.strokeRect(piece[0].x4,piece[0].y1,box,box);
    
    }
    
}
setInterval(draw,400);