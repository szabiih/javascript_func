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
const snakeX = blockSize * 5;
const snakeY = blockSize * 5;

//  F O O D
let foodX;
let foodY;


/* The window object is supported by all browsers. It represents the browser's window. */
/* All global JavaScript objects, functions, and variables automatically become members of the window object. */
/* A "load" esemény az oldal teljes betöltődése után fut le.*/
window.addEventListener('load', function(){
    board = this.document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d');            /* The getContext() method returns an object with tools (methods) for drawing. */

    placeFood();
    update();
});

function update(){
    //  the background is continuously updated
    context.fillStyle = 'black';
    context.fillRect(0, 0, board.width, board.height);

    //  the snake head is continuously updated
    context.fillStyle = 'lime';
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    //  the food is continuously updated
    context.fillStyle = 'red';
    context.fillRect(foodX, foodY, blockSize, blockSize);
}

function placeFood(){
    /* (0-1) * cols -> (0-19.99) -> (0-19) *25 */
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}