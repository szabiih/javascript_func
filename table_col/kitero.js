//használható változók: let, const
//const: értéke nem változtatható (állandó)
//let: értéke később megváltoztatható

//változó deklarálás JSDoc-kal
/**
 * @type {string}
 */
const variable01 = ":)";            //nem változtatható érték
console.log(variable01);

//tömb deklarálás
/**
 * @type {Array<string>}    - stringeket tartalmazó tömb  -  {string[]} így is lehetne
 */
const numbers = ["egy", "kettő", "három"];
console.log(numbers[0]);
console.log(numbers[1]);
console.log(numbers[2]);

// tömb kiíratása

//tömb bejárása for ciklussal (index alapján)
for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}

//tömb bejárása for...of ciklussal (értékek alapján)
for (let num of numbers) {
    console.log(num);
}

//tömb bejárása for...in ciklussal (indexek alapján)
//"for...in" a kulcsokat (indexeket) adja vissza, ezért a tömb elemeit a kulcs segítségével kell lekérni
for(let index in numbers){
    console.log(`${index} : ${numbers[index]}`);
}
console.log(numbers.toString());
console.log(numbers.join(" - "));

//objektum deklarálása (kulcs-érték párokkal)
/**
 * @type {{name:string,age:number}} - ez egy objektum, aminek két tulajdonsága van: név: string, age: number
 */
const a = {
    name : "Szabolcs",
    age : 18
}
console.log(a.name);
console.log(a.age);
console.log(a);