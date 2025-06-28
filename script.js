// ======= DOM Elements =======
const carList = document.getElementById('car-list'); // Main car list
const searchInput = document.getElementById('search');// Search input
const filterDropdown = document.getElementById('filter');// Filter dropdown
const favoritesList = document.getElementById('favorites-list'); // Favorites list

// ======= Global Variables =======
let allCars = []; // All cars fetched from the server
let favoriteCars = []; // Array to hold favorite cars

// ======= Fetch Data from json-server =======
fetch('https://car-api-w6oq.onrender.com/cars') // Adjust the URL to your json-server endpoint
  .then(response => response.json()) // Parse the JSON response
  .then(data => { // Store the fetched data
    allCars = data;// Store all cars in the global variable
    displayCars(allCars); // Display all cars initially
  }) // Handle any errors during fetch
  .catch(error => console.error("Error fetching data:", error)); // Log any errors to the console

// ======= Display Main Car List =======
function displayCars(cars) { // Function to display cars in the main list
  carList.innerHTML = ''; // Clear the car list before displaying new cars

  cars.forEach(car => { // Loop through each car and create a card
    const card = document.createElement('div'); // Create a new div for each car
    card.className = 'car-card'; // Assign a class for styling

    card.innerHTML = ` 
      <img src="${car.image}" alt="${car.make} ${car.model}">
      <h3>${car.make} ${car.model}</h3>
      <p><strong>Year:</strong> ${car.year}</p>
      <p><strong>Fuel:</strong> ${car.fuel_type}</p>
      <p><strong>Transmission:</strong> ${car.transmission}</p>
      <p><strong>Body Type:</strong> ${car.body_type}</p>
      <button class="favorite-btn" data-id="${car.id}"> Favorite</button>
    `; // Create the HTML structure for each car card

    const favBtn = card.querySelector('.favorite-btn'); // Select the favorite button within the card
    favBtn.addEventListener('click', () => { // Add click event listener to the favorite button
      toggleFavorite(car); // Call the toggleFavorite function with the current car
    }); // Toggle favorite status when the button is clicked

    carList.appendChild(card); // Append the card to the car list
  });
}

// ======= Toggle Favorite Function =======
function toggleFavorite(car) { // Function to toggle favorite status of a car
  const isFav = favoriteCars.some(fav => fav.id === car.id); // Check if the car is already in the favorites list

  if (isFav) { // If the car is already a favorite, remove it from the favorites list
    favoriteCars = favoriteCars.filter(fav => fav.id !== car.id); // Filter out the car from the favorites array
  } else { // If the car is not a favorite, add it to the favorites list
    favoriteCars.push(car); // Add the car to the favorites array
  } // Update the favorites list display

  displayFavorites(); // Call the function to display the updated favorites list
} // Toggle favorite status of a car

// ======= Display Favorite Cars =======
function displayFavorites() { // Function to display favorite cars in the favorites list
  favoritesList.innerHTML = ''; // Clear the favorites list before displaying new favorites

  if (favoriteCars.length === 0) { // If there are no favorite cars, display a message
    favoritesList.innerHTML = '<p>No favorites yet.</p>'; // Show a message indicating no favorites
    return; // Exit the function if no favorites
  } // If there are favorite cars, create cards for each favorite car

  favoriteCars.forEach(car => { // Loop through each favorite car
    const card = document.createElement('div'); // Create a new div for each favorite car
    card.className = 'car-card'; // Assign a class for styling

    card.innerHTML = `
      <img src="${car.image}" alt="${car.make} ${car.model}">
      <h3>${car.make} ${car.model}</h3>
      <p><strong>Year:</strong> ${car.year}</p>
      <p><strong>Fuel:</strong> ${car.fuel_type}</p>
      <p><strong>Transmission:</strong> ${car.transmission}</p>
      <p><strong>Body Type:</strong> ${car.body_type}</p>
      <button class="remove-fav-btn" data-id="${car.id}"> Remove</button>
    `; // Create the HTML structure for each favorite car card

    const removeBtn = card.querySelector('.remove-fav-btn'); // Select the remove button within the card
    removeBtn.addEventListener('click', () => { // Add click event listener to the remove button
      toggleFavorite(car); // Call the toggleFavorite function with the current car to remove it from favorites
    }); // Remove the car from favorites when the button is clicked

    favoritesList.appendChild(card); // Append the card to the favorites list
  }); // Append the favorite car card to the favorites list
} // Display favorite cars in the favorites list

// ======= Search Input Event =======
searchInput.addEventListener('input', () => { // Event listener for search input
  const term = searchInput.value.toLowerCase(); // Get the search term and convert it to lowercase for case-insensitive search

  const filtered = allCars.filter(car => // Filter cars based on the search term
    car.make.toLowerCase().includes(term) || // Check if the make includes the search term
    car.model.toLowerCase().includes(term) // Check if the model includes the search term
  ); // Filter cars based on the search term

  displayCars(filtered); // Display the filtered cars in the main car list
}); // Search input event to filter cars based on user input

// ======= Filter Dropdown Event =======
filterDropdown.addEventListener('change', () => { // Event listener for filter dropdown
  const selected = filterDropdown.value; // Get the selected value from the dropdown

  if (selected === 'all') { // If 'all' is selected, display all cars
    displayCars(allCars); // Display all cars in the main car list
  } else { // If a specific body type is selected, filter cars by that body type
    const filtered = allCars.filter(car => car.body_type === selected); // Filter cars based on the selected body type
    displayCars(filtered); // Display the filtered cars in the main car list
  } // Filter dropdown event to display cars based on selected body type
}); // Filter dropdown event to filter cars based on selected body type
