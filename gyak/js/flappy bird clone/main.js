//  B O A R D
/**
 * @type {HTMLCanvasElement}
 */
let board;
let boardWidth = 360;                           /* A háttérkép alapján (a kép szélessége) */
let boardHeight = 640;                          /* A háttérkép alapján (a kép magassága) */
/**
 * @type {CanvasRenderingContext2D}             A getContext('2d') metódus visszaad egy 2D rajzoló kontextust, ami a CanvasRenderingContext2D osztály egy példánya.
 *                                              Ez az objektum tartalmazza az összes metódust és tulajdonságot, amivel 2D rajzolást lehet végezni a canvas-on (fillRect, strokeRect, beginPath, lineTo, stb).
 *                                              chatgpt írta ..
 */
let context;

//  B I R D
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;                     /* Meghatározza pontosan hol legyen a bird a képen.. (birdX és birdY) */
let birdY = boardHeight / 2;
/**
 * @type {HTMLImageElement}
 */
let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

/* The window object is supported by all browsers. It represents the browser's window. */
/* All global JavaScript objects, functions, and variables automatically become members of the window object. */
/* A "load" esemény az oldal teljes betöltődése után fut le.*/
window.addEventListener('load', function(){
    board = document.getElementById('board');
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext('2d');            /* The getContext() method returns an object with tools (methods) for drawing. */

    //  draw flappy bird
    /*context.fillStyle = 'green';                 /* Meghatározza hogy milyen színt használunk a rajzoláshoz (fillStyle) */
    /*context.fillRect(bird.x, bird.y, bird.width, bird.height);                          /* Rajzol a Canvas-ba egy téglalapot -  context.fillRect(x, y, width, height)*/

    //  load the image
    birdImg = new Image();                      /* The Image object represents an HTML <img> element. */
    birdImg.src = './img/flappybird.png';       /* A "load" esemény a kép betöltése után fut le. (addEventListener nélkül nem működik a .drawImage - de nem tudom miért nem...) */
    birdImg.addEventListener('load', function(){
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);            /* Rajzol a Canvas-ba egy képet - context.drawImage(img, x, y, width, height)*/
    });

    requestAnimationFrame(update);              /* A requestAnimationFrame() metódus jelzi a böngészőnek, hogy animációt szeretnél futtatni, és kéri, hogy a böngésző hívjon meg egy megadott függvényt az animáció frissítéséhez a következő újrafestés előtt. */
});

function update(){
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);                                 /* Kitörli a Canvas-on belüli rajzolt képkockákat - context.clearRect(x, y, width, height) */

    //  the bird is continuously updated (habár ezt a dupla requestAnimationFrame-et nem teljesen értem ..)
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)


}