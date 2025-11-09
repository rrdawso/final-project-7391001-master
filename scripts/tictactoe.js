var turn = undefined;
var squareturn = "X";
var warningmessage = undefined

function startGame() { // When user loads in game page, game automaticaly starts
turn = "It is your turn! Your letter is X.";
document.getElementById("turntext").innerHTML = turn;
}

function nextMove(square) { // Set square to text variable and call SwitchTurn
    if (square.InnerText !== "X" || "O") { // Checking for no value was not working, so this instead checks if the square does not have X or O inside the text.
        square.innerText = squareturn;
        turn = "It's Player2's turn! Their letter is O.";  
        document.getElementById("turntext").innerHTML = turn;
        switchTurn();
    } else {
        warningmessage = "That square is already been used! Please choose an empty square."
        console.log("CANNOT FILL IN SQUARE: Square has already been used!")
        document.getElementById("warningmessage").style.visibility  = "visible"
        document.getElementById("warningmessage").InnerText = warningmessage
    }
    
    
}

function switchTurn() { // When a square is pressed, this function is called to change the squaretext variable to the correct turn
    if (squareturn == "X") {
        squareturn = "O";
        square.innerText = squareturn;
    } else {
        turn = "It's Player1's turn! Your letter is X.";
        document.getElementById("turntext").innerHTML = turn;
        squareturn = "X";
        square.innerText = squareturn;
    }
}