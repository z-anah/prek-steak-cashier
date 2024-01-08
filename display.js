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

const generateTable = (table, data, isMin) => {
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
    // add button +
    cell = row.insertCell();
    let btn = document.createElement("button");
    btn.setAttribute("class", "btn btn-sm btn-primary");
    btn.setAttribute("type", "button");
    if (isMin) {
      btn.setAttribute(
        "onclick",
        "delete_ps_order_menu('" + element.label + "'," + element.harga + ")"
      );
      btn.setAttribute("data-toggle", "modal");
      btn.setAttribute("data-target", "#ps-order-menu-modal");
      btn.setAttribute("data-ps-menu-id", element.id);
      btn.appendChild(document.createTextNode("-"));
    } else {
      btn.setAttribute(
        "onclick",
        "add_ps_order_menu('" + element.label + "'," + element.harga + ")"
      );
      btn.setAttribute("data-toggle", "modal");
      btn.setAttribute("data-target", "#ps-order-menu-modal");
      btn.setAttribute("data-ps-menu-id", element.id);
      btn.appendChild(document.createTextNode("+"));
    }
    cell.appendChild(btn);
  }
};

const delete_ps_order_menu = (label, harga) => {
  for (let i = 0; i < local_ps_order_menu.length; i++) {
    if (local_ps_order_menu[i].label == label) {
      local_ps_order_menu.splice(i, 1);
      break;
    }
  }
  displayPsOrderMenu();
  calculateTotal();
  calculateKembalian();
};

let local_ps_order_menu = [];
const add_ps_order_menu = (label, harga) => {
  local_ps_order_menu.push({
    label: label,
    harga: harga,
  });
  displayPsOrderMenu();
  calculateTotal();
  calculateKembalian();
};

const displayPsOrderMenu = () => {
  let table = document.getElementById("ps-order-menu-table");
  table.innerHTML = "";
  if (local_ps_order_menu.length > 0) {
    let data = Object.keys(local_ps_order_menu[0]);
    generateTableHead(table, data);
  }
  generateTable(table, local_ps_order_menu, true);
};
const calculateTotal = () => {
  let total = 0;
  for (let element of local_ps_order_menu) {
    total += element.harga;
  }
  document.getElementById("ps-total").innerHTML = total;
};
const calculateKembalian = () => {
  let total = document.getElementById("ps-total").innerHTML;
  let bayar = document.getElementById("ps-uang").value;
  let kembalian = bayar - total;
  document.getElementById("ps-kembalian").innerHTML = kembalian;
};
const input_ps_uang = (zero) => {
  if (zero!==undefined) {
    if (zero == 1000 || zero == 10 || zero == 100) {
      document.getElementById("ps-uang").value =
        document.getElementById("ps-uang").value * zero;
    } else if (zero == -2) {
      document.getElementById("ps-uang").value = "";
    } else if (zero == -1) {
      let uangg = document.getElementById("ps-uang").value;
      document.getElementById("ps-uang").value = uangg.slice(0, -1);
    } else {
      let uangg = document.getElementById("ps-uang").value + "" + zero;
      document.getElementById("ps-uang").value = uangg;
    }
  }
  calculateKembalian();
};
const ulangi_ps_order_menu = () => {
  local_ps_order_menu = [];
  let table = document.getElementById("ps-order-menu-table");
  table.innerHTML = "";
  let ps_uang = document.getElementById("ps-uang");
  ps_uang.value = "";
  calculateTotal();
  calculateKembalian();
};

const callAll = async () => {
  display_ps_menu = await get_ps_menu();
  displayPsMenu();

  let huhu = await get_ps_order_menu_by_ps_order_id("bsCcjn3gKYUdb2g1yvCf");
};

callAll();
