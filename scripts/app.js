const buttonsContainer = document.querySelector('.button-container');
const gameButtons = document.querySelectorAll('.gameButton');
const form = document.querySelector('form');
const resetbutton = document.querySelector('.reset');
const winnerMsg = document.querySelector('.p-winner-msg');

let turn = 1;
let PlayerOne = "";
let PlayerTwo = "";
let Winner = ";"
let matchEnded = false;

const winningMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

buttonsContainer.addEventListener('click', e => {
    if(!e.target.classList.contains('gameButton')) return;
    if(!matchEnded && turn === 1){
        turn = 0;
        e.target.innerText = 'X';
        e.target.disabled = true;
        checkWinner();
    }else if(!matchEnded && turn === 0){
        turn = 1;
        e.target.innerText = 'O';
        e.target.disabled = true;
        checkWinner();
    }
});

const resetButtons = () => {
    gameButtons.forEach(button => {
        button.disabled = false;
        button.innerText = '';
        button.style.borderColor = 'blue';
    })
}

resetbutton.addEventListener('click', () => {
    resetButtons();
    matchEnded = false;
    turn = 1;
    winnerMsg.parentElement.classList.add('d-none');
    winnerMsg.innerText = 'Draw!';
});

form.addEventListener('keyup', e => {
    e.preventDefault();
    const inputs = document.querySelectorAll('input');
    inputs.forEach(() => {
        const allFilled = [...inputs].every(input => input.value.trim() !== "");
        if(allFilled){
            document.querySelector('.add button').removeAttribute("disabled");
        }else{
            document.querySelector('.add button').setAttribute("disabled", "true");
        }
    })
});

form.addEventListener('submit', e => {
    e.preventDefault();
    PlayerOne = form.player1.value.toString();
    PlayerTwo = form.player2.value.toString();
    document.querySelector('.firstPlayerScore').innerText = `Player ${PlayerOne}`;
    document.querySelector('.secondPlayerScore').innerText = `Player ${PlayerTwo}`;
    form.style.display = "none";
    form.parentElement.classList = "";
    buttonsContainer.classList.remove('d-none');
    resetbutton.classList.remove('d-none');
});

const checkWinner = () => {
    for(let pattern of winningMoves){
        const pos1 = gameButtons[pattern[0]].innerText;
        const pos2 = gameButtons[pattern[1]].innerText;
        const pos3 = gameButtons[pattern[2]].innerText;
        if(pos1 !== '' && pos2 !== '' && pos3 !== '' && pos1 === pos2 && pos2 === pos3){
            matchEnded = true;
            switch (pos1){
                case 'X': Winner = PlayerOne; break;
                case 'O': Winner = PlayerTwo; break;
                default: Winner = "Draw!";
            }
            winnerMsg.innerText = `Player ${Winner} won!`;
            winnerMsg.parentElement.classList.remove('d-none');
        }
    }
    if(!matchEnded){
        const allButtons = [...gameButtons].every(button => button.innerText !== '');
        if(allButtons){
            matchEnded = true;
            winnerMsg.parentElement.classList.remove('d-none');
        }
    }
}

const timerToDestroyButton = setInterval(() => {
    if(!buttonsContainer.classList.contains('d-none') && matchEnded === false){
        let found = false;
        const buttonsArray = Array.from(gameButtons);
        if(buttonsArray.some(button => button.innerText !== '')){
            let randomPos;
            while(!found){
                randomPos = Math.floor(Math.random() * buttonsArray.length);
                if(gameButtons[randomPos].innerText !== ''){
                    found = true;
                    gameButtons[randomPos].style.borderColor = 'red';
                    removeButton(gameButtons[randomPos]);
                }
            }
            console.log(randomPos);
        }
    }else if(matchEnded){
        clearInterval(timerToDestroyButton);
    }
}, 3500);

const removeButton = (button) => {
    let timer = 2;
    let threeSecTimer = setInterval(() => {
        if(timer > 0){
            button.innerText = `${timer}`;
            timer --
        }else{
            button.disabled = false;
            button.style.borderColor = 'blue';
            button.innerText = '';
            clearInterval(threeSecTimer);
        }
    }, 1000);
};