//void - undefined értéket vesz fel, nincs visszatérési értéke, azaz a függvény lefut, de nem ad vissza semmit amit eltudnánk tárolni változóban
const number01 = 67;            //  globális const változó, minden függvény eléri, de nem módosíthatja

//  hoisting
operation01();
operation02();
operation03();
const value = operation04(24)
console.log(value);

/**
 * A függvény kiírja, hogy "something"
 * @returns {void}  nem fog semmilyen értékkel visszatérni
 */
function operation01(){
    console.log("something");
}

/**
 * A függvény kiír egy globális scope-al rendelkező változót
 * @returns {void}  void típus azaz nincs visszatérési értéke
 */
function operation02(){
    console.log(number01);
}

/**
 * A függvény kiír egy lokális scope-al rendelkező változót
 * @returns {void}
 */
function operation03(){
    const number02 = 10;        //  csak ebben a függvényben (scope-on) létezik, kívülről nem érhető el
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