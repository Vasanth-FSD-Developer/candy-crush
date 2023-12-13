let candies = ["Blue","Orange","Red","Yellow","Purple","Green"];
let board = [];
let row = 9;
let columns = 9;
var score = 0;
var currTile;
var otherTiles;

window.onload = function(){
    startGame();

    window.setInterval(function(){
      crushcandy();
      slideCandy();
      generateCandy();
    },100)
}
function randomCandy(){
    return candies[Math.floor(Math.random()*candies.length)];
}
 function startGame(){
    for(let r=0; r<row;r++){
        let row =[];
        for(let c=0; c<columns ;c++){
            let tile = document.createElement("img");
            tile.id = r.toString()+ "-" + c.toString();
            tile.src = "./images/"+ randomCandy() +".png";
            //event
            tile.addEventListener("dragstart",dragStart);
            tile.addEventListener("dragover",dragOver);
            tile.addEventListener("dragenter",dragEnter);
            tile.addEventListener("dragleave",dragLeave);
            tile.addEventListener("drop",dragDrop);
            tile.addEventListener("dragend",dragEnd);
            document.getElementById("board").append(tile);
            row.push(tile)

        }
        board.push(row);
    }
    console.log(board);
 }
 function dragStart(){
    currTile=this;
 }
 function dragOver(e){
    e.preventDefault();
 }
 function dragEnter(e){
    e.preventDefault();
 }
 function dragLeave(){

 }
 function dragDrop(){
    otherTiles=this;
 }
 function dragEnd(){
   if (currTile.src.includes("blank1") || otherTiles.src.includes("blank1")){
      return;
   }

    let curCode = currTile.id.split("-")
    let r = parseInt(curCode[0]);
    let c = parseInt(curCode[1]);

    let otherCode = otherTiles.id.split("-");
    let r2 = parseInt(otherCode[0]);
    let c2 = parseInt (otherCode[1]);

    let moveLeft = c2 ==c-1 && r==r2;
    let moveRigt = c2 ==c+1 && r ==r2

    let moveUp = r2 ==r-1 && c == c2;
    let moveDown = r2 = r+1 && c == c2;

    let isOneLine = moveLeft || moveRigt || moveUp ||moveDown

    if (isOneLine){
      let currImg= currTile.src;
      let otherImg= otherTiles.src;
      currTile.src = otherImg;
      otherTiles.src = currImg;

      let validMove = checkValid()
      if (!validMove) {
         let currImg= currTile.src;
         let otherImg= otherTiles.src;
         currTile.src = otherImg;
         otherTiles.src = currImg;

      }
    }
 }

 function crushcandy(){
     crushThree();
     document.getElementById("Score").innerText = score;
   
 }
 function crushThree(){
   //check row
   for (let r=0; r<row; r++){
      for (let c=0; c<columns-2; c++){
         let candy1 = board[r][c];
         let candy2 = board[r][c+1];
         let candy3 = board[r][c+2]
         if (candy1.src ==candy2.src && candy2.src ==candy3.src && !candy1.src.includes("blank1")){
            candy1.src = "./images/blank1.png";
            candy2.src = "./images/blank1.png";
            candy3.src = "./images/blank1.png";
            score +=10;
         }
      }
   }
   //check columns;
   for (let c=0; c<columns; c++){
      for(let r=0; r<row-2; r++){
         let candy1 =board[r][c];
         let candy2 = board[r+1][c];
         let candy3 =board [r+2][c];
         if (candy1.src ==candy2.src && candy2.src ==candy3.src && !candy1.src.includes("blank1")){
            candy1.src = "./images/blank1.png";
            candy2.src = "./images/blank1.png";
            candy3.src = "./images/blank1.png";
            score +=10;
            
         }

      }
   }
 }

 function checkValid(){
//check row
for (let r=0; r<row; r++){
   for (let c=0; c<columns-2; c++){
      let candy1 = board[r][c];
      let candy2 = board[r][c+1];
      let candy3 = board[r][c+2]
      if (candy1.src ==candy2.src && candy2.src ==candy3.src && !candy1.src.includes("blank1")){
         return true
      }
   }
}
//check columns;
for (let c=0; c<columns; c++){
   for(let r=0; r<row-2; r++){
      let candy1 =board[r][c];
      let candy2 = board[r+1][c];
      let candy3 =board [r+2][c];
      if (candy1.src ==candy2.src && candy2.src ==candy3.src && !candy1.src.includes("blank1")){
         return true

   }
}
}
 return false;

 }

 function slideCandy(){
   for (let c=0;c<columns;c++){
      let ind = row-1;
      for (let r =columns-1;r>=0;r--){
         if(!board[r][c].src.includes("blank1")){
            board[ind][c].src=board[r][c].src;
            ind-=1;
         }
     
      }
      for(let r=ind; r>=0; r--){
         board[r][c].src= "./images/blank1.png";
      }
   }
 }
function generateCandy(){
   for (let c=0;c<columns;c++){
      if(board[0][c].src.includes("blank1")){
         board[0][c].src = "./images/"+ randomCandy()+".png";
      }
   }

}
