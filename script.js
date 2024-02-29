const leftBar = document.querySelector(".left");
const rightBar = document.querySelector(".right");
const ball = document.querySelector('.ball');
const container = document.querySelector('.container');
const modal = document.querySelector('.modal');

const message = document.querySelector('.modal-content p');
const restartBtn = document.querySelector('.Restart')
const exitBtn = document.querySelector('.exit');
const playbtn = document.querySelector('.play');
const modal2 = document.querySelector('.modal2');


const keysPressed = {};


const moveBars = () => {
    const move = 20;

    if (keysPressed['w']) {
        const leftCurrentPosition = parseInt(window.getComputedStyle(leftBar).top);
        leftBar.style.top = Math.max(leftCurrentPosition - move, 0) + 'px';
    }
    if (keysPressed['s']) {
        const leftCurrentPosition = parseInt(window.getComputedStyle(leftBar).top);
        leftBar.style.top = Math.min(leftCurrentPosition + move, container.offsetHeight - leftBar.offsetHeight) + 'px';
    }
    if (keysPressed['ArrowUp']) {
        const rightCurrentPosition = parseInt(window.getComputedStyle(rightBar).top);
        rightBar.style.top = Math.max(rightCurrentPosition - move, 0) + 'px';
    }
    if (keysPressed['ArrowDown']) {
        const rightCurrentPosition = parseInt(window.getComputedStyle(rightBar).top);
        rightBar.style.top = Math.min(rightCurrentPosition + move, container.offsetHeight - rightBar.offsetHeight) + 'px';
    }
};



document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
    moveBars();
});


document.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false;
});

setInterval(moveBars, 30);

let ballPositionX = parseInt(window.getComputedStyle(ball).left);
let ballPositionY = parseInt(window.getComputedStyle(ball).top);

let speedX = 0;
let speedY = 0;


setInterval(() => {

    boundaryCollision();
    ballPositionX += speedX;
    ballPositionY += speedY;
    moveBall();
    barCollision();
    gameOver();

}, 20)

const moveBall = () => {

    ball.style.left = ballPositionX + 'px';
    ball.style.top = ballPositionY + 'px';

}

const boundaryCollision = () => {
    if (ballPositionY > parseInt(window.getComputedStyle(container).height) - (parseInt(window.getComputedStyle(ball).height)/2) || ballPositionY <= 0) {
        speedY *= -1;
    }
}

const barCollision = () => {
    const ballRect = ball.getBoundingClientRect();
    const leftBarRect = leftBar.getBoundingClientRect();
    const rightBarRect = rightBar.getBoundingClientRect();



    if (ballRect.right >= leftBarRect.left && ballRect.left <= leftBarRect.right && ballRect.bottom >= leftBarRect.top && ballRect.top <= leftBarRect.bottom) {
        speedX *= -1;
        speedY += Math.sign(speedY);
        changeColor();

    }


    if (ballRect.right >= rightBarRect.left && ballRect.left <= rightBarRect.right && ballRect.bottom >= rightBarRect.top && ballRect.top <= rightBarRect.bottom) {
        speedX *= -1;
        speedY += Math.sign(speedY);
        changeColor();

    }
};

function gameOver() {
    const ballRect = ball.getBoundingClientRect();

    if (ballRect.right < 0) {
        message.textContent = 'Game over! Player 2 Won';
        modal.style.display = "block";
        ballPositionX = parseInt(window.getComputedStyle(container).width)/2 - parseInt(window.getComputedStyle(ball).width)/2;
        ballPositionY = parseInt(window.getComputedStyle(container).height)/2 - parseInt(window.getComputedStyle(ball).height)/2;
        speedX = 0;
        speedY = 0;
    }

    if (ballRect.right > parseInt(window.getComputedStyle(container).width) + parseInt(window.getComputedStyle(ball).height)) {
        message.textContent = 'Game over! Player 1 Won';
        modal.style.display = "block";
        ballPositionX = parseInt(window.getComputedStyle(container).width)/2 - parseInt(window.getComputedStyle(ball).width)/2;
        ballPositionY = parseInt(window.getComputedStyle(container).height)/2 - parseInt(window.getComputedStyle(ball).height)/2;
        speedX = 0;
        speedY = 0;
    }
}


function changeColor() {
    let hexCode = '0123456789ABCDEF';
    let colorCode = '#';
    for (let i = 0; i < 6; i++) {
        colorCode += hexCode[Math.floor(Math.random() * 16)];
    }
    ball.style.backgroundColor = colorCode;

}

restartBtn.addEventListener('click', function () {
    modal.style.display = "none";
    speedX = Math.random() < 0.5 ? -5 : 5;
    speedY = Math.random() < 0.5 ? -5 : 5;
})

exitBtn.addEventListener('click', () => {
    window.close();
})

playbtn.addEventListener('click', () => {
    modal2.style.display = "none";
    speedX = Math.random() < 0.5 ? -5 : 5;
    speedY = Math.random() < 0.5 ? -5 : 5;
})