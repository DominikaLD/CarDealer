//initialization
document.addEventListener("DOMContentLoaded", initialLoad);

let $buttonBack = document.getElementById("backToMainPage");
$buttonBack.addEventListener("click", historyBack);
let $searchButton = document.getElementById("search_button");
$searchButton.addEventListener("click", searchBrand);
let $yearButton = document.getElementById("production_year");
$yearButton.addEventListener("click", sortingByYear);

// functions
function initialLoad() {
  document.getElementById("main_form").style.display = "none";
  document.getElementById("buycar_page").style.display = "none";
  deliveryDay = new Date();
  deliveryDay.setDate(deliveryDay.getDate() + 14);
  document.getElementById("date").value = deliveryDay
    .toISOString()
    .split("T")[0];

  loadCars();
  addEventsListeneres();
}

function loadCars() {
  const main_container = document.getElementById("main_container");
  for (let i = 0; i < carsTable.length; i++) {
    let carArticle = `
    <section class="section_center" id="section${i}">
        <div class="car_article">
          <h1>${carsTable[i].brand}</h1>
          <h1>${carsTable[i].productionYear}</h1>
          <h1>${carsTable[i].mileage}</h1>
          <h1>${carsTable[i].carPrice} PLN</h1>
          <img class="car_photo" alt="${carsTable[i].brand}-Photo" src="${carsTable[i].carPhoto}" />
        </div>
      </section>
    `;
    main_container.innerHTML += carArticle;
  }
}

function addEventsListeneres() {
  for (let i = 0; i < carsTable.length; i++) {
    let $carBox = document.getElementById(`section${i}`);
    $carBox.addEventListener("click", changePageToForm);
    $carBox.addEventListener("click", transferDataToForm);
  }
}

function changePageToForm() {
  let $navMenu = document.getElementById("nav_menu");
  $navMenu.style.display = "none";
  document.getElementById("main_container").style.display = "none";
  document.getElementById("main_form").style.display = "";
  loadAccesories();
  addEventsListeneresForLocalStorage();
  loadDataLocalStorage();
}

function transferDataToForm(elementClicked) {
  let $carBoxId = elementClicked.currentTarget.id;
  let carId = $carBoxId.slice(7);
  selectedCar = carsTable[carId];
  loadForm(selectedCar);
}

function loadForm(carInfo) {
  let carName = document.getElementById("carName");
  carName.innerText = carInfo.brand;
  document.getElementById("photoCar").src = carInfo.carPhoto;
  let carPrice = document.getElementById("carPrice");
  carPrice.innerText = carInfo.carPrice;
}

function buyCar() {
  let $nameInput = document.getElementById("name_input").value;
  if ($nameInput.includes(" ")) {
    let $mainForm = document.getElementById("main_form");
    $mainForm.style.display = "none";
    document.getElementById("footer").style.display = "none";
    document.getElementById("buycar_page").style.display = "block";
    document.getElementById("nav_menu").style.display = "block";
    localStorage.clear();
    loadBoughtCar(selectedCar);
  } else {
    alert("Imię i nazwisko musi zawierać spację");
  }
}

function loadBoughtCar(carBought) {
  let carBoughtName = document.getElementById("carBoughtName");
  carBoughtName.innerText = `Dziękujemy za zakup auta ${carBought.brand}!`;
  let deliveryDate = document.getElementById("date").value;
  let carBoughtDate = document.getElementById("carBoughtDate");
  carBoughtDate.innerText = `Zostanie dostarczony ${deliveryDate}`;
  document.getElementById("carBoughtPhoto").src = carBought.carPhoto;
  carPrice = document.getElementById("carPrice").innerText;
  let $carBoughtPrice = document.getElementById("carBoughtPrice");
  $carBoughtPrice.innerText = `Koszt auta to ${carPrice} PLN`;
}

function historyBack() {
  document.getElementById("main_container").style.display = "flex";
  document.getElementById("nav_menu").style.display = "block";
  document.getElementById("main_form").style.display = "none";
}

function loadAccesories() {
  const $accesories_list = document.getElementById("accesories");
  for (let i = 0; i < accesoriesTable.length; i++) {
    let carAccesories = `
      <input class="form-check-input" type="checkbox" value=""  id="accesories${i}"/>
      <label class="form-check-label" for="flexCheckIndeterminate" id="text">${accesoriesTable[i].name}</label>
      `;
    $accesories_list.innerHTML += carAccesories;
  }
  addEventsListeneresForAccesories();
}

function addEventsListeneresForAccesories() {
  for (let i = 0; i < accesoriesTable.length; i++) {
    let $accesoriesList = document.getElementById(`accesories${i}`);
    $accesoriesList.addEventListener("click", addAccesories);
  }
}

function addAccesories(accesoryClick) {
  let $accesoryCheckBoxId = accesoryClick.currentTarget.id;
  let checkBox = document.getElementById($accesoryCheckBoxId);
  if (checkBox.checked == true) {
    let accesoryId = $accesoryCheckBoxId.slice(10);
    selectedAccesories = accesoriesTable[accesoryId];
    addPrice(selectedAccesories.price);
  } else {
    removePrice(selectedAccesories.price);
  }
}

function addPrice(accesoriePrice) {
  let price = document.getElementById("carPrice").innerHTML;
  price = Number(price) + accesoriePrice;
  document.getElementById("carPrice").innerHTML = price;
}

function removePrice(accesoriePrice) {
  let price = document.getElementById("carPrice").innerHTML;
  price = Number(price) - accesoriePrice;
  document.getElementById("carPrice").innerHTML = price;
}

let selectedCar;
function searchBrand() {
  let input = document.getElementById("search_brand").value;
  let x = document.querySelectorAll(".section_center");
  for (i = 0; i < x.length; i++) {
    if (
      x[i].innerText.toLocaleLowerCase().includes(input.toLocaleLowerCase())
    ) {
      x[i].classList.remove("is-hidden");
    } else {
      x[i].classList.add("is-hidden");
    }
  }
}

function sortingByYear() {
  let x = document.querySelectorAll(".section_center");
  for (i = 0; i < x.length; i++) {
    let carYear = x[i].innerText.toLocaleLowerCase();
    if (carYear.includes("2023") || carYear.includes("2022")) {
      x[i].classList.remove("is-hidden");
    } else {
      x[i].classList.add("is-hidden");
    }
  }
}
function addEventsListeneresForLocalStorage() {
  let nameInput = document.getElementById("name_input");
  nameInput.addEventListener("change", addToLocalSorageInput);
  let adressInput = document.getElementById("adress");
  adressInput.addEventListener("change", addToLocalSorageInput);
  let cardInput = document.getElementById("card_type");
  cardInput.addEventListener("change", addToLocalSorageInput);
  let accesoryCheckBox0 = document.getElementById("accesories0");
  accesoryCheckBox0.addEventListener("change", addToLocalSorageCheckBox);
  let accesoryCheckBox1 = document.getElementById("accesories1");
  accesoryCheckBox1.addEventListener("change", addToLocalSorageCheckBox);
  let accesoryCheckBox2 = document.getElementById("accesories2");
  accesoryCheckBox2.addEventListener("change", addToLocalSorageCheckBox);
  let accesoryCheckBox3 = document.getElementById("accesories3");
  accesoryCheckBox3.addEventListener("change", addToLocalSorageCheckBox);
}

function addToLocalSorageInput(changedElement) {
  let elementId = changedElement.currentTarget.id;
  let inputValue = document.getElementById(elementId).value;
  localStorage.setItem(elementId, inputValue);
}

function addToLocalSorageCheckBox(changedElement) {
  let elementId = changedElement.currentTarget.id;
  let inputValue = document.getElementById(elementId).checked;
  localStorage.setItem(elementId, inputValue);
}

function loadDataLocalStorage() {
  document.getElementById("name_input").value =
    localStorage.getItem("name_input");
  document.getElementById("adress").value = localStorage.getItem("adress");
  document.getElementById("card_type").value =
    localStorage.getItem("card_type");
  document.getElementById("accesories0").checked =
    localStorage.getItem("accesories0");
  document.getElementById("accesories1").checked =
    localStorage.getItem("accesories1");
  document.getElementById("accesories2").checked =
    localStorage.getItem("accesories2");
  document.getElementById("accesories3").checked =
    localStorage.getItem("accesories3");
}

// Data

let accesoriesTable = [
  {
    id: 1,
    name: "Komplet opon ziomowych",
    price: 1000,
  },
  {
    id: 2,
    name: "Ubezpieczenie auta",
    price: 2000,
  },
  {
    id: 3,
    name: "Alarm",
    price: 3000,
  },
  {
    id: 4,
    name: "Radio",
    price: 4000,
  },
];
let carsTable = [
  {
    brand: "Mercedes AMG GT",
    productionYear: "2022",
    mileage: "50 tys. km",
    carPhoto: "./img/car1.jpg",
    carPrice: 200000,
  },
  {
    brand: "Audi RS6",
    productionYear: "2021",
    mileage: "100 tys. km",
    carPhoto: "./img/car2.jpg",
    carPrice: 100000,
  },
  {
    brand: "Mercedes AMG GT",
    productionYear: "2020",
    mileage: "80 tys. km",
    carPhoto: "./img/car3.jpg",
    carPrice: 300000,
  },
  {
    brand: "BMW 3 series",
    productionYear: "2020",
    mileage: "2000 tys. km",
    carPhoto: "./img/car4.jpg",
    carPrice: 100000,
  },
  {
    brand: "Ford Mustang",
    productionYear: "2023",
    mileage: "10 tys. km",
    carPhoto: "./img/car5.jpg",
    carPrice: 1000000,
  },
  {
    brand: "Honda Civic R",
    productionYear: "2021",
    mileage: "400 tys. km",
    carPhoto: "./img/car6.jpg",
    carPrice: 300000,
  },
  {
    brand: "Ford Focus",
    productionYear: "2021",
    mileage: "400 tys. km",
    carPhoto: "./img/car7.jpg",
    carPrice: 300000,
  },
  {
    brand: "Ferrari 296 GTS",
    productionYear: "2021",
    mileage: "400 tys. km",
    carPhoto: "./img/car8.jpg",
    carPrice: 300000,
  },
];
