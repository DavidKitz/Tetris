// Get move logic set up


const cnv= document.getElementById("Gameboard");
const ctx= cnv.getContext("2d");
const box= 25;
const directD="DOWN";
let direct;
let piece=[{x:10*box,y:0*box}];

document.addEventListener("keydown", move);
setInterval(draw,100);

function move (event) {
if (event.keyCode===40) {
    directD="DOWN"
    draw();
}
if (event.keyCode===39) {
    direct="RIGHT"
    draw();
}
if (event.keyCode===38) {
    direct="UP"
    draw();
}

if (event.keyCode===37) {
    direct="LEFT"
    draw();
}

}
function clear (c) {
    c.clearRect(0,0,600,600);
 }
function draw() {
    clear(ctx);
    ctx.beginPath();
    ctx.rect(piece[0].x,piece[0].y,box,box);
    ctx.stroke();
    
    pieceX=piece[0].x;
    pieceY=piece[0].y;
    piece.pop();
    if (directD === "DOWN") pieceY += box;
    if (direct === "LEFT") pieceX -= box;
    if (direct === "RIGHT") pieceX += box;

let newPiece={x:pieceX, y:pieceY};

    piece.unshift(newPiece);


}