/**
 * @type {string}
 */
const variable01 = ":)";
console.log(variable01);

/**
 * @type {Array<string>}
 */
const numbers = ["egy", "kettő", "három"];
console.log(numbers[0]);
console.log(numbers[1]);
console.log(numbers[2]);

// tömb kiíratása
for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}
for (let num of numbers) {
    console.log(num);
}
for(let index in numbers){
    console.log(`${index} : ${numbers[index]}`);
}
console.log(numbers.toString());
console.log(numbers.join(" - "));

/**
 * @type {{name:string,age:number}}
 */
const a = {
    name : "Szabolcs",
    age : 18
}
console.log(a.name);
console.log(a.age);
console.log(a);