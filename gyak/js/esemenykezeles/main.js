/* Eseménykezelés - Eventlistener*/
/* element.addEventListener(event, function, useCapture); */
const button01 = document.getElementById('first');
button01.addEventListener('click', doSomething);

const button02 = document.getElementById('second');
button02.addEventListener('click', increaseCounter);
let counter = 0;

const button03 = document.getElementById('third');
button03.addEventListener('click', changeTheme)         /* Próbáld ki ezeket is: 'mouseover' és 'mouseout' */

window.addEventListener('keydown', function(e){
    /* e paraméter - event objektum, ami információkat tartalmaz az eseményről ami éppen megtörtént */
    /*console.log(e);*/
    console.log(e.code);                                /* Az e objektum egyik értéke / kulcsa = .code (hasonló a c# dictionary-hoz vagy konstruktorhoz) */
});

const heading = document.getElementById('label');
const userInput = document.getElementById('fourth');
userInput.addEventListener('input', function(e){
    /*console.log(e.target);                               Ha jól értem a .target itt annak a html tag-nek felel meg amire eseménykezelést teszünk */
    heading.innerText = 'Hello ' + e.target.value + ', how are you?';
});

//  Ez a select rész még nem tökéletes (szerintem elrontja az, hogy a style.css-ben milyen sorrendben vannak létrehozva az osztályok, plusz nem törli ki az előző class-t ha többször is meg akarod csinálni, csak sorban működik)
const select = document.getElementById('select');
select.addEventListener('change', function(e){
    const optionValue = e.target.value;
    /*console.log(optionValue);*/
    if (optionValue == 'liverpool'){
        select.parentElement.classList.add('color01');
    }
    else if(optionValue == 'madrid'){
        select.parentElement.classList.add('color02');
    }
    else{
        select.parentElement.classList.add('color03');
    }
});

function doSomething(){
    alert('I did something!');
}

function increaseCounter(){
    counter++;
    button02.innerText = counter;
}

function changeTheme(){
    /* A classList tulajdonság egy elem CSS osztályneveit adja vissza. */
    /* .toggle = Egy vagy több tokent ad hozzá a listához - Eltávolít egy vagy több tokent a listából */
    document.body.classList.toggle('differentTheme');
}