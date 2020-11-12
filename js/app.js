/*------ app states ----- */

let turn = 1;
let anotherMove = 0;

/*------ cached element references ----- */

let board = document.getElementById("container");
let button = document.getElementById("playAgain");
let message = document.querySelector("h2");
let squares = board.getElementsByClassName("piece");
// let chip = document.query

/*------ event listeners ----- */

for (var i = 0; i < board.getElementsByClassName("piece").length; i++) {
    board
        .getElementsByClassName("piece")
    [i].addEventListener("click", handleClick, false);
}
// board.addEventListener('click', handleClick);
button.addEventListener("click", init);

/*------ functions ----- */

init();

function init() {
    winner = null;
    moves = [];
    for (let i = 0; i < squares.length; i++) {
        moves.push({
            empty: true,
            color: null,
            queen: false
        })
    }
    renderBoard(true);
}

function renderBoard(firstrun) {
    let c = 0;
    let chips = 0;
    if (firstrun) chips = 12;
    for (let i = 0; i < squares.length; i++) {
        square = squares[i];
        if (i % 8 == 0) c += 1;
        if ((i + c) % 2 == 1) {
            square.classList.add("black");

            if (chips) {
                // add black chips
                moves[i] = { ...moves[i], empty: false, color: 'black', queen: false };
                let bchip = document.createElement("div");
                bchip.className = "chips blackchips";
                square.appendChild(bchip);
                square.classList.toggle("hasChip");

                // add red chips
                if (squares.length - i > 0) {
                    moves[squares.length - i - 1] = { ...moves[squares.length - i - 1], empty: false, color: 'red', queen: false }
                    let rchip = document.createElement("div");
                    rchip.className = "chips redchips";
                    squares[squares.length - i - 1].appendChild(rchip);
                    squares[squares.length - i - 1].classList.toggle("hasChip");
                }
                chips -= 1;
            }

            if (firstrun) continue;
            square.innerHTML = '';
            square.className = 'piece black';
            if (!moves[i].empty) {
                let bchip = document.createElement("div");
                bchip.className = `chips ${moves[i].queen ? 'queenchip' : ''} ${moves[i].color}chips`;
                square.appendChild(bchip);
                square.classList.toggle("hasChip");

            }

        }
    }

}
function movePiece(from, to) {
    moves[to] = { ...moves[to], color: moves[from].color, empty: moves[from].empty, queen: moves[from].queen };
    moves[from] = { ...moves[from], color: null, empty: true, queen: false };
    squares[to].appendChild(squares[from].firstElementChild);

    squares[to].classList.toggle("hasChip");
    squares[from].innerHTML = "";
    squares[from].classList.toggle("hasChip");
    if (Math.abs(from - to) > 10) {
        squares[to].classList.forEach((name) => {
            if (name.substring(0, 3) === "rmv") {
                moves[eval(name.substring(3, name.length))] = { ...moves[eval(name.substring(3, name.length))], color: null, empty: true, queen: false };
                squares[eval(name.substring(3, name.length))].innerHTML = "";
            }
        });
        console.log("remove chip");
    }
    renderBoard(false);
    if (!document.getElementsByClassName("redchips").length) {
        message.textContent = `black wins`;
        return;
    }
    // console.log("black wins");
    if (!document.getElementsByClassName("blackchips").length) {
        message.textContent = `red wins`;
        return;
    }
}

function clearHighlights() {
    let elements = document.getElementsByClassName("piece");
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.forEach((name) => {
            if (name === "highlighted") elements[i].classList.remove(name);
            if (!isNaN(name)) elements[i].classList.remove(name);
            if (name.substring(0, 3) === "rmv") elements[i].classList.remove(name);
            // console.log(name)
        });
    }
}

function handleClick() {
    if (!document.getElementsByClassName("redchips").length) {
        message.textContent = `black wins`;
        return;
    }
    if (!document.getElementsByClassName("blackchips").length) {
        message.textContent = `red wins`;
        return;
    }
    message.textContent = `Player ${turn > 0 ? 1 : 2}'s turn`;

    if (this.matches(".highlighted")) {
        this.classList.toggle("highlighted");
        this.classList.forEach((name) => {
            // if(name === 'highlighted') elements[i].classList.remove(name);
            if (!isNaN(name)) from = name;
            // console.log(name)
        });
        movePiece(from, this.id - 1);
        
        if (this.firstElementChild.classList.contains("blackchips") && !this.firstElementChild.classList.contains("queenchip") && this.id >= 57) {
            moves[this.id - 1].queen = true;
            this.firstElementChild.classList.add("queenchip");
        }
        if (this.firstElementChild.classList.contains("redchips") && !this.firstElementChild.classList.contains("queenchip") && this.id <= 8) {
            moves[this.id - 1].queen = true;
            this.firstElementChild.classList.add("queenchip");
        }
        if (moves[this.id - 1].queen){
            nextMoves = [eval(this.id) + 9, eval(this.id) + 7];
            if (nextMoves[0] + 9 - 1 < 64 && squares[nextMoves[0] - 1].matches(".hasChip") && !squares[nextMoves[0] - 1].firstElementChild.classList.contains(moves[this.id - 1].color+"chips") && !squares[nextMoves[0] + 9 - 1].matches(".hasChip") && squares[nextMoves[0] + 9 - 1].matches(".black")) anotherMove = 1;
            if (nextMoves[1] + 9 - 1 < 64 && squares[nextMoves[1] - 1].matches(".hasChip") && !squares[nextMoves[1] - 1].firstElementChild.classList.contains(moves[this.id - 1].color +"chips") && !squares[nextMoves[1] + 7 - 1].matches(".hasChip") && squares[nextMoves[1] + 7 - 1].matches(".black")) anotherMove = 1;
            nextMoves = [eval(this.id) - 9, eval(this.id) - 7];
            if (nextMoves[0] - 9 - 1 > 0 && squares[nextMoves[0] - 1].matches(".hasChip") && !squares[nextMoves[0] - 1].firstElementChild.classList.contains(moves[this.id - 1].color +"chips") && !squares[nextMoves[0] - 9 - 1].matches(".hasChip") && squares[nextMoves[0] - 9 - 1].matches(".black")) anotherMove = 1;
            if (nextMoves[1] - 7 - 1 > 0 && squares[nextMoves[1] - 1].matches(".hasChip") && !squares[nextMoves[1] - 1].firstElementChild.classList.contains(moves[this.id - 1].color +"chips") && !squares[nextMoves[1] - 7 - 1].matches(".hasChip") && squares[nextMoves[1] - 7 - 1].matches(".black")) anotherMove = 1;

        }
        if (this.matches(".hasChip")) {
            nextMoves = [eval(this.id) + 9, eval(this.id) + 7];
            //get option for black
            if (nextMoves[0] + 9 - 1 < 64 && squares[nextMoves[0] - 1].matches(".hasChip") && !squares[nextMoves[0] - 1].firstElementChild.classList.contains("blackchips") && !squares[nextMoves[0] + 9 - 1].matches(".hasChip") && squares[nextMoves[0] + 9 - 1].matches(".black")) anotherMove = 1;
            if (nextMoves[1] + 9 - 1 < 64 && squares[nextMoves[1] - 1].matches(".hasChip") && !squares[nextMoves[1] - 1].firstElementChild.classList.contains("blackchips") && !squares[nextMoves[1] + 7 - 1].matches(".hasChip") && squares[nextMoves[1] + 7 - 1].matches(".black")) anotherMove = 1;
        }
        if (this.matches(".hasChip")) {
            // (eval(this.id) - 18) > 0 && // (eval(this.id) - 14) > 0
            //option for red chips
            nextMoves = [eval(this.id) - 9, eval(this.id) - 7];
            if (nextMoves[0] - 9 - 1 > 0 && squares[nextMoves[0] - 1].matches(".hasChip") && !squares[nextMoves[0] - 1].firstElementChild.classList.contains("redchips") && !squares[nextMoves[0] - 9 - 1].matches(".hasChip") && squares[nextMoves[0] - 9 - 1].matches(".black")) anotherMove = 1;
            if (nextMoves[1] - 7 - 1 > 0 && squares[nextMoves[1] - 1].matches(".hasChip") && !squares[nextMoves[1] - 1].firstElementChild.classList.contains("redchips") && !squares[nextMoves[1] - 7 - 1].matches(".hasChip") && squares[nextMoves[1] - 7 - 1].matches(".black")) anotherMove = 1;
        }

        console.log(anotherMove, Math.abs(from - (this.id - 1)));
        message.textContent = `Player ${turn > 0 ? 1 : 2}'s turn`;
        if (anotherMove && Math.abs(from - (this.id - 1)) > 10) {
            anotherMove = 0;
            return;
        }
        turn = Math.abs(turn - 1);
        message.textContent = `Player ${turn > 0 ? 1 : 2}'s turn`;
        clearHighlights();
        return;
    } else clearHighlights();
    clearHighlights();
    //turn regulator line **
    if (this.firstElementChild != null && this.firstElementChild.classList.contains("redchips") != turn) return;
    if (this.matches(".hasChip") && this.firstElementChild.classList.contains("blackchips") && this.firstElementChild.classList.contains("queenchip")) moveChip(this, "red", true);
    if (this.matches(".hasChip") && this.firstElementChild.classList.contains("redchips") && this.firstElementChild.classList.contains("queenchip")) moveChip(this, "black", true);
    if (this.matches(".hasChip") && this.firstElementChild.classList.contains("blackchips")) moveChip(this, "black", false);
    if (this.matches(".hasChip") && this.firstElementChild.classList.contains("redchips")) moveChip(this, "red", false);
}

function moveChip(thischip, chiptype, queen) {
    chip_to_take = chiptype;
    if (chiptype == "black" || queen) {
        if (!queen) chip_to_take = "red";
        nextMoves = [eval(thischip.id) + 9, eval(thischip.id) + 7];
        //get option for black
        if (nextMoves[0] - 1 < 64 && !squares[nextMoves[0] - 1].matches(".hasChip") && squares[nextMoves[0] - 1].matches(".black")) squares[nextMoves[0] - 1].classList.add("highlighted", thischip.id - 1);

        if (nextMoves[0] + 9 - 1 < 64 && squares[nextMoves[0] - 1].matches(".hasChip") && squares[nextMoves[0] - 1].firstElementChild.classList.contains(chip_to_take + "chips") && !squares[nextMoves[0] + 9 - 1].matches(".hasChip") && squares[nextMoves[0] + 9 - 1].matches(".black")) squares[nextMoves[0] + 9 - 1].classList.add("highlighted", "rmv" + (nextMoves[0] - 1), thischip.id - 1);

        if (nextMoves[1] - 1 < 64 && !squares[nextMoves[1] - 1].matches(".hasChip") && squares[nextMoves[1] - 1].matches(".black")) squares[nextMoves[1] - 1].classList.add("highlighted", thischip.id - 1);

        if (nextMoves[1] + 7 - 1 < 64 && squares[nextMoves[1] - 1].matches(".hasChip") && squares[nextMoves[1] - 1].firstElementChild.classList.contains(chip_to_take + "chips") && !squares[nextMoves[1] + 7 - 1].matches(".hasChip") && squares[nextMoves[1] + 7 - 1].matches(".black")) squares[nextMoves[1] + 7 - 1].classList.add("highlighted", "rmv" + (nextMoves[1] - 1), thischip.id - 1);
    }
    if (chiptype == "red" || queen) {
        if (!queen) chip_to_take = "black";
        //option for red chips
        nextMoves = [eval(thischip.id) - 9, eval(thischip.id) - 7];
        if (nextMoves[0] - 1 >= 0 && !squares[nextMoves[0] - 1].matches(".hasChip") && squares[nextMoves[0] - 1].matches(".black")) squares[nextMoves[0] - 1].classList.add("highlighted", thischip.id - 1);

        if (nextMoves[0] - 9 - 1 >= 0 && squares[nextMoves[0] - 1].matches(".hasChip") && squares[nextMoves[0] - 1].firstElementChild.classList.contains(chip_to_take + "chips") && !squares[nextMoves[0] - 9 - 1].matches(".hasChip") && squares[nextMoves[0] - 9 - 1].matches(".black")) squares[nextMoves[0] - 9 - 1].classList.add("highlighted", "rmv" + (nextMoves[0] - 1), thischip.id - 1);

        if (nextMoves[1] - 1 >= 0 && !squares[nextMoves[1] - 1].matches(".hasChip") && squares[nextMoves[1] - 1].matches(".black")) squares[nextMoves[1] - 1].classList.add("highlighted", thischip.id - 1);

        if (nextMoves[1] - 7 - 1 >= 0 && squares[nextMoves[1] - 1].matches(".hasChip") && squares[nextMoves[1] - 1].firstElementChild.classList.contains(chip_to_take + "chips") && !squares[nextMoves[1] - 7 - 1].matches(".hasChip") && squares[nextMoves[1] - 7 - 1].matches(".black")) squares[nextMoves[1] - 7 - 1].classList.add("highlighted", "rmv" + (nextMoves[1] - 1), thischip.id - 1);
    }
    if (queen) return;
}
