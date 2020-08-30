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
setInterval(draw,400);
generatePieceOne();
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
let pieceOne= new Piecebuilder(10*box,0,11*box,undefined,12*box,undefined,13*box,);
piece[0]=pieceOne;

ctx.beginPath();
    ctx.rect(pieceOne.x1,piece[0].y1,box,box);
    ctx.rect(pieceOne.x2,piece[0].y1,box,box);
    ctx.rect(pieceOne.x3,piece[0].y1,box,box);
    ctx.rect(pieceOne.x4,piece[0].y1,box,box);
    ctx.stroke();
    
}
function generatePieceTwo() {
    let piecetwo= new Piecebuilder(10*box,0,11*box,0)


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
    piece[0].x1+= box;
    piece[0].x2+= box;
    piece[0].x3+= box;
    piece[0].x4+= box;
    draw();
}
if (event.keyCode===38) {
    direct="UP"
    draw();
}

if (event.keyCode===37) {
    direct="LEFT"
    piece[0].x1-= box;
    piece[0].x2-= box;
    piece[0].x3-= box;
    piece[0].x4-= box;
    draw();
}

}
function clear (c) {
    c.clearRect(0,0,600,600);
 }
function generatePiece() {
    let randomSelect=0;           //Math.floor(Math.random()*4);
    if (randomSelect===0) {
        generatePieceOne();
    }
    // if (randomSelect===1) {
    //     generatePieceTwo();
    // }
    // if (randomSelect===2) {
    //     generatePieceThree();
    // }
    // if (randomSelect===3) {
    //     generatePieceFour();
    // }
    
}
function checkAllPieces() {

    for (let i=0;i<=allPieces.length;i++) {
        if (allPieces[i]) {
    ctx.beginPath();
    ctx.rect(allPieces[0].x1,allPieces[0].y1,box,box);
    ctx.rect(allPieces[0].x2,allPieces[0].y1,box,box);
    ctx.rect(allPieces[0].x3,allPieces[0].y1,box,box);
    ctx.rect(allPieces[0].x4,allPieces[0].y1,box,box);
    ctx.stroke();
    }
}
}
function draw() {
   if (piece[0].y1===600) {
       allPieces[count]=piece[0];
       count++;
       piece.pop();
       generatePiece();
        }
       
    
    
    clear(ctx);
    checkAllPieces();
    ctx.beginPath();
    ctx.rect(piece[0].x1,piece[0].y1,box,box);
    ctx.rect(piece[0].x2,piece[0].y1,box,box);
    ctx.rect(piece[0].x3,piece[0].y1,box,box);
    ctx.rect(piece[0].x4,piece[0].y1,box,box);
    ctx.stroke();
    
    pieceX1=piece[0].x1;
    pieceX2=piece[0].x2;
    pieceX3=piece[0].x3;
    pieceX4=piece[0].x4;

    pieceY=piece[0].y1;
    piece.pop();
    //if (direct === "LEFT") pieceX -= box;
    //if (direct === "RIGHT") pieceX += box;
    if (directD === "DOWN") pieceY += box;
  

let newPiece={x1:pieceX1,x2:pieceX2,x3:pieceX3,x4:pieceX4, y1:pieceY};

    piece.unshift(newPiece);


}