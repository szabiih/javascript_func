//  https://www.youtube.com/watch?v=baBq5GAL0_U

//  B O A R D
/**
 * @type {HTMLCanvasElement}
 */
let board;
const blockSize = 25;
const rows = 20;
const cols = 20;
/**
 * @type {CanvasRenderingContext2D}             A getContext('2d') metódus visszaad egy 2D rajzoló kontextust, ami a CanvasRenderingContext2D osztály egy példánya.
 *                                              Ez az objektum tartalmazza az összes metódust és tulajdonságot, amivel 2D rajzolást lehet végezni a canvas-on (fillRect, strokeRect, beginPath, lineTo, stb).
 *                                              chatgpt írta ..
 */
let context;

//  S N A K E  H E A D
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

//  S N A K E  B O D Y
const snakeBody = [];

//  F O O D
let foodX;
let foodY;

//  P H Y S I C S
let velocityX = 0;
let velocityY = 0;



/* The window object is supported by all browsers. It represents the browser's window. */
/* All global JavaScript objects, functions, and variables automatically become members of the window object. */
/* A "load" esemény az oldal teljes betöltődése után fut le.*/
window.addEventListener('load', function(){
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d');            /* The getContext() method returns an object with tools (methods) for drawing. */

    placeFood();
    document.addEventListener('keyup', changeDirection);
    /*update();*/
    setInterval(update, 1000/10);          /* A setInterval()metódus meghatározott időközönként (milliszekundumban - ebben az esetben 0.1 másodpercenként) hív meg egy függvényt. A metódus addig hívja meg a függvényt, amíg clearInterval()meg nem hívják, vagy az ablakot be nem zárják. - myInterval = setInterval(function, milliseconds); */
});

function update(){
    //  the background is continuously updated
    context.fillStyle = 'black';
    context.fillRect(0, 0, board.width, board.height);

    //  the food is continuously updated
    context.fillStyle = 'red';
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //  logic for checking collision between two squares AND creating a snake body
    if (snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    /* Bugos ha egyszerre engeded fel a bal fel és jobb nyilakat = vissza tud fordulni magába */
    //  move the snake body                                    Pl.: [ A, B, C, D ] -> [ A, A, B, C ]
    for (let i = snakeBody.length - 1; i > 0; i--){         /* A ciklus hátulról indul (a tömb utolsó indexétől) ; Minden elem megkapja az előtte lévő elem értékét ; A snakeBody[0] nem változik, mert a ciklus i > 0 feltétellel fut, így i = 0-hoz már nem jut el. */
        snakeBody[i] = snakeBody[i-1];
    }

    //  determining the snake's head
    if (snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    //  the snake is continuously updated
    context.fillStyle = 'lime';
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
}

function changeDirection(e){
    if (e.code == 'ArrowUp' && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == 'ArrowDown' && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == 'ArrowLeft' && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == 'ArrowRight' && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood(){
    /* (0-1) * cols -> (0-19.99) -> (0-19) *25 */
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}