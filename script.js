/*
Step 1: Get references to DOM elements
*/
// Get a reference to the main container
const container = document.querySelector(".container");

// Reference of all available seats
const seats = document.querySelectorAll(".row .seat:not(.sold)");

// Reference of the count and total elements
const count = document.getElementById("count");
const total = document.getElementById("total");

// Reference of the movie dropdown
const movieSelect = document.getElementById("movie");

/*
Step 2: Add event listeners
*/

// Event listner for movie selection change
movieSelect.addEventListener("change", e => {
  //Update ticket price and store selected movie data
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);

  // Update displayed count and total
  updateSelectedCount();
});

// Event listner for seat clicks
container.addEventListener("click", e => {
  // check if a seat is clicked and not sold
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    //Toggle seat selection
    e.target.classList.toggle("selected");

    // Update displayed count and total
    updateSelectedCount();
  }
});

/*
Step 3: Define funtion to update selected count and total
*/

function updateSelectedCount() {
  // Get all selected seats
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // Get an array of selected seats's indexes
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  // Store selected seats index into local storage
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  // Calculate selected seats and count
  const selectedSeatsCounts = selectedSeats.length;

  // Update UI with selected seats count and total price
  count.innerText = selectedSeatsCounts;
  total.innerText = selectedSeatsCounts * ticketPrice;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

/*
Step 4: Define funtion to set selected movie data, in local storage
*/
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

/*
Step 5: Define funtion to populate UI with local storage data
*/
// Function to populate UI from local storage data

function populateUI() {
  // Get selected seats from local storage
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  // If there are selected seats, mark them as selected in the UI
  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  // Get selected movie data from local storage
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  // If there's a selected movie index, then set it in the dropdown
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

/*
Step 6: Initial setup of count, total and UI based on save data
*/
populateUI();

// Initialize ticket price
let ticketPrice = +movieSelect.value;

updateSelectedCount();

/* 
scroolll
*/
// Show/Hide Payment Details Based on Selected Method
// Show/Hide Payment Details Based on Selected Method
const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
const paymentDetails = document.querySelectorAll('.payment-method-details');

paymentMethods.forEach((method) => {
  method.addEventListener('change', () => {
    paymentDetails.forEach((detail) => detail.classList.add('hidden'));
    const selectedDetail = document.querySelector(`#${method.value}-details`);
    if (selectedDetail) {
      selectedDetail.classList.remove('hidden');
    }
  });
});

// Form Submission Handler
const paymentForm = document.getElementById('payment-form');
paymentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Payment Successful! Thank you for booking.');
});
// JavaScript to animate the image wrapper horizontally
const imageWrapper = document.querySelector('.image-wrapper'); // Get the image wrapper
const images = document.querySelectorAll('.profile-image'); // Get all the images
const totalWidth = images.length * 250 + (images.length - 1) * 20; // Calculate the total width of the images plus gaps
let position = 0; // Initial position of the images

// Function to animate the side scroll
function animateScroll() {
  // Move the wrapper to the left by 2px
  position -= 2; // Change the value to adjust speed

  // Reset position to the right if it has scrolled out of view
  if (position <= -totalWidth) {
    position = window.innerWidth;
  }

  // Set the new transform position to create horizontal scroll
  imageWrapper.style.transform = `translateX(${position}px)`;

  // Call animateScroll again using requestAnimationFrame for smooth animation
  requestAnimationFrame(animateScroll);
}

// Start the animation
animateScroll();




paymentButton.addEventListener('click', handlePayment);
