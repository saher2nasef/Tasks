let checkBox = document.getElementById("checkBox");
let TextToDo = document.getElementById("TextToDo");
let InnerData = document.getElementById("InnerData");
let ClearCompleted = document.getElementById("ClearCompleted");
let Btn = document.getElementById("Btn");
let Info = document.getElementById("Info");
let btns = document.getElementById("btns").children;
let body = document.querySelector("body");
// To toggle the theme
let Bool = false;
var r = document.querySelector(":root");
Btn.addEventListener("click", () => {
  if (Bool == false) {
    Bool = true;

    Btn.src = "images/icon-moon.svg";
    r.style.setProperty("--Color", "hsl(235, 19%, 35%)");
    r.style.setProperty("--Bg", " #fff");
    r.style.setProperty("--Bg1", "#fff");
    body.classList.toggle("active");
    // Sun
  } else {
    Bool = false;
    Btn.src = "images/icon-sun.svg";
    r.style.setProperty("--Color", "#fff");
    r.style.setProperty("--Bg", "hsl(235, 24%, 19%)");
    r.style.setProperty("--Bg1", "hsl(235, 21%, 11%)");
    body.classList.toggle("active");
    // Moon
  }
});
// For Resort
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", () => {
    for (let x = 0; x < btns.length; x++) {
      btns[x].classList.remove("active");
    }
    btns[i].classList.add("active");
    if (btns[i].dataset.type === "All") {
      let Data = JSON.parse(localStorage.getItem("Data"));
      FullDiv(Data);
      ChangeData();
    } else if (btns[i].dataset.type === "Active") {
      let Data = JSON.parse(localStorage.getItem("Data"));
      let Result = Data.filter((Item) => Item.Active == false);
      FullDiv(Result);
      ChangeData((have = true), (length = Result.length));
    } else if (btns[i].dataset.type === "Completed") {
      let Data = JSON.parse(localStorage.getItem("Data"));
      let Result = Data.filter((Item) => Item.Active == true);
      FullDiv(Result);
      ChangeData((have = true), (length = Result.length));
    }
  });
}
// ClearCompleted
ClearCompleted.addEventListener("click", () => {
  let Data = JSON.parse(localStorage.getItem("Data"));
  let Result = Data.filter((Item) => Item.Active == true);
  for (let i = 0; i < Result.length; i++) {
    Data.splice(Data.indexOf(Result[i]), 1);
  }
  localStorage.setItem("Data", JSON.stringify(Data));
  FullDiv(Data);
  ChangeData();
  ActiveAll();
});
// Load
window.onload = () => {
  if (localStorage.getItem("Data") === null) {
    localStorage.setItem("Data", JSON.stringify([]));
  } else {
    let Data = JSON.parse(localStorage.getItem("Data"));
    FullDiv(Data);
    ChangeData();
  }
  Btn.src = "images/icon-sun.svg";
  r.style.setProperty("--Color", "#fff");
  r.style.setProperty("--Bg", "hsl(235, 24%, 19%)");
  r.style.setProperty("--Bg1", "hsl(235, 21%, 11%)");
  body.classList.toggle("active");
};
// On write add Task
TextToDo.addEventListener("keydown", (event) => {
  if (
    event.key === "Enter" &&
    TextToDo.value.replaceAll(" ", "").length !== 0
  ) {
    let DB = JSON.parse(localStorage.getItem("Data"));
    DB.push({
      Id: Date.now(),
      Text: TextToDo.value,
      Active: checkBox.checked,
    });
    localStorage.setItem("Data", JSON.stringify(DB));

    let Data = JSON.parse(localStorage.getItem("Data"));
    FullDiv(Data);
    TextToDo.value = "";
    checkBox.checked = false;
    ActiveAll();
    ChangeData();
  }
});
function DeleteById(Id) {
  let Data = JSON.parse(localStorage.getItem("Data"));
  let Result = Data.filter((Item) => Item.Id == Id);
  Data.splice(Data.indexOf(Result[0]), 1);
  localStorage.setItem("Data", JSON.stringify(Data));
  FullDiv(Data);
  ActiveAll();
  ChangeData();
}
function EditById(Id) {
  let Data = JSON.parse(localStorage.getItem("Data"));
  let Result = Data.filter((Item) => Item.Id == Id);
  let Value = Data[Data.indexOf(Result[0])].Active;
  Data[Data.indexOf(Result[0])].Active = !Value;
  localStorage.setItem("Data", JSON.stringify(Data));
  FullDiv(Data);
  ActiveAll();
}
function FullDiv(Data) {
  InnerData.innerHTML = "";
  for (let i = 0; i < Data.length; i++) {
    InnerData.innerHTML += `  
    <div class="todo ${Data[i].Active ? "active" : ""}">
      <label class="LabelCheckBox">
        <input type="checkbox" id="$${Data[i].Id}" ${
      Data[i].Active ? "checked" : ""
    } class="checkbox" />
        <span onclick="EditById('${Data[i].Id}')"></span>
      </label>
      <label class="Label"  for="$${Data[i].Id}" onclick="EditById('${
      Data[i].Id
    }')">${Data[i].Text}</label>
      <button class="Delete" onclick="DeleteById('${Data[i].Id}')">
        <span class="d-none">Del</span> <i class="fa fa-close"></i>
      </button>
    </div>
    `;
  }
}
function ChangeData(have = false, length = 0) {
  let Data = JSON.parse(localStorage.getItem("Data"));
  console.log(Data.length);
  if (have == true) {
    if (length == 0) {
      Info.innerHTML = `No items left`;
    } else if (length == 1) {
      Info.innerHTML = `${length} item left`;
    } else if (length > 1) {
      Info.innerHTML = `${length} items left`;
    }
  } else {
    if (Data.length > 1) {
      Info.innerHTML = `${Data.length} items left`;
    } else if (Data.length == 1) {
      Info.innerHTML = `1 item left`;
    } else if (Data.length == 0) {
      Info.innerHTML = `No items left`;
    }
  }
}

function ActiveAll() {
  for (let x = 0; x < btns.length; x++) {
    btns[x].classList.remove("active");
  }
  btns[0].classList.add("active");
}
