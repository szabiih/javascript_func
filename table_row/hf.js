/**
 * Táblázat sorait leíró adattípus (nemzetiség, szerzők, művek)
 * @typedef {{nationality:string, author1:string, author2?:string, literarypiece1:string, literarypiece2?:string}} CountryWriters
 */

/**
 * Form input mező leírása
 * @typedef {{id:string, label:string}} FormField
 */


/**
 * Táblázat kezdeti adatai
 * @type {CountryWriters[]}
 */

const arr = [
    {
        nationality: 'Orosz',
        author1: 'Gogol',
        literarypiece1: 'A köpönyeg',
        author2: 'Csehov',
        literarypiece2: 'A csinovnyik halála',
    },
    {
        nationality: 'Cseh',
        author1: 'Franz Kafka',
        literarypiece1: 'Az átváltozás',
    },
    {
        nationality: 'Magyar',
        author1: 'Örkény István',
        literarypiece1: 'Egyperces Novellák',
        author2: 'József Attila',
        literarypiece2: 'Klárisok',
    },
    {
        nationality: 'Svájc',
        author1: 'Friedrich Dürrenmatt',
        literarypiece1: 'A fizikusok',
    }
]

/**
 * Táblázat fejléce, űrlap mezők leírása
 * @type {{header:string[], formFields:FormField[]}}
 */
const formElements = {
    header: ['Nemzetiség', 'Szerző', 'Mű'],     //  táblázat oszlopnevei
    formFields: [                               //  input mezők listája
        { 
            id: "nemzetiseg",
            label: "Nemzetiség: ",
        },
        { 
            id: "szerzo1",
            label: "Szerző: ",
        },
        { 
            id: "mu1",
            label: "Mű: ",
        },
        { 
            id: "szerzo2",
            label: "Másik Szerző: ",
        },
        { 
            id: "mu2",
            label: "Mű: ",
        }
    ]
}

//Táblázat létrehozása
generateTable(formElements.header, "tablebody"); //táblázat létrehozása a megadott fejlécekkel
renderTableBody(arr); //táblázat feltöltése

//HTML-ben lévő form eseménykezelője
const formHTML = document.getElementById("htmlform"); //HTML-ben lévő form megkeresése
formHTML.addEventListener('submit', HTMLFormEventListener); //nameless function kicserélhető a lent definiált függvényre (erre változóként hivatkozunk) - rákötjük a submit eseményt -> külön függvény végzi a feldolgozást

//JS által generált form létrehozása
const formJS = generateForm("jsForm", formElements.formFields); //JS-ben generált form létrehozása a megadott mezőkkel
document.body.appendChild(formJS); //megjeleníti az oldalon

//JS form submit eseménykezelője
formJS.addEventListener("submit", function(e){
    //alapértelmezett működés egy get-et küld
    e.preventDefault(); //alapértelmezett működést gátolja, az oldal újratöltését megakadályozza
    /**
     * @type {HTMLFormElement}
     */
    const event = e.target;

    /** @type {HTMLInputElement} */
    const nemzetiseg = event.querySelector("#nemzetiseg"); //szükséges inputok lekérése
    /** @type {string} */
    const nemzetisegvalue = nemzetiseg.value; //azok értékei (string típus)

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

        
    /** 
     * Létrehozunk egy üres objektumot a beolvasott adatoknak
     * @type {CountryWriters} 
     */
    const obj = {}; //object létrehozása

    //Validálás, kötelező mezők ellenőrzése
    if (!validateFields(nemzetiseg, szerzo1, mu1)){
        return; //ha hibs nem folytatja
    }

    //Objektum feltőltése az input értékeivel
    obj.nationality = nemzetisegvalue;
    obj.author1 = szerzo1value;
    obj.literarypiece1 = mu1value;

    //Opcionális mezők, akkor kerülnek be, ha nem üresek
    obj.author2 = szerzo2value !== "" ? szerzo2value : undefined;
    obj.literarypiece2 = mu2value !== "" ? mu2value : undefined;

    arr.push(obj); //hozzáadjuk az objektumot a tömbhöz (obj)
    renderTableBody(arr); //újrarendeltetjük a táblázatot friss adatokkal
})