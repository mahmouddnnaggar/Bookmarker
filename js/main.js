var NameInput = document.getElementById("NameInput");
var UrlInput = document.getElementById("UrlInput");
var SearchInput = document.getElementById("SearchInput");
var BookMarks = [];
var IndexUpdate = 0;
var text = UrlInput.value;
var regexName = /^[A-z]{5,20}\.com$/;
if (localStorage.getItem("BookMarks", BookMarks) != null) {
  BookMarks = JSON.parse(localStorage.getItem("BookMarks"));
}
DisplayData();

function Create() {
  if (NameInput.value == "" || UrlInput.value == "") {
    document.getElementById("alert-invalid").classList.remove("d-none");
  } else if (regexName.test(text) == false) {
    document.getElementById("alert-invalid").classList.remove("d-none");
  } else {
    var BookMark = {
      Name: NameInput.value,
      Url: UrlInput.value,
    };
    BookMarks.push(BookMark);
    DisplayData();
    localStorage.setItem("BookMarks", JSON.stringify(BookMarks));
    UrlInput.classList.remove("is-valid");
    document.getElementById("alert-invalid").classList.add("d-none");
    ClearForm();
  }
}

function ClearForm() {
  NameInput.value = "";
  UrlInput.value = "";
}

function DisplayData() {
  var Data = "";
  for (var i = 0; i < BookMarks.length; i++) {
    Data += `<div class="row gy-2 bg-light p-2 my-2 rounded">
        <div class="col-lg-9">${BookMarks[i].Name}</div>
        <div class="col-lg-3 row">
          <div class="col-lg-4"><button class="btn btn-outline-info"><a target="_blank" href="${BookMarks[i].Url}">Visit</a></button></div>
          <div class="col-lg-4"><button class="btn btn-outline-danger" onclick="Delete(${i});">Delete</button></div>
          <div class="col-lg-4"><button class="btn btn-outline-warning" onclick="ShowData(${i});">Update</button></div>
        </div>
      </div>`;
  }
  document.getElementById("read").innerHTML = Data;
}

function Delete(i) {
  BookMarks.splice(i, 1);
  localStorage.setItem("BookMarks", JSON.stringify(BookMarks));
  DisplayData();
}

function ShowData(i) {
  IndexUpdate = i;
  NameInput.value = BookMarks[i].Name;
  UrlInput.value = BookMarks[i].Url;
  document.getElementById("CreateBtn").classList.add("d-none");
  document.getElementById("UpdateBtn").classList.remove("d-none");
}

function Update() {
  if (NameInput.value == "" || UrlInput.value == "") {
    document.getElementById("alert-invalid").classList.remove("d-none");
  } else if (regexName.test(text) == false) {
    document.getElementById("alert-invalid").classList.remove("d-none");
  } else {
    BookMarks[IndexUpdate].Name = NameInput.value;
    BookMarks[IndexUpdate].Url = UrlInput.value;
    DisplayData();
    ClearForm();
    localStorage.setItem("BookMarks", JSON.stringify(BookMarks));
    document.getElementById("CreateBtn").classList.remove("d-none");
    document.getElementById("UpdateBtn").classList.add("d-none");
    UrlInput.classList.remove("is-valid");
    document.getElementById("alert-invalid").classList.add("d-none");
  }
}

function Search() {
  var Data = "";
  ("");
  for (var i = 0; i < BookMarks.length; i++) {
    if (
      BookMarks[i].Name.toLowerCase().includes(SearchInput.value.toLowerCase())
    ) {
      Data += `<div class="row gy-2 bg-light p-2 my-2 rounded">
        <div class="col-lg-9">${BookMarks[i].Name}</div>
        <div class="col-lg-3 row">
          <div class="col-lg-4"><button class="btn btn-outline-info"><a target="_blank" href="${BookMarks[i].Url}">Visit</a></button></div>
          <div class="col-lg-4"><button class="btn btn-outline-danger" onclick="Delete(${i});">Delete</button></div>
          <div class="col-lg-4"><button class="btn btn-outline-warning" onclick="ShowData(${i});">Update</button></div>
        </div>
      </div>`;
    }
  }
  document.getElementById("read").innerHTML = Data;
}

function Validation() {
  text = UrlInput.value;
  regexName = /^[A-z]{5,20}\.com$/;

  if (regexName.test(text) == true) {
    UrlInput.classList.add("is-valid");
    UrlInput.classList.remove("is-invalid");
  } else {
    UrlInput.classList.remove("is-valid");
    UrlInput.classList.add("is-invalid");
  }
}
