let box = document.querySelectorAll('.box');
let turn = 'X';
let player1='';
let player2='';
let isGameOver = false;
let mode='';

document.querySelector('.player-mode').addEventListener('click',()=>{
  mode='player';

  document.querySelector('.select-mode').style.display="none";

  document.querySelector('.select-player').style.display="block";
});

document.querySelector('.computer-mode').addEventListener('click',()=>{
  mode='computer';

  document.querySelector('.select-mode').style.display="none";

  document.querySelector('.select-player').style.display="block";
});

document.querySelector('.x').addEventListener('click',()=>{
  player1='X';
  player2='O'
  setTurn(mode);

  document.querySelector('.player-1').style.color="var(--theme-3)";
  document.querySelector('.player-2').style.color="#ffffff";

  document.querySelector('.select-player').style.display="none";
  document.querySelector('.play-area').style.display="block";
});

document.querySelector('.o').addEventListener('click',()=>{
  player1='O';
  player2='X';
  setTurn(mode);

  document.querySelector('.player-2').style.color="var(--theme-3)";
  document.querySelector('.player-1').style.color="#ffffff";

  document.querySelector('.select-player').style.display="none";
  document.querySelector('.play-area').style.display="block";
});

function setTurn(mode){
  if(mode==='player'){
    document.querySelector('.player-1').innerHTML=`Player 1 : ${player1}`;

    document.querySelector('.player-2').innerHTML=`Player 2 : ${player2}`;
  }
  else if(mode==='computer'){
    document.querySelector('.player-1').innerHTML=`Player : ${player1}`;

    document.querySelector('.player-2').innerHTML=`Computer : ${player2}`;
  }

  playgame();
}

function playgame(){
  if(mode==='player'){
    playerGame();
  }
  else if(mode==='computer'){
    computerGame();
  }
}

function computerGame(){
  if(turn===player1){
    box.forEach(e =>{
      e.addEventListener('click',()=>{
        if((!isGameOver) && (e.innerHTML === "")){
          e.innerHTML=turn;
          checkWin();
          checkDraw();
          checkTurn();
        }
      })
    });
  }
  else if((turn===player2)){
    setTimeout((checkPlace(player2)),8000);
  }
}

function checkPlace(turn){

  let x= pickCell();
  let y= pickCell();

  let cell = document.getElementById("table").rows[x].cells[y].innerHTML;

  if((!isGameOver) && (cell ==="")){ 

    document.getElementById("table").rows[x].cells[y].innerHTML=player2; 
      
    checkWin();
    checkDraw();
    checkTurn();
  }
  else{
    checkPlace();
  }
}

function pickCell(){
  const maxLimit=3;

  let cell = Math.floor(Math.random()*maxLimit);

  return cell;
}

function playerGame(){
  box.forEach(e =>{
    e.addEventListener('click',()=>{
      if((!isGameOver) && (e.innerHTML === "")){
        e.innerHTML=turn;
        checkWin();
        checkDraw();
        checkTurn();
      }
    })
  });
} 

function checkTurn(){
  if(turn === player1){
    turn = player2;

    document.querySelector('.player-2').style.color="var(--theme-3)";
    document.querySelector('.player-1').style.color="#ffffff";
    playgame();
  }
  else{
    turn = player1;

    document.querySelector('.player-1').style.color="var(--theme-3)";
    document.querySelector('.player-2').style.color="#ffffff";
    playgame();
  }
}

function checkWin(){
  let player = '';

  let winCondition = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for(let i=0; i<winCondition.length; i++){
    let v0= box[winCondition[i][0]].innerHTML;
    let v1= box[winCondition[i][1]].innerHTML;
    let v2= box[winCondition[i][2]].innerHTML;
    

    if( v0 != "" && v0 === v1 && v0 === v2){

      isGameOver=true;
      if(v0 === player1){
        player = player1;
      }
      else player = player2;

      document.querySelector('.result-text').innerHTML=` ${player} Wins `;

      document.querySelector('.result').style.display= "block";

      document.querySelector('.play-again').style.display="block";

      for(let j = 0; j<3; j++){
        box[winCondition[i][j]].style.color="var(--theme-2)";
      }
    }
  }
}

function checkDraw(){
  if(!isGameOver){
    let isDraw = true;
    box.forEach( e=>{
      if(e.innerHTML === "") 
        isDraw = false;
    })

    if(isDraw){
      isGameOver = true;
      document.querySelector('.result-text').innerHTML=` Match Draw `;
      document.querySelector('.play-again').style.display= "inline";
    }
  }
}

document.querySelector('.play-again').addEventListener('click', ()=>{
  isGameOver = false;
  turn = "X";
  
  document.querySelector('.result-text').innerHTML = "";
  document.querySelector('.play-again').style.display = "none";
  document.querySelector('.select-mode').style.display = "block";
  document.querySelector('.play-area').style.display = "none";

  box.forEach( e=>{
    e.innerHTML = "";
    e.style.color= "#fff";
  })
});
