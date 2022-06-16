
var turn="X";
var playedCell=[0, 1, 2, 3, 4, 5, 6, 7, 8];
var playedTime=0;
let win=false
  // create elements <table> and a <tbody>
  var tbl = document.createElement("table");


  var tblBody = document.createElement("tbody");

  // cells creation
  var identifier=0;
  for (var j = 0; j <= 2; j++) {
    // table row creation
    var row = document.createElement("tr");
   

    for (var i = 0; i <= 2; i++) {
      
      var cell = document.createElement("td");
      
      row.appendChild(cell);
    
      cell.setAttribute("width",120);
      cell.setAttribute("height",120);
      cell.setAttribute("align","center");
      cell.setAttribute("valign","center");
      cell.addEventListener("click", playTurn );
      cell.identifier=identifier;
      cell.classList.add("cell");
      identifier=identifier+1;


      cell.style.fontSize="70px";
      cell.style.backgroundColor=" darkcyan";


    }

    //row added to end of table body
    tblBody.appendChild(row);
  }

  // append the <tbody> inside the <table>
  tbl.appendChild(tblBody);
  // put <table> in the <body>
  
  document.getElementById("tictactoe").appendChild(tbl);
let xScore=0;
let oScore=0;
let xWins = document.getElementById("x-score");
let oWins = document.getElementById("o-score");

  function playTurn (){
    //1 check if the cell has been played before   

    if (this.innerHTML === "X" || this.innerHTML === "O" || win === true) {
      return;
    }




    document.getElementById("restart").innerHTML = " <button onclick='init()' > RESTART GAME</button>";

    //2 add the new played tuen to the table playedCell
    playedCell[this.identifier] = turn;
    
    this.innerHTML = turn;
    playedTime = playedTime + 1;
    console.log(playedTime);
    //3 check if the game has been won by one of the players
    if (hasWon(turn)) {
      if(turn==="X")
      {
        xScore++;
        xWins.innerHTML=xScore;
      }else{
        oScore++;
        oWins.innerHTML=oScore;
      }
        
      win = true;
      hasWon(turn);
      
      }
      if (win === true) {
        return;}
     
    

  if(turn==="X") turn="O";
    else turn="X";


  
     if(playedTime<8){
      next=botmove(playedCell,turn).index;
      playedCell[next]=turn;

       document.getElementsByTagName("td")[next].innerHTML = turn;
      
      if (hasWon(turn)) {
       if(turn==="X")
       {
         xScore++;
         xWins.innerHTML=xScore;
       }else{
         oScore++;
         oWins.innerHTML=oScore;
       }
 
       win = true;
       hasWon(turn);
       }
       if (win === true) {
         return;}
     
   if(turn==="X") turn="O";
   else turn="X";
   playedTime++;
     }
      
    
    

    if (playedTime === 9)
      alert("Draw game");

  }
 







  

   let line= document.getElementsByTagName("hr")[0]
    
    
  function hasWon(play){

  	if(playedCell[0]===play && playedCell[1]===play && playedCell[2]===play ){
       
      if(win===true){line.style.display = "block";
        
      line.style.left='20%';
      
       line.style.top= '15%';
       line.style.transform = 'rotate(0deg)';}  
      
	        return true;
    }
  	
  	if(playedCell[3]===play && playedCell[4]===play && playedCell[5]===play ){
      if(win===true){line.style.display = "block";
      line.style.top='36%';
        line.style.left= '20%';
        line.style.transform = 'rotate(0deg)';}
      
        return true;
    }
  	
      if(playedCell[6]===play && playedCell[7]===play && playedCell[8]===play )
       {if(win===true){line.style.display = "block";
       line.style.left='20%';
      line.style.top= '57%';
      line.style.transform = 'rotate(0deg)';}
         
         return true;}
      if(playedCell[0]===play && playedCell[3]===play && playedCell[6]===play )
  		{if(win===true){line.style.display = "block";
      line.style.transform = 'rotate(-90deg)';
        line.style.left='2.7%';
        line.style.top= '40%';}
        
        
        return true;}
      if(playedCell[1]===play && playedCell[4]===play && playedCell[7]===play )
  		{ if(win===true){line.style.display = "block";
      line.style.transform = 'rotate(-90deg)';
      line.style.left='18.7%';
      line.style.top= '40%';}
        
       
        return true;}
      if(playedCell[2]===play && playedCell[5]===play && playedCell[8]===play )
  		{if(win===true){line.style.display = "block";
      line.style.transform = 'rotate(-90deg)';
      line.style.left='34.7%';
      line.style.top= '40%';}
        
       
        return true;}
      if(playedCell[0]===play && playedCell[4]===play && playedCell[8]===play )
  	  {if(win===true){line.style.display = "block";
      line.style.top='36%';
      line.style.left= '18.7%';
      line.style.transform = 'rotate(45deg)'; }
         
      
        
        return true;}
      if(playedCell[6]===play && playedCell[4]===play && playedCell[2]===play )
  		 {if(win===true){   line.style.display = "block";
       line.style.top='36%';
       line.style.left= '18.7%'; 
       line.style.transform = 'rotate(-45deg)';}
      
         return true;}
return false;
  }

  function init(){
    
    line.style.display = "none";
  win=false
  playedTime=0;
   turn="X";
   for(let i=0 ;i<9;i++){
  
   playedCell[i]=i;}
  var allCells=document.getElementsByClassName("cell");
  for(let item of allCells){
  	item.innerHTML="";
    
  }
document.getElementById("restart").innerHTML=""

  }
  




  function botmove(newBoard,player){
    
    let array = emptyCells(newBoard);
    if (hasWon("X")) {
      return {
        score: -1
      };
    } else if (hasWon("O")) {
      return {
        score: 1
      };
    } else if (array.length === 0) {
      return {
        score: 0
      };
    }
  
   var remainMoves=[];
   
   for (var i = 0; i < array.length; i++) {
         var move={};
         move.index=newBoard[array[i]];
        newBoard[array[i]]=player;
        if(player==="X"){
          var nextMove= botmove(newBoard,"O");
          move.score=nextMove.score;
          
        }else{
          var nextMove=botmove (newBoard,"X");
          move.score=nextMove.score;
        }
        newBoard[array[i]]=move.index;
        remainMoves.push(move);
      
        }
        var bestMove;
        if (player ==="O") {
          var bestScore = -2;
          for (var i = 0; i < remainMoves.length; i++) {
            if (remainMoves[i].score > bestScore) {
              bestScore = remainMoves[i].score;
              bestMove = i;
            }
          }
        } else {
          var bestScore = 2;
          for (var i = 0; i < remainMoves.length; i++) {
            if (remainMoves[i].score < bestScore) {
              bestScore = remainMoves[i].score;
              bestMove = i;
            }
          }
        }
        return remainMoves[bestMove];
   
      }
   

  
  function emptyCells (brd){
    let empty=[];
    brd.forEach(element => {
     if (element!="O"&&element!="X") 
     empty.push(element) ; 
    });
    return empty;
  }
  
  