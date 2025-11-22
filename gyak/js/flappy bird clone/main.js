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
/* 408/288 leegyszerűsítve -> 17/12 ; ennek a két értéknek külön a kétszerese 34 és 24 */
let birdWidth = 34;                             /* A kép alapján (a kép szélessége) */
let birdHeight = 24;                            /* A kép alapján (a kép magassága) */
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

//  P I P E S
let pipeArray = [];
/* 384/3072 leegyszerűsítve -> 1/8 ; ennek a két értéknek külön a hatvannégyszerese 64 és 512 */
/* Ezekkel az adatokkal a pipe jelenleg most a háttérkép jobb oldalával érintkezik, de nincs rajta */
let pipeWidth = 64;                             /* A kép alapján (a kép szélessége) */
let pipeHeight = 512;                           /* A kép alapján (a kép magassága) */
/* Koordinátarendszerben elképzelve A pontként -> A(360; 0) , tehát a jobb felső sarokba pozícionáltuk ..*/
let pipeX = boardWidth;
let pipeY = 0;

/**
 * @type {HTMLImageElement}
 */
let topPipeImg;
/**
 * @type {HTMLImageElement}
 */
let bottomPipeImg;




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

    topPipeImg = new Image();
    topPipeImg.src = './img/toppipe.png';

    bottomPipeImg = new Image();
    bottomPipeImg.src = './img/bottompipe.png';

    requestAnimationFrame(update);              /* A requestAnimationFrame() metódus jelzi a böngészőnek, hogy animációt szeretnél futtatni, és kéri, hogy a böngésző hívjon meg egy megadott függvényt az animáció frissítéséhez a következő újrafestés előtt. */
    setInterval(placePipes, 1500);              /* A setInterval()metódus meghatározott időközönként (milliszekundumban - ebben az esetben 1.5 másodpercenként) hív meg egy függvényt. A metódus addig hívja meg a függvényt, amíg clearInterval()meg nem hívják, vagy az ablakot be nem zárják. - myInterval = setInterval(function, milliseconds); */
});

function update(){
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);                                 /* Kitörli a Canvas-on belüli rajzolt képkockákat - context.clearRect(x, y, width, height) */

    //  the bird is continuously updated (habár ezt a dupla requestAnimationFrame-et nem teljesen értem ..)
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)

    //  pipes
    for(let i = 0; i < pipeArray.length; i++){
        let pipe = pipeArray[i];
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    }

}

function placePipes(){
    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : pipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false                      /* A flappy bird áthaladt-e már a csövön vagy sem */
    }

    pipeArray.push(topPipe);
}