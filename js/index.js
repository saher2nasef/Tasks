let checkBox = document.getElementById("checkBox");
let TextToDo = document.getElementById("TextToDo");
let InnerData = document.getElementById("InnerData");
let Btn = document.getElementById("Btn");
// To toggle the theme
let Bool = false;
Btn.addEventListener("click", () => {
  var r = document.querySelector(":root");

  if (Bool == false) {
    Bool = true;
    Btn.src = "images/icon-sun.svg";
    r.style.setProperty("--Color", "#fff");
    r.style.setProperty("--Bg", "hsl(235, 24%, 19%)");
    r.style.setProperty("--Bg1", "hsl(235, 21%, 11%)");
    // Moon
  } else {
    Bool = false;
    Btn.src = "images/icon-moon.svg";
    r.style.setProperty("--Color", "hsl(235, 19%, 35%)");
    r.style.setProperty("--Bg", " #fff");
    r.style.setProperty("--Bg1", "#fff");
    // Sun
  }
});
window.onload = () => {
  if (localStorage.getItem("Data") === null) {
    localStorage.setItem("Data", JSON.stringify([]));
  } else {
    let Data = JSON.parse(localStorage.getItem("Data"));

    FullDiv(Data);
  }
};
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
  }
});
function DeleteById(Id) {
  let Data = JSON.parse(localStorage.getItem("Data"));
  let Result = Data.filter((Item) => Item.Id == Id);
  Data.splice(Data.indexOf(Result[0]), 1);
  localStorage.setItem("Data", JSON.stringify(Data));
  FullDiv(Data);
}
function EditById(Id) {
  let Data = JSON.parse(localStorage.getItem("Data"));
  let Result = Data.filter((Item) => Item.Id == Id);
  let Value = Data[Data.indexOf(Result[0])].Active;
  Data[Data.indexOf(Result[0])].Active = !Value;
  console.log(Data);
  localStorage.setItem("Data", JSON.stringify(Data));
  FullDiv(Data);
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
