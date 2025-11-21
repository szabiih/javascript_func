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

//  táblázat létrehozása
const table = document.createElement('table');      //  <table> elem létrehozása
document.body.appendChild(table);                   //  hozzáfűzzük a dokumentum tőrzséhez

//  táblázat fejlécének létrehozása
const thead = document.createElement('thead');      //  <thead> elem létrehozása
table.appendChild(thead);                           //  hozzáfűzzük a table-höz

//  thead-en belül egy sor létrehozása
const tr01 = document.createElement('tr');          //  <tr> elem létrehozása
thead.appendChild(tr01);                            //  hozzáfűzzük a thead-hez

//  fejléc celláinak (th) létrehozása függvény segítségével
const header = ['Márka', 'Modell', 'Megjelenés éve', 'Tervező(k)'];
for (let index in header){      //  index itt elvileg string, tehát nem jó a ===
    const th = createCellElement('th', header[index], tr01);
    if (index == 3){
        th.colSpan = 2;
    }
}

//  táblázat törzsének (tbody) létrehozása
const tbody = document.createElement('tbody');      //  <tbody> elem létrehozása
table.appendChild(tbody);                           //  //hozzáfűzzük a table-höz

//  For Loop
for (const object of arr) {
    const tr = document.createElement('tr');
    tbody.appendChild(tr);
    
    /*
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
    */

    createCellElement('td', object.brand, tr);
    createCellElement('td', object.model, tr);
    createCellElement('td', object.year, tr);
    const tdDesigner = createCellElement('td', object.designer1, tr);

    if (object.designer2 === undefined) {
        tdDesigner.colSpan = 2;
    }
    else {
        createCellElement('td', object.designer2, tr);
    }
}

/**
 * A függvény létrehoz egy táblázat cella elemet és hozzáfűzi egy sorhoz
 * @param {string} cellType                 A cella típusa
 * @param {string} cellContent              A cella tartalma
 * @param {HTMLTableRowElement} cellRow     A táblázat sora, amihez hozzá kapcsoljuk
 * @returns {HTMLTableCellElement}          A létrehozott cella
 */
function createCellElement(cellType, cellContent, cellRow){
    const cell = document.createElement(cellType);      //  cella létrehozása
    cell.innerText = cellContent;                       //  cella szövegét tartalmazza, amit beállítunk az innerText-nek
    cellRow.appendChild(cell);                          //  hozzáadjuk a megadott sorhoz
    return cell;                                        //  visszaadjuk a cellát, hogy később hivatkozhassunk rá
}

//Házi feladat
//form létrehozása
const form = document.createElement('form');            //  <form> elem létrehozása
form.id = 'form_js';                                    //  id beállítása
document.body.appendChild(form);                        //  hozzáfűzés a dokumentum törzséhez

//segédfüggvény
/**
 * @param {string} labelText                A label szövege
 * @param {string} inputType                Az input típusa (pl. text)
 * @param {string} inputId                  Az input id-ja
 * @param {HTMLElement} forms               Amihez hozzáadjuk
 */
function createInputField(labelText, inputType, inputId, forms) {
    const label = document.createElement('label');      //  <label> elem létrehozása
    label.htmlFor = inputId;                            //  label for attribútuma az input id-járe mutat
    label.innerText = labelText;                        //  label szövegének beállítása
    forms.appendChild(label);                           //  label hozzáadása a form-hoz

    const br1 = document.createElement('br');           //  <br> elem létrehozása
    forms.appendChild(br1);                             //  1. sortörés beszúrása

    const input = document.createElement('input');      //  <input> mező létrehozása
    input.type = inputType;                             //  input típusának beállítása (text)
    input.id = inputId;                                 //  input id-jának beállítása (id)
    input.name = inputId;                               //  input id-jának beállírása (name)
    forms.appendChild(input);                           //  input hozzáadása form-hoz

    const br2 = document.createElement('br');
    forms.appendChild(br2);                             //  2. sortörés beszúrása

    const br3 = document.createElement('br');
    forms.appendChild(br3);                             //  3. sortörés beszúrása
}

//input mezők létrehozása segédfüggvénnyel
createInputField('Márka:', 'text', 'brand', form);                  //  elso input
createInputField('Modell:', 'text', 'model', form);                 //  második input
createInputField('Megjelenés éve:', 'text', 'year', form);          //  harmadik input
createInputField('Tervező(k):', 'text', 'designer1', form);         //  negyedik input
createInputField('Tervező(k):', 'text', 'designer2', form);         //  ötödik input

//gomb létrehozása
const button = document.createElement('button');                    //  <button> elem létrehozása
button.innerText = 'Hozzáadás';                                     //  gomb felirata
form.appendChild(button);                                           //  gomb hozzáadása a form-hoz