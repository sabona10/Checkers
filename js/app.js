/*------ app states ----- */

let moves;
let turn = 1;
let winner;

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
  renderBoard();
}

function renderBoard() {
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
        var bchip = document.createElement("div");
        bchip.className = "chips blackchips";
        square.appendChild(bchip);
        square.classList.toggle("hasChip");

        // add red chips
        if (squares.length - i > 0) {
          var rchip = document.createElement("div");
          rchip.className = "chips redchips";
          // console.log(squares.length - i );
          squares[squares.length - i - 1].appendChild(rchip);
          squares[squares.length - i - 1].classList.toggle("hasChip");
          chips -= 1;
        }
      }
    }
  }
  //make board, changing classes to
}
// function myFunction(){
//     console.log(this);
// }
let nextMove;

function movePiece(from, to) {
  //clear from square
  // from = eval(from);
  // to = eval(to);

  // console.log(squares[from])
  // squares[from].classList.toggle(squares[from].classList[squares[from].classList.length-1])
//   console.log(from, to);
  squares[to].appendChild(squares[from].firstElementChild);
  // squares[to].classList.toggle(squares[to].classList[squares[to].classList.length-1])
  squares[to].classList.toggle("hasChip");
  squares[from].innerHTML = "";
  squares[from].classList.toggle("hasChip");
  if (Math.abs(from - to) > 10) {
    //remove chip with remove# class
    // var elements = ;
    // let elements = document.getElementsByClassName('black');
    // for (var i = 0; i < elements.length; i++) {
    squares[to].classList.forEach((name) => {
      if (name.substring(0, 3) === "rmv") {
        console.log("heere");
        squares[eval(name.substring(3, name.length))].innerHTML = "";
        squares[eval(name.substring(3, name.length))].classList.toggle(
          "hasChip"
        );
        squares[to].classList.remove(name);
      }
      if (!isNaN(name)) squares[to].classList.remove(name);
      // console.log(name)
    });
    // }

    var elements = document.getElementsByClassName("black");
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.forEach((name) => {
        if (name.substring(0, 3) === "rmv") {
          // squares[eval(name.substring(3,name.length))].innerHTML = '';
          // squares[eval(name.substring(3,name.length))].classList.toggle('hasChip');
          elements[i].classList.remove(name);
        }
        if (!isNaN(name)) elements[i].classList.remove(name);
        // console.log(name)
      });
    }

    console.log("remove chip");
  } else {
    //remove class remove# from every element
    let elements = document.getElementsByClassName("black");
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.forEach((name) => {
        if (name.substring(0, 3) === "rmv") {
          // squares[eval(name.substring(3,name.length))].innerHTML = '';
          // squares[eval(name.substring(3,name.length))].classList.toggle('hasChip');
          elements[i].classList.remove(name);
        }
        if (!isNaN(name)) elements[i].classList.remove(name);
        // console.log(name)
      });
    }
  }
}

function giveOptions(pieceClicked) {}

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
  //make board, changing classes to
  // for (var i = 0; i < this.getElementsByClassName('piece').length; i++) {
  //     this.getElementsByClassName('piece')[i].addEventListener('click', myFunction, false);
  // }

  
  
  if (this.matches(".highlighted")) {
    this.classList.toggle("highlighted");
    // this.classList.toggle(this.classList[this.classList.length-1]);
    this.classList.forEach((name) => {
      // if(name === 'highlighted') elements[i].classList.remove(name);
      if (!isNaN(name)) from = name;
      // console.log(name)
    });
    movePiece(from, this.id - 1);
    // console.log(this.classList[this.classList.length-1]);

    if(!document.getElementsByClassName('redchips').length) console.log("black wins");
    if(!document.getElementsByClassName('blackchips').length) console.log("red wins");
    turn = Math.abs(turn-1);
    clearHighlights();

    return;
    // throw new Error();
  } else clearHighlights();

  clearHighlights();
  if (this.firstElementChild != null && this.firstElementChild.classList.contains("redchips")  != turn) return;
  
//   if (this.firstElementChild != null && this.firstElementChild.classList.contains("blackchips")) {
//       if (turn != 1) {
//         return;
//       }
      
//       //   return;
//     }else if (this.firstElementChild != null && this.firstElementChild.classList.contains("redchips")){
//         if (turn == 1){ 
//             return;
//         }
//         // if (this.firstElementChild != null && this.firstElementChild.classList.contains("blackchips")  == turn) return;

//     }
//   if (this.firstElementChild != null && !this.firstElementChild.classList.contains("redchips")  == turn) return;
//   if (this.firstElementChild != null && !this.firstElementChild.classList.contains("blackchips")  == turn) return;
//   if (this.firstElementChild.classList.contains("redchips")  != turn) return;

  if (
    this.matches(".hasChip") &&
    this.firstElementChild.classList.contains("blackchips")
  ) {
    nextMoves = [eval(this.id) + 9, eval(this.id) + 7];
    //get option for black
    if (
      !squares[nextMoves[0] - 1].matches(".hasChip") &&
      squares[nextMoves[0] - 1].matches(".black")
    ) {
      squares[nextMoves[0] - 1].classList.add("highlighted", this.id - 1);
      // squares[nextMoves[0] - 1].classList.toggle(this.id - 1);
      // console.log("yaay");
      // console.log("---");
      //cant move for now
    } else if (
      squares[nextMoves[0] - 1].matches(".hasChip") &&
      !squares[nextMoves[0] - 1].firstElementChild.classList.contains(
        "blackchips"
      ) &&
      !squares[nextMoves[0] + 9 - 1].matches(".hasChip") &&
      squares[nextMoves[0] + 9 - 1].matches(".black")
    ) {
      // squares[nextMoves[0] - 1].classList.toggle(this.id - 1);
      squares[nextMoves[0] + 9 - 1].classList.add(
        "highlighted",
        "rmv" + (nextMoves[0] - 1),
        this.id - 1
      );
      // squares[(nextMoves[0]+9) - 1].classList.toggle('highlighted');
      // squares[(nextMoves[0]+9) - 1].classList.toggle('rmv'+(nextMoves[0] - 1));
      // squares[(nextMoves[0]+9) - 1].classList.toggle(this.id - 1);
    }
    if (
      !squares[nextMoves[1] - 1].matches(".hasChip") &&
      squares[nextMoves[1] - 1].matches(".black")
    ) {
      squares[nextMoves[1] - 1].classList.add("highlighted", this.id - 1);
      // squares[nextMoves[1] - 1].classList.toggle('highlighted');
      // squares[nextMoves[1] - 1].classList.toggle(this.id - 1);
      // console.log("yee");
      // console.log("----");
    } else if (
      squares[nextMoves[1] - 1].matches(".hasChip") &&
      !squares[nextMoves[1] - 1].firstElementChild.classList.contains(
        "blackchips"
      ) &&
      !squares[nextMoves[1] + 7 - 1].matches(".hasChip") &&
      squares[nextMoves[1] + 7 - 1].matches(".black")
    ) {
      // squares[nextMoves[0] - 1].classList.toggle(this.id - 1);
      squares[nextMoves[1] + 7 - 1].classList.add(
        "highlighted",
        "rmv" + (nextMoves[1] - 1),
        this.id - 1
      );
      // squares[(nextMoves[1]+7) - 1].classList.toggle('highlighted');
      // squares[(nextMoves[1]+7) - 1].classList.toggle('rmv'+(nextMoves[1] - 1));
      // squares[(nextMoves[1]+7) - 1].classList.toggle(this.id - 1);
    }

    // console.log(squares[nextMoves[0]-1]);
    // console.log(nextMoves)
  } else if (
    this.matches(".hasChip.black") &&
    this.firstElementChild.classList.contains("redchips")
  ) {
    //option for red chips
    nextMoves = [eval(this.id) - 9, eval(this.id) - 7];

    if (
      !squares[nextMoves[0] - 1].matches(".hasChip") &&
      squares[nextMoves[0] - 1].matches(".black")
    ) {
      squares[nextMoves[0] - 1].classList.add("highlighted", this.id - 1);
      // squares[nextMoves[0] - 1].classList.toggle('highlighted');
      // squares[nextMoves[0] - 1].classList.toggle(this.id - 1);
      // console.log("yaay");
      // console.log("---");
      //cant move for now
    } else if (
      squares[nextMoves[0] - 1].matches(".hasChip") &&
      !squares[nextMoves[0] - 1].firstElementChild.classList.contains(
        "redchips"
      ) &&
      !squares[nextMoves[0] - 9 - 1].matches(".hasChip") &&
      squares[nextMoves[0] - 9 - 1].matches(".black")
    ) {
      // squares[nextMoves[0] - 1].classList.toggle(this.id - 1);
      squares[nextMoves[0] - 9 - 1].classList.add(
        "highlighted",
        "rmv" + (nextMoves[0] - 1),
        this.id - 1
      );
      // squares[(nextMoves[0]-9) - 1].classList.toggle('highlighted');
      // squares[(nextMoves[0]-9) - 1].classList.toggle('rmv'+(nextMoves[0] - 1));
      // squares[(nextMoves[0]-9) - 1].classList.toggle(this.id - 1);
    }

    // if (!squares[nextMoves[0] - 1].matches('.hasChip') && squares[nextMoves[0] - 1].matches('.black')) {
    //     squares[nextMoves[0] - 1].classList.toggle('highlighted');
    //     squares[nextMoves[0] - 1].classList.toggle(this.id - 1);
    //     console.log("yaay");
    //     console.log("---");
    //     //cant move for now
    // }
    // if (!squares[nextMoves[1] - 1].matches('.hasChip') && squares[nextMoves[1] - 1].matches('.black')) {
    //     squares[nextMoves[1] - 1].classList.toggle('highlighted');
    //     squares[nextMoves[1] - 1].classList.toggle(this.id - 1);
    //     console.log("yee");
    //     console.log("----");
    // }
    if (
      !squares[nextMoves[1] - 1].matches(".hasChip") &&
      squares[nextMoves[1] - 1].matches(".black")
    ) {
      squares[nextMoves[1] - 1].classList.add("highlighted", this.id - 1);
      // squares[nextMoves[1] - 1].classList.toggle('highlighted');
      // squares[nextMoves[1] - 1].classList.toggle(this.id - 1);
      // console.log("yee");
      // console.log("----");
    } else if (
      squares[nextMoves[1] - 1].matches(".hasChip") &&
      !squares[nextMoves[1] - 1].firstElementChild.classList.contains(
        "redchips"
      ) &&
      !squares[nextMoves[1] - 7 - 1].matches(".hasChip") &&
      squares[nextMoves[1] - 7 - 1].matches(".black")
    ) {
      // squares[nextMoves[0] - 1].classList.toggle(this.id - 1);
      squares[nextMoves[1] - 7 - 1].classList.add(
        "highlighted",
        "rmv" + (nextMoves[1] - 1),
        this.id - 1
      );
      // squares[(nextMoves[1]-7) - 1].classList.toggle('highlighted');
      // squares[(nextMoves[1]-7) - 1].classList.toggle('rmv'+(nextMoves[1] - 1));
      // squares[(nextMoves[1]-7) - 1].classList.toggle(this.id - 1);
    }
    // console.log(nextMoves)
    // }
    // console.log(this);
    nextMove = this;
    // if (!board[nextMoves[0]].matches('.hasChip')){

    // }
  }

  
}
