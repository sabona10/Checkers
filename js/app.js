/*------ app states ----- */

let moves;
let turn;
let winner;

/*------ cached element references ----- */


let board = document.getElementById('container');
let button = document.getElementById('playAgain');
let message = document.querySelector('h2');


/*------ event listeners ----- */
board.addEventListener('click', handleClick);
button.addEventListener('click', init);


/*------ functions ----- */

init()

function init(){
    turn = 1;
    winner = null;
    renderBoard();
}

let squares = board.getElementsByClassName('piece');
let c = 0;
let chips = 12;
for (let i = 0; i < squares.length; i++) {
    
    const square = squares[i];
    if(i%8 == 0) c += 1;
    if ((i+c)%2 == 1) {
        // console.log(square);
        // console.log(i);
        square.classList.toggle("black");
        if(chips){
            // add black chips
            var bchip = document.createElement('div')
            bchip.className = 'chips blackchips';
            square.appendChild(bchip);
            square.classList.toggle("hasChip");
            
            // add red chips
            if (squares.length - i > 0){
                var rchip = document.createElement('div')
                rchip.className = 'chips redchips';
                // console.log(squares.length - i );
                squares[squares.length - i -1].appendChild(rchip);
                squares[squares.length - i -1].classList.toggle("hasChip");
                chips -= 1;
            }
        }

        
    }
    
} 

function renderBoard(){
    //make board, changing classes to 
    
} 

function handleClick(){
    //make board, changing classes to 
    
} 