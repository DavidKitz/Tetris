//collision works because as soon as piece goes of gameMatrix field it produces undefined which turns !==0 to true
//Pieces after tetris do not correctly drop down if beneath them there is open space, causing them to float in the air
//
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

piece2:[[0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [1,1,1,1]],

piece3:[[1,0,0],
        [1,0,0],
        [1,1,0]],

piece4:[[0,0,0],
        [0,1,1],
        [1,1,0]],

piece5:[[0,0,0],
        [1,1,0],
        [1,1,0]],

piece6:[[0,0,0],
        [1,1,0],
        [0,1,1]],

piece7:[[0,0,1],
        [0,0,1],
        [0,1,1]]
}
const player= {
    matrix: generatePiece(),
    position: {
        x:100,
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
function collisionSide() {
    

    player.matrix.forEach((row,y)=> {
        row.forEach((value,x)=> {
            if (value!==0 && (x*box+player.position.x)>275) {
            player.position.x-=box;
            return true;
            }
            else if (value!==0 && (x*box+player.position.x)<0) {
                player.position.x+=box;
                return true;
            }
        })
    })
    return false;
}  
function collisionPiece(e) {
    player.matrix.forEach((row,y)=> {
        row.forEach((value,x)=> {
            if (value!==0 && (gameMatrix[y+player.position.y/box]!==undefined && 
                gameMatrix[y+player.position.y/box][x+player.position.x/box]!==0)) {
                if(e===37) {
                    player.position.x+=box;
                    return true;
                }
                else if(e===39){
                    player.position.x-=box;
                    return true;
                }
            }
        })
})
}
function checkForTetris() {
  let nbrs=[];  
    gameMatrix.forEach((row,y)=> {
        let count=0;
        row.forEach((value,x)=> {
            if (value === 1) {
                count++
                if (count===12) {
                    nbrs.push(y);
                }
            }
            
        })   
    })
    if(nbrs.length!==0) {
         nbrs.sort((a, b)=>{return b-a});  
          drawAfterTetris(...nbrs);  
    }
}
function drawAfterTetris(...arrayTetris) {

let tetrisNbrs=arrayTetris;
console.log(tetrisNbrs);
    for (let i=0;i<tetrisNbrs.length;i++) {
      gameMatrix[tetrisNbrs[i]].forEach((value,x)=> {
          gameMatrix[tetrisNbrs[i]][x]=0;        
        })
    }
    for (let i=0;i<=tetrisNbrs[tetrisNbrs.length-1];i++) {
        if(gameMatrix[(tetrisNbrs[tetrisNbrs.length-1])-1-i]!==undefined) {
            gameMatrix[(tetrisNbrs[tetrisNbrs.length-1])-1-i].forEach((value,x)=> {
                if(value!==0) {
                    gameMatrix[(tetrisNbrs[tetrisNbrs.length-1])-1-i][x]= gameMatrix[(tetrisNbrs[0])-i][x];
                    gameMatrix[(tetrisNbrs[0])-i][x]=1;
                }
                })
        }
    }   
   
}

function draw(matrix,offset) {
    if (collision()) {
        
        //player.position.y-=box;
        clearInterval(ticker);
        merge(gameMatrix,player);
        checkForTetris();
        player.position.y=-25;
        player.position.x=100;
        ticker=setInterval(callDraw,1000);
        player.matrix= generatePiece();
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

    let nbrGenerator=Math.floor(Math.random()*7);
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
     else if (nbrGenerator===5) {
         return tetrisPieces.piece6;
     }
     else if (nbrGenerator===6) {
         return tetrisPieces.piece7;
     }

}


function merge(gameMatrix,player) {
    
    player.matrix.forEach((row,y) => {
        row.forEach((value,x) => {
            if (value!==0) {
                
                gameMatrix[(y*box + (player.position.y))/box-1][(x*box+ player.position.x)/box]=value;
                }
                
            });
    });

}

function move (event) {
    if (event.keyCode===40) {
        if (!collision()) {
            
            player.position.y+=box;
            draw(player.matrix,player.position);
            clearInterval(ticker);
            ticker=setInterval(callDraw,1000);
            }
    }
    if (event.keyCode===39) {
       if (!collisionSide(player.position.x+=box) && !collisionPiece(39)) {
        
        draw(player.matrix,player.position);
       }
    }
    if (event.keyCode===38) {
           rotate();
           
    }
    if (event.keyCode===37) {
        if (!collisionSide(player.position.x-=box) && !collisionPiece(37)) {
        
        draw(player.matrix,player.position);
        }
       
    }
}
    
function rotate() {
    if (player.matrix[0].length === 4) {
        let newMatrix=[[],[],[],[]];
        player.matrix.map((row,x) => { 
            row.map((value,y)  => {
                
           newMatrix[x].push(player.matrix[(player.matrix.length-1)-y][x])
            })  
        });
        player.matrix=newMatrix;
    }
    else {
    let newMatrix2=[[],[],[]];
    player.matrix.map((row,x) => { 
        row.map((value,y)  => {
       
            newMatrix2[x].push(player.matrix[(player.matrix.length-1)-y][x])   
         })  
    });
    player.matrix=newMatrix2;
    }

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




