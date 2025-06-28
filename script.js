// ======= DOM Elements =======
const carList = document.getElementById('car-list'); // Main car list
const searchInput = document.getElementById('search');// Search input
const filterDropdown = document.getElementById('filter');// Filter dropdown
const favoritesList = document.getElementById('favorites-list'); // Favorites list

// ======= Global Variables =======
let allCars = []; // All cars fetched from the server
let favoriteCars = []; // Array to hold favorite cars

// ======= Fetch Data from json-server =======
fetch('https://ayunda808.github.io/car-explorer/') // Adjust the URL to your json-server endpoint
  .then(response => response.json()) // Parse the JSON response
  .then(data => {
    allCars = data;
    displayCars(allCars);
  })
  .catch(error => console.error("Error fetching data:", error));

// ======= Display Main Car List =======
function displayCars(cars) {
  carList.innerHTML = '';

  cars.forEach(car => {
    const card = document.createElement('div');
    card.className = 'car-card';

    card.innerHTML = `
      <img src="${car.image}" alt="${car.make} ${car.model}">
      <h3>${car.make} ${car.model}</h3>
      <p><strong>Year:</strong> ${car.year}</p>
      <p><strong>Fuel:</strong> ${car.fuel_type}</p>
      <p><strong>Transmission:</strong> ${car.transmission}</p>
      <p><strong>Body Type:</strong> ${car.body_type}</p>
      <button class="favorite-btn" data-id="${car.id}"> Favorite</button>
    `;

    const favBtn = card.querySelector('.favorite-btn');
    favBtn.addEventListener('click', () => {
      toggleFavorite(car);
    });

    carList.appendChild(card);
  });
}

// ======= Toggle Favorite Function =======
function toggleFavorite(car) {
  const isFav = favoriteCars.some(fav => fav.id === car.id);

  if (isFav) {
    favoriteCars = favoriteCars.filter(fav => fav.id !== car.id);
  } else {
    favoriteCars.push(car);
  }

  displayFavorites();
}

// ======= Display Favorite Cars =======
function displayFavorites() {
  favoritesList.innerHTML = '';

  if (favoriteCars.length === 0) {
    favoritesList.innerHTML = '<p>No favorites yet.</p>';
    return;
  }

  favoriteCars.forEach(car => {
    const card = document.createElement('div');
    card.className = 'car-card';

    card.innerHTML = `
      <img src="${car.image}" alt="${car.make} ${car.model}">
      <h3>${car.make} ${car.model}</h3>
      <p><strong>Year:</strong> ${car.year}</p>
      <p><strong>Fuel:</strong> ${car.fuel_type}</p>
      <p><strong>Transmission:</strong> ${car.transmission}</p>
      <p><strong>Body Type:</strong> ${car.body_type}</p>
      <button class="remove-fav-btn" data-id="${car.id}">❌ Remove</button>
    `;

    const removeBtn = card.querySelector('.remove-fav-btn');
    removeBtn.addEventListener('click', () => {
      toggleFavorite(car);
    });

    favoritesList.appendChild(card);
  });
}

// ======= Search Input Event =======
searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();

  const filtered = allCars.filter(car =>
    car.make.toLowerCase().includes(term) ||
    car.model.toLowerCase().includes(term)
  );

  displayCars(filtered);
});

// ======= Filter Dropdown Event =======
filterDropdown.addEventListener('change', () => {
  const selected = filterDropdown.value;

  if (selected === 'all') {
    displayCars(allCars);
  } else {
    const filtered = allCars.filter(car => car.body_type === selected);
    displayCars(filtered);
  }
});
