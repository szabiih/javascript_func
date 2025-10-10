/**
 * @type {{war:string,team1:string,team1Size:string,team2?:string,team2Size?:string}[]}
 */
const arr = [
    {
        war: 'Rákóczi szabadságharc',
        team1: 'Kuruc',
        team1Size: '70.000',
        team2: 'Labanc',
        team2Size: '60.000',
    },
    {
        war: '48-as szabadságharc',
        team1: 'Osztrák császárság (+ Orosz birodalom)',
        team1Size: '170.000 (+ 200.000)',
        team2: 'Magyar királyság',
        team2Size: '170.000',
    },
    {
        war: 'I. világháború',
        team1: 'Antant',
        team1Size: '43 millió',
        team2: 'Központi hatalmak',
        team2Size: '25 millió',
    },
    {
        war: 'Bosworthi csata',
        team1: 'Angolok (York + Lancester)',
        team1Size: '15.000',
    }
]

const table = document.createElement('table');
document.body.appendChild(table);

const thead = document.createElement('thead');
table.appendChild(thead);

const tr01 = document.createElement('tr');
thead.appendChild(tr01);

const arr2 = ["Harc megnevezése", "Szembenálló felek", "Haderő"]

for (const st of arr2){
    const th = document.createElement('th');
    th.innerText = st;
    tr01.appendChild(th);
}

const tbody = document.createElement('tbody');
table.appendChild(tbody);

for (const ob of arr){
    const tr02 = document.createElement('tr');
    tbody.appendChild(tr02);

    const td01 = document.createElement('td');
    td01.innerText = ob.war;
    tr02.appendChild(td01);
    
    const td02 = document.createElement('td');
    td02.innerText = ob.team1;
    tr02.appendChild(td02);

    const td03 = document.createElement('td');
    td03.innerText = ob.team1Size;
    tr02.appendChild(td03);

    if (ob.team2 !== undefined){
        td01.rowSpan = 2;
        
        const tr03 = document.createElement('tr');
        tbody.appendChild(tr03);

        const td04 = document.createElement('td');
        td04.innerText = ob.team2;
        tr03.appendChild(td04);

        const td05 = document.createElement('td');
        td05.innerText = ob.team2Size;
        tr03.appendChild(td05);
    }
}