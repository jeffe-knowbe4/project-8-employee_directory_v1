const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// show modal on card click
$(".cards").addEventListener("click", (e) => {
  const card = e.target.closest(".card");

  if (card) {
    showModal(card);
  }
});

// employee search
$("#search").addEventListener("keyup", (e) => {
  const val = e.target.value.toLowerCase();
  $$(".card .name").forEach((el) => {
    if (el.textContent.toLowerCase().includes(val)) {
      el.closest(".card").classList.remove("hide");
    } else {
      el.closest(".card").classList.add("hide");
    }
  });
});

// modal close button
$(".modal .close").addEventListener("click", (e) => {
  $(".overlay").classList.remove("show");
});

// show modal previous
$(".prev").addEventListener("click", (e) => {
  currentIndex--;
  if (currentIndex < 0) currentIndex = employees.length - 1;
  const card = $(`.card[data-index="${currentIndex}"]`);
  showModal(card);
});

// show modal next
$(".next").addEventListener("click", (e) => {
  currentIndex++;
  if (currentIndex >= employees.length) currentIndex = 0;
  const card = $(`.card[data-index="${currentIndex}"]`);
  showModal(card);
});

function showModal(card) {
  $(".overlay").classList.add("show");
  currentIndex = card.dataset.index;
  const employee = employees[currentIndex];
  $(".modal .image img").src = employee.picture.large;
  $(
    ".modal .image img"
  ).alt = `Employee image of ${employee.name.first} ${employee.name.last}`;
  $(
    ".modal .name"
  ).textContent = `${employee.name.first} ${employee.name.last}`;
  $(".modal .email").textContent = employee.email;
  $(".modal .email").href = `mailto:${employee.email}`;
  $(".modal .location").textContent = employee.location.city;
  $(".modal .phone").textContent = employee.phone;
  const loc = employee.location;
  $(
    ".modal .address"
  ).textContent = `${loc.street.number} ${loc.street.name}, ${loc.state} ${loc.postcode}`;
  const dob = new Date(employee.dob.date);
  const day = String(dob.getDay()).padStart(2, 0);
  const month = String(dob.getMonth()).padStart(2, 0);
  $(
    ".modal .birthday"
  ).textContent = `Birthday: ${day}/${month}/${dob.getFullYear()}`;
}

// app start, fetch employees
let employees = [];
let currentIndex;

async function fetchEmployees() {
  const resp = await fetch(
    "https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob"
  );
  const json = await resp.json();
  employees = json.results;
  displayEmployees(employees);
}

function displayEmployees(data) {
  const html = data
    .map((employee, i) => {
      return `
      <div class="card" data-index="${i}">
        <div class="image">
          <img src="${employee.picture.large}" alt="Employee image of ${employee.name.first} ${employee.name.last}" />
        </div>
        <div class="info">
          <div class="name" data-name="${employee.name.first} ${employee.name.last}">${employee.name.first} ${employee.name.last}</div>
          <a class="email">${employee.email}</a>
          <div class="location">${employee.location.city}</div>
        </div>
      </div>
    `;
    })
    .join("");
  $(".cards").innerHTML = html;
}

fetchEmployees();
