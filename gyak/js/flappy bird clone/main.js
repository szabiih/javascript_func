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

//  P H Y S I C S
let velocityX = -2;                             /* A csövek balra történő mozgásának a sebessége */
let velocityY = 0;                              /* A madár felfelé történő mozgásának a nagysága */
let gravity = 0.4;                              /* A madár lefelé történő mozgásának a nagysága */



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
    document.addEventListener('keydown', moveBird);
});

function update(){
    requestAnimationFrame(update);              // <-- EZ CSINÁL FOLYAMATOS ANIMÁCIÓT!
    context.clearRect(0, 0, board.width, board.height);                                 /* Kitörli a Canvas-on belüli rajzolt képkockákat - context.clearRect(x, y, width, height) */

    //  the bird is continuously updated (habár ezt a dupla requestAnimationFrame-et nem teljesen értem ..)
    velocityY += gravity;
    bird.y += velocityY;
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    //  the pipe is continuously updated
    for(let i = 0; i < pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x += velocityX;                    /* Legelőször 360 + (-2) = 358 */
        /*console.log(pipe);*/
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    }

}

function placePipes(){

    /* (0-1) * pipeHeight / 2   [0 (beleértve) és 1 (kizárva) között] */
    /* 0 -> -128 ; ugyan az mint pipeHeight / 4 */
    /* 1 -> -128 - 256 = -384 ; (pipeHeight / 4 - pipeHeight / 2) -1/4 pipeHeight */
    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);        /* -1/4 és -3/4 magasság között lehet a pipeHeight (ennyivel mozgatjuk feljebb) */
    let openingSpace = board.height / 4;

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false                      /* A flappy bird áthaladt-e már a csövön vagy sem */
    }

    pipeArray.push(topPipe);

    let bottompipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,        /* pl.: -128 + 512 + 160 = 544 - a randomPipeY feljebb mozgatja (a negatív irányba a háttérképhez képest) és az openingSpace pedig lejebb mozgatja (a pozitív irányba a háttérképhez képest) ; mert ugye a háttérkép bal felső sarka a 0:0 pont ..*/
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

    pipeArray.push(bottompipe);
}

function moveBird(e){
    /*console.log(e.code)*/
    if (e.code == 'Space' || e.code == 'ArrowUp' || e.code == 'KeyW'){
        //  jump
        velocityY = -6;                                     /* szintén azért mert a háttérkép bal felső sarka a 0:0 pont és felfele a minusz irány van*/
    }
}