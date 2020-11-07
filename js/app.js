/*------ app states ----- */

let moves;
let turn;
let winner;

/*------ cached element references ----- */


let board = document.getElementById('container');
let button = document.getElementById('playAgain');
let message = document.querySelector('h2');
// let chip = document.query


/*------ event listeners ----- */

for (var i = 0; i < board.getElementsByClassName('piece').length; i++) {
    board.getElementsByClassName('piece')[i].addEventListener('click', handleClick, false);
}
// board.addEventListener('click', handleClick);
button.addEventListener('click', init);



/*------ functions ----- */

init()

function init() {
    turn = 1;
    winner = null;
    renderBoard();
}

let squares = board.getElementsByClassName('piece');
let c = 0;
let chips = 12;
for (let i = 0; i < squares.length; i++) {

    const square = squares[i];
    if (i % 8 == 0) c += 1;
    if ((i + c) % 2 == 1) {
        // console.log(square);
        // console.log(i);
        square.classList.toggle("black");
        if (chips) {
            // add black chips
            var bchip = document.createElement('div')
            bchip.className = 'chips blackchips';
            square.appendChild(bchip);
            square.classList.toggle("hasChip");

            // add red chips
            if (squares.length - i > 0) {
                var rchip = document.createElement('div')
                rchip.className = 'chips redchips';
                // console.log(squares.length - i );
                squares[squares.length - i - 1].appendChild(rchip);
                squares[squares.length - i - 1].classList.toggle("hasChip");
                chips -= 1;
            }
        }


    }

}

function renderBoard() {
    //make board, changing classes to 

}
// function myFunction(){
//     console.log(this);
// }
let nextMove;

function movePiece(from,to) {
    //clear from square
    // from = eval(from);
    // to = eval(to);

    // console.log(squares[from])
    // squares[from].classList.toggle(squares[from].classList[squares[from].classList.length-1])
    squares[to].appendChild(squares[from].firstElementChild);
    // squares[to].classList.toggle(squares[to].classList[squares[to].classList.length-1])
    squares[to].classList.toggle('hasChip');
    squares[from].innerHTML = '';
    squares[from].classList.toggle('hasChip');
    // console.log(from,to);

}

function giveOptions(pieceClicked){

}

function clearOptions(){

}

function handleClick() {
    //make board, changing classes to 
    // for (var i = 0; i < this.getElementsByClassName('piece').length; i++) {
    //     this.getElementsByClassName('piece')[i].addEventListener('click', myFunction, false);
    // }

    if (this.matches('.highlighted')){
        this.classList.toggle('highlighted');
        // this.classList.toggle(this.classList[this.classList.length-1]);
        movePiece(this.classList[this.classList.length-1], this.id-1);
        // console.log(this.classList[this.classList.length-1]);

        
        let elements = document.getElementsByClassName('black');
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.forEach(name => {
                if(name === 'highlighted') elements[i].classList.remove(name);
                if(!isNaN(name)) elements[i].classList.remove(name);
                // console.log(name)
                })
            }
        return;
        // throw new Error();
        
    }

    if (this.matches('.hasChip') && this.firstElementChild.classList.contains('blackchips')) {
        nextMoves = [eval(this.id) + 9, eval(this.id) + 7];
        //get option for black
        if (!squares[nextMoves[0] - 1].matches('.hasChip') && squares[nextMoves[0] - 1].matches('.black')) {
            squares[nextMoves[0] - 1].classList.toggle('highlighted');
            squares[nextMoves[0] - 1].classList.toggle(this.id - 1);
            console.log("yaay");
            console.log("---");
            //cant move for now
        }
        if (!squares[nextMoves[1] - 1].matches('.hasChip') && squares[nextMoves[1] - 1].matches('.black')) {
            squares[nextMoves[1] - 1].classList.toggle('highlighted');
            squares[nextMoves[1] - 1].classList.toggle(this.id - 1);
            console.log("yee");
            console.log("----");
        }

        // console.log(squares[nextMoves[0]-1]);
        // console.log(nextMoves)
    } else if (this.matches('.hasChip') && this.firstElementChild.classList.contains('redchips')) {
        //option for red chips
        nextMoves = [eval(this.id) - 9, eval(this.id) - 7];
        if (!squares[nextMoves[0] - 1].matches('.hasChip') && squares[nextMoves[0] - 1].matches('.black')) {
            squares[nextMoves[0] - 1].classList.toggle('highlighted');
            squares[nextMoves[0] - 1].classList.toggle(this.id - 1);
            console.log("yaay");
            console.log("---");
            //cant move for now
        }
        if (!squares[nextMoves[1] - 1].matches('.hasChip') && squares[nextMoves[1] - 1].matches('.black')) {
            squares[nextMoves[1] - 1].classList.toggle('highlighted');
            squares[nextMoves[1] - 1].classList.toggle(this.id - 1);
            console.log("yee");
            console.log("----");
        }
        // console.log(nextMoves)
        // }
        // console.log(this);
        nextMove = this;
        // if (!board[nextMoves[0]].matches('.hasChip')){

        // }
    }
}