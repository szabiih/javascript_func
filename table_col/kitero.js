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

//  H F ->
/**
 * @type {{brand:string,model:string,year:string,designer1:string,designer2?:string}[]}
 */
const arr = [
    {
        brand: 'Rolex',
        model: 'Daytona',
        year: '1963',
        designer1: 'Rolex Design Team'
    },
    {
        brand: 'Omega',
        model: 'Speedmaster',
        year: '1957',
        designer1: 'Claude Baillod',
        designer2: 'Pierre Moinat'
    },
    {
        brand: 'Seiko',
        model: 'Astron',
        year: '1969',
        designer1: 'Suwa Seikosha Team',
    },
    {
        brand: 'Tissot',
        model: 'Seastar',
        year: '1960',
        designer1: 'Charles Tissot',
        designer2: 'Jacques-David LeCoultre'
    }
]

//  ...
const table = document.createElement('table');
document.body.appendChild(table);

const thead = document.createElement('thead');
table.appendChild(thead);

//  Row
const tr01 = document.createElement('tr');
thead.appendChild(tr01);

//  Header cells
const th01 = document.createElement('th');
th01.innerText = 'Márka';
tr01.appendChild(th01);

const th02 = document.createElement('th');
th02.innerText = 'Modell';
tr01.appendChild(th02);

const th03 = document.createElement('th');
th03.innerText = 'Megjelenés éve';
tr01.appendChild(th03);

const th04 = document.createElement('th');
th04.innerText = 'Tervező(k)';
th04.colSpan = 2;
tr01.appendChild(th04);

//  ...
const tbody = document.createElement('tbody');
table.appendChild(tbody);

//  For Loop
for (const object of arr) {
    const tr = document.createElement('tr');
    tbody.appendChild(tr);

    const td01 = document.createElement('td');
    td01.innerText = object.brand;
    tr.appendChild(td01);

    const td02 = document.createElement('td');
    td02.innerText = object.model;
    tr.appendChild(td02);

    const td03 = document.createElement('td');
    td03.innerText = object.year;
    tr.appendChild(td03);

    const td04 = document.createElement('td');
    td04.innerText = object.designer1;
    
    if (object.designer2 === undefined) {
        td04.colSpan = 2;
        tr.appendChild(td04);
    }
    else {
        tr.appendChild(td04);
        const td05 = document.createElement('td');
        td05.innerText = object.designer2;
        tr.appendChild(td05);
    }
}

/**
 * A függvény létrehoz egy táblázat cella elemet
 * @param {string} cellType                 A cella típusa
 * @param {string} cellContent              A cella tartalma
 * @param {HTMLTableRowElement} cellRow     A táblázat sora, amihez hozzá kapcsoljuk
 */
function createCellElement(cellType, cellContent, cellRow){
    const cell = document.createElement(cellType);
    cell.innerText = cellContent;
    cellRow.appendChild(cell);
}