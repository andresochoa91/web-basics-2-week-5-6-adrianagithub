//------------------------ Game Project---------------------------
//Do you remember the game Battleship we created before? well .... it is time to make it with the DOM!!
//We are providing you with the design of a board (in the DOM) for a player1, you have to create the board for the player2 using the id property 'board_player2' -> it is the second list (ul) in your index.html file
//First ask the players for their names (use propmt)
//Now each time the turn player clicks on any cell of the opponent's board (you have to verify if the player is clicking the right board) the program needs to verify if there is an opponent's ship in that cell. If it is then the opponent has one less ship
//We want you to store the data of each player in two Player objects. Each object has to store: name, remaining boats, and their respective board.
//Each board needs to be initialized randomly with '0' and four '1' wich means the state of the cell. Numbers 1 are representing the 4 positions of the player's ships
//Also we want you to display the name of the turn player in the tag that has the id 'turn_player'. And if there is a winner  a text with: 'Congratulationes {name_player}!! you win'
//in the index.html file you are going to find 4 more ids: 'name_player1' , 'name_player2' , 'ships_player1' , 'ships_player2'. We want to see the information of each player in the respective elements
//As our previous Battleship, the winner is the player that hits the 4 opponent's ships first
//one more Thing create a 'reset' and a 'new game' buttons as childs of the element with the id 'buttons'. the reset button has to start the game again and the new game create a new game with new players and a new random board.
//***OBJECTS***//
var player1 = {
  name : '',
  shipCount: 4,
  gameBoard: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
};
var player2 = {
  name : '',
  shipCount: 4,
  gameBoard: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
};
//***VARIABLES***//
var x;
var y;
var coordp1 = [];
var coordp2 = [];
var currentplayer = player1;
var opponent = player2; //INIT currentplayer
var player;
var lives;
//***FUNCTIONS***//
function getRandomNumber() {
  var valmin=0; 
  var valmax=4;  
  var num = Math.floor(Math.random() * (+valmax - +valmin)) + +valmin; 
  return num;
}
function createShip(player, ships) {
  let i = 0;
  do {
    const x = getRandomNumber();
    const y = getRandomNumber();
    if (player.gameBoard[x][y] !== 1) {
      player.gameBoard[x][y] = 1;
      i++;
    }
  } while (i < ships)
}
function disparar(player,x,y){
  if (player.gameBoard[x][y] === 1){
    alert ("You hit your opponent has one less ship")
    player.gameBoard[x][y] = 0
    player.shipCount --
    }
  else {
    alert("Sorry you did not hit your opponent")
    console.log(player)
  }
  return player.name;
}
function createButtons () {
    const NodeButt = document.getElementById('buttons');
    var buttonRes = document.createElement("button");
    buttonRes.innerHTML = "Reset Game";
    var buttonNew = document.createElement("button");
    buttonNew.innerHTML = "New Game";
    NodeButt.appendChild(buttonRes);
    NodeButt.appendChild(buttonNew);
    buttonRes.addEventListener("click", refreshPage);
    buttonNew.addEventListener("click", refreshPage);
  return;
}
//reset wont apply function refreshPage
//new game
function refreshPage(){
  window.location.reload();
} 

const board_Player1 = document.getElementById('board_player1');
for (var x = 0; x < 4; x++) {
    const li = document.createElement('li'); // creating childs for the list (board), in this case represent a row number 'x' of the board
    for (var y = 0; y < 4; y++) {
      const cell = document.createElement('div');
      cell.className = "square"; // adding css properties to make it looks like a square
      cell.textContent = `${x},${y}`;  // saves the coordinates as a string value 'x,y'
      cell.value = 0;//state of the cell
      console.log (currentplayer)
      console.log (opponent)
      //this function adds the click event to each cell
      cell.addEventListener( 'click', (e) => {
          if (document.getElementById("board_player2").disabled === true){
            return false;
          }
          document.getElementById("board_player2").disabled = true;
          document.getElementById("board_player1").disabled = false;
          let cell = e.target; // get the element clicked
          console.log( cell.textContent) //display the coordinates in the console
          cell.style.visibility = 'hidden';// this  means that the contents of the element will be invisible, but the element stays in its original position and size / try it clicking on any of the black cells (in your browser) and see whats happens
          //cell.style.background ="purple"; //with this propertie you can change the background color of the clicked cell. try comment the line bellow and uncomment this line. Do not forget to save this file and refresh the borwser to see the changes
          let coordp1 = cell.textContent.split(',')
          //console.log(coordp1,"array")
          var x = parseInt(coordp1[0])
          var y = parseInt(coordp1[1])
          disparar(player1,x,y)// player2 shot player 1 in player1 board
          console.log (player1.shipCount)
          currentplayer = player1; //switch turn to shot to player 1
          opponent = player2;
          player = currentplayer.name;
          lives = currentplayer.shipCount;        
          document.getElementById("turn_player").textContent = player;//AQUI
          document.getElementById("ships_player1").textContent = livesp1;
          document.getElementById("ships_player2").textContent = livesp2;
          
          if ((player1.shipCount === 0) || (player2.shipCount === 0)){//END THE GAME AND REFRESH THE PAGE
            alert ("I am sorry you loose all your ships the GAME IS OVER");
            refreshPage()
          }
      });
      li.appendChild(cell); //adding each cell into the row number x
    }

     board_Player1.appendChild(li); //adding each row into the board
}

const board_player2 = document.getElementById('board_player2');
for (var x = 0; x < 4; x++) {
    const li = document.createElement('li'); // creating childs for the list (board), in this case represent a row number 'x' of the board
    for (var y = 0; y < 4; y++) {
      const cell = document.createElement('div');
      cell.className = "square"; // adding css properties to make it looks like a square
      cell.textContent = `${x},${y}`;  // saves the coordinates as a string value 'x,y'
      cell.value = 0;//state of the cell
      //this function adds the click event to each cell
      cell.addEventListener( 'click', (e) => {
        if (document.getElementById("board_player1").disabled === true){
          return false;
        }
        document.getElementById("board_player1").disabled = true;
        document.getElementById("board_player2").disabled = false;
        let cell = e.target; // get the element clicked
        console.log( cell.textContent) //display the coordinates in the console
        cell.style.visibility = 'hidden';// this  means that the contents of the element will be invisible, but the element stays in its original position and size / try it clicking on any of the black cells (in your browser) and see whats happens
        //cell.style.background ="purple"; //with this propertie you can change the background color of the clicked cell. try comment the line bellow and uncomment this line. Do not forget to save this file and refresh the borwser to see the changes
        let coordp2 = cell.textContent.split(',')
        console.log(coordp2,"array")
        var x = parseInt(coordp2[0])
        var y = parseInt(coordp2[1])
        disparar(player2,x,y)//player 1 shot player2 in her board
        currentplayer = player2;//CAMBIA TURNO
        opponent = player1;
        player = currentplayer.name;
        livesp1 = player1.shipCount;
        livesp2 = player2.shipCount;
        document.getElementById("turn_player").textContent = player;
        document.getElementById("ships_player1").textContent = livesp1;
        document.getElementById("ships_player2").textContent = livesp2;
        if ((player1.shipCount === 0) || (player2.shipCount === 0)){
            alert ("I am sorry you loose all your ships the GAME IS OVER");
            refreshPage();
        }
      });
      li.appendChild(cell); //adding each cell into the row number x
    }
     board_player2.appendChild(li); //adding each row into the board
}

createButtons();
createShip(player1, 4)
//console.log("Player 1 " + JSON.stringify(player1.gameBoard));
console.log("Player 1 " + player1.gameBoard);
createShip(player2, 4)
console.log("Player 2 " + player2.gameBoard);
//console.log("Player 2 " + JSON.stringify(player2.gameBoard));


setTimeout(function(){ 
  player1.name = prompt ('Welcome, what is your name?')
  player2.name = prompt ('Welcome, what is your name?')
  alert ("We will play the Battleship Game")
  alert ("You will have one turn at the time")
});






/// FALTA WINNER 