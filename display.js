// display_ps_menu = [{label,harga}]
// using js to table
const displayPsMenu = () => {
  let table = document.getElementById("ps-menu-table");
  let data = Object.keys(display_ps_menu[0]);
  generateTableHead(table, data);
  generateTable(table, display_ps_menu);
};
const generateTableHead = (table, data) => {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
};
const generateTable = (table, data) => {
  for (let element of data) {
    let row = table.insertRow();
    let cell = row.insertCell();
    let text = document.createTextNode(element.label);
    cell.appendChild(text);
    cell = row.insertCell();
    text = document.createElement("div");
    text.setAttribute("class", "text-right");
    text.appendChild(document.createTextNode(element.harga));
    cell.appendChild(text);
  }
};

const callAll = async () => {
  display_ps_menu = await get_ps_menu();
  displayPsMenu();
};
callAll();
