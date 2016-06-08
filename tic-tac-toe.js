/**
 * Created by Michael on 8/12/2015.
 */
$(document).ready(function() {

function board() {
    var squares = [1,2,3,4,5,6,7,8,9];
    var whoTurn = 'X';
    var playturn = 'X';
    var compturn = 'O';
    playAsX = function() {
        playturn = 'X';
        compturn = 'O';
    };
    playAsO = function () {
        playturn= 'O';
        compturn = 'X';
        chooseSquare(7);
    };
    returnCompPlayer = function() {
        return compturn;
    };
    returnPlayer = function() {
        return playturn;
    };
    playerTurn = function() {
       // console.log(whoTurn);
        return whoTurn;
    };
    changeTurn = function() {
        if (whoTurn == 'X') {
            whoTurn='O';
        }
        else if (whoTurn == 'O') {
            whoTurn='X';
        }
    };
    returnBoard = function() {
       // console.log(squares);
        return squares;
    };
    logBoard = function(){
        console.log(squares);
    };

    xTurn = function(thisSquare) {
        thisSquare = thisSquare-1;
        squares[thisSquare] = 'X';
        checkForWinner(whoTurn);
        whoTurn = 'O';
      //  checkPlayer = 'X';
    };
    oTurn = function(thisSquare) {
        thisSquare--;
        squares[thisSquare] = 'O';
        checkForWinner(whoTurn);
        whoTurn = 'X';
       // checkPlayer = 'O';
    };
    chooseSquare = function(thisSquare) {
        if (squareEmpty(thisSquare,squares) == true) {
            $('#s'+thisSquare).html(whoTurn);
            if (whoTurn == 'X') {
                $('#s' + thisSquare).html('<img src = "http://www.signnetwork.com/decals/Decals/CARTOONS/Cartoon_Characters/images/Bat%20man1.jpg"></img>');
            }
            else {
                $('#s' + thisSquare).html('<img src = "http://www.clipartbest.com/cliparts/dT7/oMd/dT7oMdyBc.jpeg"></img>');
            }
        if (whoTurn == 'X') {
            xTurn(thisSquare);
        }
        else if (whoTurn == 'O') {
            oTurn(thisSquare);
        }}
        else {
            console.log('Used');
        }
    };
    checkFreeSquares = function() {
        var freeSquares = [];
        for (var thisSquare = 0; thisSquare < squares.length; thisSquare++){
            if (squares[thisSquare] > 0 && squares[thisSquare] < 10) {
                freeSquares.push(squares[thisSquare]);
            }
        }
        return freeSquares;
    };
    squaresLeft = function() {
        var howMany = 9;
        for (var thisSquare = 0; thisSquare < squares.length; thisSquare++){
            if (squares[thisSquare] > 0 && squares[thisSquare] < 10) {
                howMany--;
            }
        }
        //console.log(howMany);
        return howMany;
    };
    squareEmpty = function(thisSquare){
        // squares = returnBoard();
        thisSquare--;
        if (squares[thisSquare] != 'X' && squares[thisSquare] != 'O') {
           // console.log('Empty');
            return true
        }
        else {
            //  console.log('Not Empty');
            return false;
        }
    };
    checkForWinner = function(checkPlayer) {

        var winningCombos = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
        var i = 0;
        while (i < 8) {
           // i++;
            if (squares[(winningCombos[i][0])-1] == returnPlayer() && squares[(winningCombos[i][1])-1] == returnPlayer() && squares[(winningCombos[i][2])-1] == returnPlayer()){
                $('#game').html('You Win! ');
                $('#playx').show();
                $('#playo').show();

                squares = ['X','X','X','X','X','X','X','X','X'];
                // console.log(squares[winningCombos]);
                return 1;
            }
            else if (squares[(winningCombos[i][0])-1] == returnCompPlayer() && squares[(winningCombos[i][1])-1] == returnCompPlayer() && squares[(winningCombos[i][2])-1] == returnCompPlayer()){
                $('#game').html('Computer Wins! ');
                $('#playx').show();
                $('#playo').show();
                squares = ['X','X','X','X','X','X','X','X','X'];
                // console.log(squares[winningCombos]);
                return -1;
            }
              //  console.log(checkFreeSquares().length)

            else {
                i++;
                //return false;
            }

        }
        if (checkFreeSquares().length == 0) {
            $('#game').html('Tie!');
            $('#playx').show();
            $('#playo').show();


            // console.log(squares[winningCombos]);
            return 0;
        }
    };
}

lastResort = function () {
    var x = checkFreeSquares();
    chooseSquare(x[0]);
};



chooseBestMove = function() {
    var idealSquares = [5,1,3,7,9];
    var squarepicked = false;
    var y = returnBoard();
    var x = 0;
    while (x < idealSquares.length && squarepicked == false){
        if (squareEmpty(idealSquares[x],y)) {
            chooseSquare(idealSquares[x]);
            squarepicked = true;
            //chooseBestMove();
            return squarepicked;
        }
        x++;
    }
    if (squarepicked == false) {
        lastResort();
    }
};
pickWinningSquare = function() {
    var idealSquares = [];
    var thisBoard = returnBoard();
    for (var e in thisBoard) {
        idealSquares.push(thisBoard[e]);
    }
    //logBoard();
    var free = checkFreeSquares();
    //console.log(free);
    var squarepicked = false;
    var turn = playerTurn();
        for (var z in free){
            var check1 = (free[z])-1;

        var winningCombos = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
        var i = 0;
           if (idealSquares[0] == returnPlayer() && idealSquares[8] == returnPlayer() && free.length == 6) {
               chooseSquare(6);
               squarepicked=true;
           }
            else if (idealSquares[2] == returnPlayer() && idealSquares[6] == returnPlayer() && free.length == 6) {
                chooseSquare(4);
                squarepicked=true;
            }
            else {
               while (i < 8 && squarepicked == false) {
                   idealSquares[check1] = turn;
                   if (idealSquares[(winningCombos[i][0]) - 1] == turn && idealSquares[(winningCombos[i][1]) - 1] == turn && idealSquares[(winningCombos[i][2]) - 1] == turn) {
                       chooseSquare(check1 + 1);
                       squarepicked = true;
                       return squarepicked;
                   }
                   else {

                       idealSquares[check1] = 99;
                       i++;
                   }
               }
           }
        }
    if (squarepicked == false) {
        checkOppSquare();
    }
    };


checkOppSquare = function() {
    var idealSquares = [];
    var thisBoard = returnBoard();
    for (var e in thisBoard) {
        idealSquares.push(thisBoard[e]);
    }
   // logBoard();
    var free = checkFreeSquares();
    //console.log(free);
    var squarepicked = false;
    var turn = playerTurn();
    if (turn == 'X') {
        turn = 'O';
    }
    else if (turn == 'O') {
        turn = 'X';
    }

    for (var z in free){
        var check1 = (free[z])-1;


        var winningCombos = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
        var i = 0;
        while (i < 8 && squarepicked == false) {
            idealSquares[check1] = turn;
            if (idealSquares[(winningCombos[i][0]) - 1] == turn && idealSquares[(winningCombos[i][1]) - 1] == turn && idealSquares[(winningCombos[i][2]) - 1] == turn) {
                chooseSquare(check1+1);
                squarepicked=true;
                return squarepicked;
            }
            else {

                idealSquares[check1]= 99;
                i++;
            }
        }

    }
    if (squarepicked == false) {
           chooseBestMove();
    }
};
computerMove = function() {
    pickWinningSquare();
};


    $('#reset').hide();
    $('#s1').click(function() {
            chooseSquare(1);
        if (playerTurn() == returnCompPlayer()) {
            computerMove();
        }
    });
    $('#s2').click(function() {
        chooseSquare(2);
        if (playerTurn() == returnCompPlayer()) {
            computerMove();
        }
    });
    $('#s3').click(function() {
        chooseSquare(3);
        if (playerTurn() == returnCompPlayer()) {
            computerMove();
        }
    });
    $('#s4').click(function() {
        chooseSquare(4);
        if (playerTurn() == returnCompPlayer()) {
            computerMove();
        }
    });
    $('#s5').click(function() {
        chooseSquare(5);
        if (playerTurn() == returnCompPlayer()) {
            computerMove();
        }
    });
    $('#s6').click(function() {
        chooseSquare(6);
        if (playerTurn() == returnCompPlayer()) {
            computerMove();
        }
    });
    $('#s7').click(function() {
        chooseSquare(7);
        if (playerTurn() == returnCompPlayer()) {
            computerMove();
        }
    });
    $('#s8').click(function() {
        chooseSquare(8);
        if (playerTurn() == returnCompPlayer()) {
            computerMove();
        }
    });
    $('#s9').click(function() {
        chooseSquare(9);
        if (playerTurn() == returnCompPlayer()) {
            computerMove();
        }
    });
    $('#reset').click(function() {
        board();
        for (var a = 1; a <=9; a++){
            $('#s'+a).html('');
        }
        $('#reset').hide();

    });
    $('#playo').click(function() {
        board();
        for (var a = 1; a <=9; a++){
            $('#s'+a).html('');
        }
        $('#reset').hide();
        playAsO();
        $('#playo').hide();
        $('#playx').hide();
        $('#game').html('');
        $('#joker').hide();
        $('#batman').hide();
        $('#tiegame').hide();
    });
    $('#playx').click(function() {
        board();
        for (var a = 1; a <=9; a++){
            $('#s'+a).html('');
        }
        $('#reset').hide();
        $('#playx').hide();
        $('#playo').hide();
        $('#game').html('');
        $('#joker').hide();
        $('#batman').hide();
        $('#tiegame').hide();
    })


});
