const number01 = 67;

//  hoisting
operation01();
operation02();
operation03();
const value = operation04(24)
console.log(value);

/**
 * A függvény kiírja, hogy "something"
 * @returns {void}
 */
function operation01(){
    console.log("something");
}

/**
 * A függvény kiír egy globális scope-al rendelkező változót
 * @returns {void}
 */
function operation02(){
    console.log(number01);
}

/**
 * A függvény kiír egy lokális scope-al rendelkező változót
 * @returns {void}
 */
function operation03(){
    const number02 = 10;
    console.log(number02);
}

/**
 * A függvény visszadja a paraméter és a függvény lokális változójának az összegét
 * @param {number} par01
 * @returns {number}
 */
function operation04(par01){
    const number03 = 6;
    const sum = par01 + number03;
    return sum;
}