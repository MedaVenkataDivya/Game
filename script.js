let player = document.getElementById('player');
let gameArea = document.getElementById('gameArea');
let scoreDisplay = document.getElementById('score');
let chancesDisplay = document.getElementById('chances');
let moveLeftBtn = document.getElementById('moveLeftBtn');
let moveRightBtn = document.getElementById('moveRightBtn');
let startBtn = document.getElementById('startBtn');

let playerWidth = 100; 
let gameAreaWidth = 400; 
let playerPosition = (gameAreaWidth - playerWidth) / 2; // Initial player position centered
let score = 0;
let chances = 3;
let gameInterval;

// Initialize player position
player.style.left = playerPosition + 'px';

function moveLeft() {
    if (playerPosition > 0) {
        playerPosition -= 20;
        player.style.left = playerPosition + 'px';
    }
}
function moveRight() {
    if (playerPosition < gameAreaWidth - playerWidth) {
        playerPosition += 20;
        player.style.left = playerPosition + 'px';
    }
}

// Event listeners for move buttons
moveLeftBtn.addEventListener('click', moveLeft);
moveRightBtn.addEventListener('click', moveRight);

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        moveLeft();
    } else if (event.key === 'ArrowRight') {
        moveRight();
    }
});

function createCoin() {
    let coin = document.createElement('div');
    coin.classList.add('coin');
    coin.style.top = '0px';
    coin.style.left = Math.random() * (gameAreaWidth - 20) + 'px';
    gameArea.appendChild(coin);
    moveCoin(coin);
}

// Function to move the coin down the game area
function moveCoin(coin) {
    let coinInterval = setInterval(() => {
        let coinTop = parseInt(coin.style.top);
        if (coinTop < gameArea.offsetHeight - 20) {
            coin.style.top = coinTop + 5 + 'px';

            let coinLeft = parseInt(coin.style.left);
            let coinRight = coinLeft + 20; 
            let playerLeft = playerPosition; 
            let playerRight = playerPosition + playerWidth; 

            if (coinTop > gameArea.offsetHeight - 120 && coinRight >= playerLeft && coinLeft <= playerRight) {
                score++;
                scoreDisplay.innerText = 'Coins Caught: ' + score;
                coin.remove();
                clearInterval(coinInterval);
            }
        } else {
            coin.remove();
            clearInterval(coinInterval);
            missCoin();
        }
    }, 50);
}

function missCoin() {
    chances--;
    chancesDisplay.innerText = 'Chances Left: ' + chances;
    if (chances === 0) {
        alert('Game Over! You caught ' + score + ' coins.');
        clearInterval(gameInterval);
        startBtn.disabled = false;
        moveLeftBtn.disabled = true;
        moveRightBtn.disabled = true;
        score = 0;
        chances = 3;
        scoreDisplay.innerText = 'Coins Caught: ' + score;
        chancesDisplay.innerText = 'Chances Left: ' + chances;
    }
}

function startGame() {
    startBtn.disabled = true;
    moveLeftBtn.disabled = false;
    moveRightBtn.disabled = false;
    gameInterval = setInterval(createCoin, 5000);
}

startBtn.addEventListener('click', startGame);

