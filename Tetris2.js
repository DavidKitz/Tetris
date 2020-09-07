//After first drop ,piece starts from aboce canvas triggering merge() error --needs fix
const cnv= document.getElementById("Gameboard");
const ctx= cnv.getContext("2d");
const box= 25;
document.addEventListener("keydown",move);

const gameMatrix= Array(20).fill().map(() => Array(12).fill(0));

let piece= [
[0,0,0],
[0,1,0],
[1,1,1],
];
const player= {
    matrix: piece,
    position: {
        x:0,
        y:-50
    }
}

function collision () {
   
    for (let i=0;i<player.matrix.length;i++) {
        for (let x=0;x<player.matrix.length;x++) {
            if(player.matrix[i][x]!==0 &&
            (gameMatrix[i + (player.position.y/box)] && 
            gameMatrix[i + (player.position.y/box)][x + (player.position.x/box)]) !==0 ) {
                return true;
            }
          
        }
    }
    return false;

} 
function collisionSide(newX,newY) {
    if (newX<0 || newX > 225) {
        return true;

    }
}
function draw(matrix,offset) {
    if (player.position.y===450 || collision() ) {
        player.position.y-=box;
        clearInterval(ticker);
        merge(gameMatrix,player);
        player.position.y=-50;
        player.position.x=0;
        ticker=setInterval(callDraw,1000);
    }
    ctx.fillStyle="White";
    ctx.fillRect(0,0,300,500);
    drawGameMatrix (gameMatrix);
    piece.forEach((row,y) => {
        row.forEach((column,x) => {

            if (column!==0) {
                
                ctx.fillStyle="Green";
                ctx.fillRect(box*x+offset.x,y*box+offset.y,box,box);
                ctx.strokeStyle= "black";
                ctx.strokeRect(box*x+offset.x,y*box+offset.y,box,box);
               
            }
        })
    });
}


function merge(gameMatrix,player) {
    
    piece.forEach((row,y) => {
        row.forEach((value,x) => {
            if (value!==0) {
                gameMatrix[(y*box + player.position.y)/box][(x*box+ player.position.x)/box]=value;
                
            }
        });
    });
    
    
}

function drawGameMatrix (gameMatrix) {
    gameMatrix.forEach((row,y) => {
        row.forEach((column,x) => {
            if (column!==0) {
                ctx.fillStyle="Green";
                ctx.fillRect(box*x,y*box,box,box);
                ctx.strokeStyle= "black";
                ctx.strokeRect(box*x,y*box,box,box);

            }

            

        })
    })

}
function move (event) {
    if (event.keyCode===40) {
        if (player.position.y===450|| collision()) {
            player.position.y-=box;
            merge(gameMatrix,player);
            player.position.y=-50;
            player.position.x=0;
        }
        else {
            player.position.y+=box;
            draw(player.matrix,player.position);
            clearInterval(ticker);
            ticker=setInterval(callDraw,1000);
            }
    }
    if (event.keyCode===39) {
       if (!collisionSide(player.position.x+=box,player.position.y)) {
        player.position.x+=box
        draw(player.matrix,player.position);
       }
    }
    if (event.keyCode===38) {
           
    }
    if (event.keyCode===37) {
        if (!collisionSide(player.position.x-=box,player.position.y)) {
        player.position.x-=box;
        draw(player.matrix,player.position);
        }
        else {
            return;
        }
    }
    
    }
    function callDraw() {
        player.position.y+=box;
    //    if (collision())  {    
    //     player.position.y-=box;
    //     merge(gameMatrix,player);
    //     player.position.y=-50;
    //     player.position.x=0;
    //  }
    
        draw(player.matrix,player.position);
    
    }
let ticker=setInterval(callDraw,1000);