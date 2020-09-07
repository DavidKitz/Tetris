// Pieces can be moved inside each other from left or right
// Get the pieces into pieces array and when they hit the bottom add them to allPieces and pop + generate new Piece
//collision checks y coords and then x from all pieces so different pieces for x and y are used

const cnv= document.getElementById("Gameboard");
const ctx= cnv.getContext("2d");
const box= 25;
let directD;
let direct;
let piece=[];
let allPieces=[];
let count=0;
let current;


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
    current="z";
    if (direct!=="UP" ||piece[0]===undefined) {
let pieceOne= new Piecebuilder(5*box,0,6*box,undefined,7*box,undefined,8*box);
piece[0]=pieceOne;
}
else {
    let x1=piece[0].x1;
    let y1=piece[0].y1;
    if(piece[0].x2!==piece[0].x1) {
        
    ctx.clearRect(piece[0].x1-1,piece[0].y1-1,box+4,box+4);
    ctx.clearRect(piece[0].x2-1,piece[0].y1-1,box+4,box+4);
    ctx.clearRect(piece[0].x3-1,piece[0].y1-1,box+4,box+4);
    ctx.clearRect(piece[0].x4-1,piece[0].y1-1,box+4,box+4); 
    piece[0].x2=x1;
    piece[0].x3=x1;
    piece[0].x4=x1;
    piece[0].y2=y1+box;
    piece[0].y3=y1+box*2;
    piece[0].y4=y1+box*3; }
    else {
    ctx.clearRect(piece[0].x1-1,piece[0].y1-1,box+4,box+4);
    ctx.clearRect(piece[0].x2-1,piece[0].y2-1,box+4,box+4);
    ctx.clearRect(piece[0].x3-1,piece[0].y3-1,box+4,box+4);
    ctx.clearRect(piece[0].x4-1,piece[0].y4-1,box+4,box+4); 
        piece[0].x2=x1+box;
        piece[0].x3=x1+box*2;
        piece[0].x4=x1+box*3;
        piece[0].y2=undefined;
        piece[0].y3=undefined;
        piece[0].y4=undefined;
    }
  draw();
}
}
function generatePieceTwo() {
    current="z2";
    let pieceTwo= new Piecebuilder(6*box,box,7*box,0,6*box,undefined,7*box);
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
    collision();  
}
if (event.keyCode===39) {
    direct="RIGHT";
    collision(); 
}
if (event.keyCode===38) {
    direct="UP";
    if (current==="z") {
        generatePieceOne();
    }
    
}
if (event.keyCode===37) {
    direct="LEFT";
    collision();
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
    if (!isNaN(allPieces[i].y4)) {
        let y4Distance=allPieces[i].y1-piece[0].y1;
        if (y4Distance<=25) {
            arr.push(y4Distance,i); 
    }}
    if (!isNaN(allPieces[i].y2)) {

let y2Distance=allPieces[i].y2-piece[0].y1;
        if (y2Distance<=25) {
            arr.push(y2Distance,i); 
        }
    }
    else {
        let y1Distance=allPieces[i].y1-piece[0].y1
        
        if (y1Distance<=25) {
            arr.push(y1Distance,i); 
    
        }
    }
}

return arr;

}
function checkXDistance(k) {
       
   if (piece[0].x1===allPieces[k].x1||piece[0].x1===allPieces[k].x2||piece[0].x1===allPieces[k].x3||piece[0].x1===allPieces[k].x4) {
       return true;
   }
   else if (piece[0].x2===allPieces[k].x1||piece[0].x2===allPieces[k].x2||piece[0].x2===allPieces[k].x3||piece[0].x2===allPieces[k].x4)
   {
       return true;
   } 
   else if (piece[0].x3===allPieces[k].x1||piece[0].x3===allPieces[k].x2||piece[0].x3===allPieces[k].x3||piece[0].x3===allPieces[k].x4)
   {
       return true;
   } 

   else if (piece[0].x4===allPieces[k].x1||piece[0].x4===allPieces[k].x4||piece[0].x4===allPieces[k].x3||piece[0].x4===allPieces[k].x4)
   {
       return true;
   } 

return false;
     
}
function removeDirect(k) {
  
    if (piece[0].x1+box===allPieces[k].x1||piece[0].x1+box===allPieces[k].x2||piece[0].x1+box===allPieces[k].x3||piece[0].x1+box===allPieces[k].x4) {
       if(direct==="RIGHT") direct="";
    }
    else if (piece[0].x2+box===allPieces[k].x1||piece[0].x2+box===allPieces[k].x2||piece[0].x2+box===allPieces[k].x3||piece[0].x2+box===allPieces[k].x4)
    {
       if(direct==="RIGHT") direct="";
    } 
    else if (piece[0].x3+box===allPieces[k].x1||piece[0].x3+box===allPieces[k].x2||piece[0].x3+box===allPieces[k].x3||piece[0].x3+box===allPieces[k].x4)
    {
       if(direct==="RIGHT") direct="";
    } 
    else if (piece[0].x4+box===allPieces[k].x1||piece[0].x4+box===allPieces[k].x2||piece[0].x4+box===allPieces[k].x3||piece[0].x4+box===allPieces[k].x4)
    {
       if(direct==="RIGHT") direct="";
    } 
    else if (piece[0].x1-box===allPieces[k].x1||piece[0].x1-box===allPieces[k].x2||piece[0].x1-box===allPieces[k].x3||piece[0].x1-box===allPieces[k].x4) {
        if(direct==="LEFT") direct="";
     }
     else if (piece[0].x2-box===allPieces[k].x1||piece[0].x2-box===allPieces[k].x2||piece[0].x2-box===allPieces[k].x3||piece[0].x2-box===allPieces[k].x4)
     {
        if(direct==="LEFT") direct="";
     } 
     else if (piece[0].x3-box===allPieces[k].x1||piece[0].x3-box===allPieces[k].x2||piece[0].x3-box===allPieces[k].x3||piece[0].x3-box===allPieces[k].x4)
     {
         console.log(k);
        if(direct==="LEFT") direct="";
     } 
     else if (piece[0].x4-box===allPieces[k].x1||piece[0].x4-box===allPieces[k].x2||piece[0].x4-box===allPieces[k].x3||piece[0].x4-box===allPieces[k].x4)
     {
        if(direct==="LEFT") direct="";
     } 
    
}
function collision() {
    
if(checkYDistance()[1]!==undefined)
    {   removeDirect(checkYDistance()[1]);
        
        for (let i=1;i<=checkYDistance().length;i+=2) {
        let k=checkYDistance()[i];
        
        console.log(i);
         if(checkXDistance(k)) //(piece[0].x1===allPieces[k].x1||piece[0].x1===allPieces[k].x2||piece[0].x1===allPieces[k].x3||piece[0].x1===allPieces[k].x4) 
         {
            direct="";
            console.log("IM HERE");
            return false;
            }
        }
        }
    return true;
}

function checkClear() {
    if (piece[0].y1===475 ||piece[0].y4===475 || collision()!==true) {
        allPieces[count]=piece[0];
        console.log("NOW HERE");
        count++;
        piece.pop();
        generatePiece();
         }
     //Check which piece is on canvas by amount of y coordinates and clear each time draw() is called
        
       if (piece[0].y1!==575 && collision()) {
         if  (piece[0].y4!==undefined) {  
            ctx.clearRect(piece[0].x1-1,piece[0].y1-1,box+4,box+4);
            ctx.clearRect(piece[0].x2-1,piece[0].y2-1,box+4,box+4);
            ctx.clearRect(piece[0].x3-1,piece[0].y3-1,box+4,box+4);
            ctx.clearRect(piece[0].x4-1,piece[0].y4-1,box+4,box+4);
            ctx.beginPath();
         }
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
      
}
function draw() {
  checkClear();
    

    
    pieceX1=piece[0].x1;
    pieceX2=piece[0].x2;
    pieceX3=piece[0].x3;
    pieceX4=piece[0].x4;
    pieceY1=piece[0].y1;
    pieceY2=piece[0].y2;
    pieceY3=piece[0].y3;
    pieceY4=piece[0].y4;
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
        pieceY3 += box;
        pieceY4 += box;
    }
  

let newPiece = {
    x1:pieceX1,
    x2:pieceX2,
    x3:pieceX3,
    x4:pieceX4,
    y1:pieceY1,
    y2:pieceY2,
    y3:pieceY3,
    y4:pieceY4
};

piece.unshift(newPiece);
if (piece[0].y3!==undefined) {
    ctx.beginPath();
    ctx.fillStyle="Green";
    ctx.fillRect(piece[0].x1,piece[0].y1,box,box);
    ctx.fillRect(piece[0].x2,piece[0].y2,box,box);
    ctx.fillRect(piece[0].x3,piece[0].y3,box,box);
    ctx.fillRect(piece[0].x4,piece[0].y4,box,box);
    ctx.strokeStyle= "black";
    ctx.strokeRect(piece[0].x1,piece[0].y1,box,box);
    ctx.strokeRect(piece[0].x2,piece[0].y2,box,box);
    ctx.strokeRect(piece[0].x3,piece[0].y3,box,box);
    ctx.strokeRect(piece[0].x4,piece[0].y4,box,box);
}
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