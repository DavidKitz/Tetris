// Get move logic set up


const cnv= document.getElementById("Gameboard");
const ctx= cnv.getContext("2d");
const box= 25;
let direct;
let piece=[{x:250,y:0}];

document.addEventListener("keydown", move);
setInterval(draw,100);
function move (event) {
if (event.keyCode===40) {
    direct="DOWN"
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
function draw() {

    ctx.beginPath();
    ctx.rect(piece[0].x,piece[0].y,box,box);
    ctx.stroke();

    pieceX=piece[0].x;
    pieceY=piece[0].y;
    piece.pop();
    if (direct="DOWN") pieceY += box;
    if (direct="LEFT") pieceX -= box;
    if (direct="RIGHT") pieceX += box;

    piece.unshift({x:pieceX,y:pieceY});


}