//tabla1
let elTable = document.getElementById('table');

for (let i = 0; i < 15; i++) {
    elTable.insertAdjacentHTML("beforeend", `
    <tr>
        ${generateRow()}
    </tr>
`);
}

function generateRow() {
    let row = "";
    for (let i = 0; i < 11; i++) {
        row = row + `
            <td></td>
        `;
    }
    return row;
}

//tabla2
let elTable2 = document.getElementById('table2');

for (let i = 0; i < 15; i++) {
    elTable2.insertAdjacentHTML("beforeend", `
    <tr>
        ${generateRow2()}
    </tr>
`);
}

function generateRow2() {
    let row = "";
    for (let i = 0; i < 10; i++) {
        row = row + `
            <td></td>
        `;
    }
    return row;
}