//After first drop ,piece starts from aboce canvas triggering merge() error --needs fix
const cnv= document.getElementById("Gameboard");
const ctx= cnv.getContext("2d");
const box= 25;
document.addEventListener("keydown",move);

const gameMatrix= Array(20).fill().map(() => Array(12).fill(0));
let ticker=setInterval(callDraw,1000);

let tetrisPieces= {
piece1:[[0,0,0],
        [0,1,0],
        [1,1,1]],

piece2:[[1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]],

piece3:[[1,0,0],
        [1,0,0],
        [1,1,0]],

piece4:[[1,0,0],
        [1,1,0],
        [0,1,0]],

piece5:[[0,0,0],
        [1,1,0],
        [1,1,0]]
}
const player= {
    matrix: generatePiece(),
    position: {
        x:0,
        y:-50
    }
}

function callDraw() {
    player.position.y+=box;
    draw(player.matrix,player.position);
}

function collision () {
   
    for (let i=0;i<player.matrix.length;i++) {
        for (let x=0;x<player.matrix.length;x++) {
            if(player.matrix[i][x]!==0 &&
            (gameMatrix[i + (player.position.y/box)] && 
            gameMatrix[i + (player.position.y/box)][x + (player.position.x/box)]) !==0 ) {
                if(player.position.y<0===false) {
                return true;
                }
            }
          
        }
    }
    return false;

} 
function collisionSide(newX) {
    

    player.matrix.forEach((row,y)=> {
        row.forEach((value,x)=> {
            if (value!==0 && (x*box+player.position.x)>275) {
                console.log("hello");
            player.position.x-=box;
            return true;
            }
            if (value!==0 && (x*box+player.position.x)<0) {
                player.position.x+=box;
                return true;
            }
        })
    })
    return false;
    //      if (newX<0) {
    //      player.position.x+=box;
    //      return true;
    //     }
    //     if(newX > 225) {
    //         console.log("hello");
    //         player.position.x-=box;
    //         return true;
    //     } 
    
    
    // return false;
}  

       

function draw(matrix,offset) {
    if (player.position.y===450 || collision() ) {
        
        player.position.y-=box;
        clearInterval(ticker);
        merge(gameMatrix,player);
        player.position.y=-25;
        player.position.x=0;
        ticker=setInterval(callDraw,1000);
    }
    ctx.fillStyle="White";
    ctx.fillRect(0,0,300,500);
    drawGameMatrix (gameMatrix);
    player.matrix.forEach((row,y) => {
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

function generatePiece () {

    let nbrGenerator=Math.floor(Math.random()*5);
    let ray=Object.keys(tetrisPieces)[0]
    if (nbrGenerator===0) {
        return tetrisPieces.piece1;
    }
    else if (nbrGenerator===1) {
        return tetrisPieces.piece2;
    }
    else if (nbrGenerator===2) {
        return tetrisPieces.piece3;
    }
    else if (nbrGenerator===3) {
        return tetrisPieces.piece4;
    }
    else if (nbrGenerator===4) {
        return tetrisPieces.piece5;
    }

}


function merge(gameMatrix,player) {
    
    player.matrix.forEach((row,y) => {
        row.forEach((value,x) => {
            if (value!==0) {
                
                gameMatrix[(y*box + player.position.y)/box][(x*box+ player.position.x)/box]=value;
                
                
            }
        });
    });
}


function move (event) {
    if (event.keyCode===40) {
        if (player.position.y===450|| collision()) {
            player.position.y-=box;
            //merge(gameMatrix,player);
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
       if (!collisionSide(player.position.x+=box)) {
        
        draw(player.matrix,player.position);
       }
    }
    if (event.keyCode===38) {
           rotate();
           
    }
    if (event.keyCode===37) {
        if (!collisionSide(player.position.x-=box)) {
        
        draw(player.matrix,player.position);
        }
       
    }
    
    }
    
function rotate() {
let newMatrix=[[],[],[]];
const result=player.matrix.map((row,x) => { 
    row.map((value,y)  => {
   newMatrix[x].push(player.matrix[(player.matrix.length-1)-y][x])
        
         
    })  
});
player.matrix=newMatrix;
checkRotatePosition();
    
}
function checkRotatePosition() {
player.matrix.forEach((row,y)=> {
    row.forEach((value,x) => {
        if(value !== 0 && player.position.x+box*x < 0) {
            player.position.x += box;
        }
        if(value !== 0 && player.position.x+box*x > 275) {
            player.position.x -= box;
        }
    })
} 
)
}




