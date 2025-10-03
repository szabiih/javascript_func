/**
 * @type {{theme:string,time:string,scientist1:string,scientist2?:string}[]}
 */
const arr = [
    {
        theme: 'Optika',
        time: 'XI. szazad',
        scientist1: 'Alhazen'
    },
    {
        theme: 'Asztronómia',
        time: 'reneszánsz',
        scientist1: 'Kepler',
        scientist2: 'Galilei'
    },
    {
        theme: 'Kvantumfizika',
        time: 'XIX-XX. század',
        scientist1: 'Max Planck',
        scientist2: 'Albert Einstein'
    },
    {
        theme: 'Modern fizika',
        time: 'XX-XXI. század',
        scientist1: 'Richard Feynman',
        scientist2: 'Stephen Hawking'
    }
]

const table = document.createElement('table');  //  Létrehoz egy html tag-et a memóriában
document.body.appendChild(table);               //  Hozzáfűz egy html tag-et valamihez

const thead = document.createElement('thead');
table.appendChild(thead);

const tr = document.createElement('tr');
thead.appendChild(tr);

const th01 = document.createElement('th');
tr.appendChild(th01);
th01.innerText = "Fizika terület";

const th02 = document.createElement('th');
tr.appendChild(th02);
th02.innerText = "Időszak";

const th03 = document.createElement('th');
tr.appendChild(th03);
th03.innerText = "Képviselők";
th03.colSpan = 2;

const tbody = document.createElement('tbody');
table.appendChild(tbody);

//  ez még nincs kész (folytatni...)
for (const object of arr){
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    
}