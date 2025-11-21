/**
 * @typedef {{nationality:string, author1:string, author2?:string, literarypiece1:string, literarypiece2?:string}} CountryWriters
 */

/**
 * Táblázat létrehozás
 * @param {string[]} headerList         Fejléc feliratai
 * @param {string} tbodyId              Tbody id-ja
 * @returns {HTMLTableElement}          A létrehozott táblázat
 */
function generateTable(headerList, tbodyId) {
    const table = document.createElement("table");

    //Fejléc létrehozása meglévő függvénnyel
    generateHeader(table, headerList); 

    //tbody létrehozása
    const tbody = document.createElement('tbody');
    tbody.id = tbodyId;
    table.appendChild(tbody);

    //Táblázat hozzáadása
    document.body.appendChild(table);

    return table;
}

/**
 * Fejléc létrehozása
 * @param {HTMLTableElement} table      A táblázat amihez hozzá fűzzük a fejlécet
 * @param {string[]} headerList         A content amik a táblázat soraiba mennek annak a változója
 * @returns {HTMLTableSectionElement}
 */
function generateHeader(table, headerList){
    const thead = document.createElement('thead');
    table.appendChild(thead);

    const tr = document.createElement('tr');
    thead.appendChild(tr);

    //Minden fejléc szöveghez készít egy <th>-t
    for (let i of headerList){
        createCell('th', i, tr)
    }
    return thead;
}

/**
 * Tbody létrehozás
 * @param {CountryWriters[]} array
 */
function renderTableBody(array) {
    const tablebody = document.getElementById('tablebody');
    tablebody.innerHTML = "";       //előző tartalom törlése

    //Tömb minden eleméből egy új táblázatsor készül
    for(let a of array) {
        renderTableRow(tablebody, a);
    }
}

/**
 * Táblázatsorok létrehozása
 * Kezeli a rowspanos megjelenítést is
 * @param {HTMLTableSectionElement} tablebody 
 * @param {CountryWriters} CountryWriters 
 */
function renderTableRow(tablebody, CountryWriters) {
    const tr2 = document.createElement('tr');
    tablebody.appendChild(tr2);

    //Első cella: nemzetiség - kattintásra kijelől
    const td1 = createCell('td', CountryWriters.nationality, tr2)
    td1.addEventListener("click",function(e){
        /**
         * @type {HTMLTableCellElement}
         */
        const valtozo = e.target;

        const tr = valtozo.parentElement;
        const tbody = tr.parentElement;
        const alrmarked = tbody.querySelector('.marked');

        //Egy cella legyen kijelölve egy időben
        if (alrmarked !== null) {
            alrmarked.classList.remove('marked');
        }

        valtozo.classList.add("marked");
    });

    const td2 = createCell('td', CountryWriters.author1, tr2); //szerző sor
    const td3 = createCell('td', CountryWriters.literarypiece1, tr2); //mű sor

    //Ha van második szerző és mű létrehozzuk azokhoz is a sort
    if (CountryWriters.author2 != undefined && CountryWriters.literarypiece2 != undefined) {
        const tr3 = document.createElement('tr');
        tablebody.appendChild(tr3);

        const td4 = createCell('td', CountryWriters.author2, tr3);
        const td5 = createCell('td', CountryWriters.literarypiece2, tr3);

        td1.rowSpan = 2; //nemzetiség cella két sor magas legyen
    }
}

/**
 * Cellák létrehozása
 * @param {'td'|'th'} cellType                  Milyen a typeja a cellnek th | td
 * @param {string} cellContent                  A cell contentje azaz a változó
 * @param {HTMLTableRowElement} parentRow       A sor amihez hozzáadjuk
 * @returns {HTMLTableCellElement}
 */
function createCell(cellType, cellContent, parentRow) {
    const cell = document.createElement(cellType); 
    cell.innerText = cellContent;
    parentRow.appendChild(cell);
    return cell;
}

/**
 * Form elementek létrehozása
 * @param {HTMLElement} forms                   Amihez hozzáadjuk
 * @param {string} id                           Input id-ja
 * @param {string} labelContent                 Label szövege
 */
function createFormElement(forms, id, labelContent) {
    const div = document.createElement('div');
    forms.appendChild(div);

    const label = document.createElement('label');
    label.htmlFor = id;
    label.innerText = labelContent;
    div.appendChild(label);
    
    const br1 = document.createElement('br');
    div.appendChild(br1);
    
    const input = document.createElement('input');
    input.id = id;
    div.appendChild(input);

    const br2 = document.createElement('br');
    div.appendChild(br2);

    const br3 = document.createElement('br');
    div.appendChild(br3);
    
    //Hibaüzenetek
    const span = document.createElement('span');
    span.classList.add("error");
    div.appendChild(span);
}

/**
 * Form létrehozása
 * @param {string} id                           A form id-ja
 * @param {FormField[]} elements                Label-input párok adatai
 * @returns {HTMLFormElement}
 */
function generateForm(id, elements) {
    const form = document.createElement('form');
    form.id = id

    //Input mezők létrehozása
    for (let elem of elements) {
        createFormElement(form, elem.id, elem.label)
    }

    //Hozzáadás gomb
    const button = document.createElement('button');
    button.innerText = 'Hozzáadás';
    form.appendChild(button);

    return form;
}

/**
 * Form submit eseménykezelője
 * Htmlform FormEventListener-jét kiszervezzük
 * @param {Event} e
 */
function HTMLFormEventListener(e) {
    e.preventDefault();     //alapértelmezett működést gátolja, az oldal újratöltését megakadályozza
    /**
     * @type {HTMLFormElement}
     */
    const event = e.target;

    /** @type {HTMLInputElement} */
    const nemzetiseg = event.querySelector("#nemzetiseg");  //szükséges inputok lekérése
    /** @type {string} */
    const nemzetisegvalue = nemzetiseg.value;               //azok értékei (string típus)

    /** @type {HTMLInputElement} */
    const szerzo1 = event.querySelector("#szerzo1");
    /** @type {string} */
    const szerzo1value = szerzo1.value;

    /** @type {HTMLInputElement} */
    const szerzo2 = event.querySelector("#szerzo2");
    /** @type {string} */
    const szerzo2value = szerzo2.value;

    /** @type {HTMLInputElement}*/
    const mu1 = event.querySelector("#mu1");
    /** @type {string} */
    const mu1value = mu1.value;

    /** @type {HTMLInputElement} */
    const mu2 = event.querySelector("#mu2");
    /** @type {string} */
    const mu2value = mu2.value;

    //Validálás, ha rossz kilép
    if(!validateFields(nemzetiseg, szerzo1, mu1)) {
        return;
    }

    //Új objektum a táblázat sorához
    /** 
     * @type {CountryWriters} 
     */
    const tomb = {};

    tomb.nationality = nemzetisegvalue;
    tomb.author1 = szerzo1value;
    tomb.literarypiece1 = mu1value;

    //Opcionális mezők (szerző, mű)
    if (szerzo2value && mu2value) {
        tomb.author2 = szerzo2value;
        tomb.literarypiece2 = mu2value;
    }

    //Új sor beszúrása
    const tbody = document.getElementById("tablebody1");
    renderTableRow(tbody, tomb);
}

/**
 * Validálás (egy mező)
 * @param {HTMLInputElement} inputField 
 * @param {string} errorMsg 
 * @returns {boolean}
 */
function validateField(inputField, errorMsg) {
    let valid = true;

    if (inputField.value === "") {
        const parentDiv = inputField.parentElement;
        const error = parentDiv.querySelector(".error");
        error.innerText = errorMsg; //hibaüzenet
        valid = false;
    }
    return valid;
}

/**
 * Validálás (több mező)
 * @param {HTMLInputElement} inputField1 
 * @param {HTMLInputElement} inputField2 
 * @param {HTMLInputElement} inputField3 
 * @returns {boolean}
 */
function validateFields(inputField1, inputField2, inputField3) {
    const form = inputField1.form;

    //Régi hibák törlése
    const error = form.querySelectorAll('.error');
    for (const i of error) {
        i.innerText = "";
    } //hibaüzenetek törlése

    let valid = true;

    //Kötelező mezők validálása
    if (!validateField(inputField1, "Mező kitöltése kötelező!")) {
        valid = false;
    }

    if (!validateField(inputField2, "Mező kitöltése kötelező!")) {
        valid = false;
    }

    if (!validateField(inputField3, "Mező kitöltése kötelező!")) {
        valid = false;
    }

    return valid;
}