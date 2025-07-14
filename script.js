// Open modal
document.querySelector(".book-now").addEventListener("click", () => {
  document.getElementById("bookingModal").style.display = "flex";
});

// Close modal
function closeModal() {
  document.getElementById("bookingModal").style.display = "none";
}

// Handle form
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;
  const guests = document.getElementById("guests").value;

  if (!checkin || !checkout || !guests) {
    alert("Please fill all booking fields.");
    return;
  }

  alert(`✅ Booking Confirmed!\n📅 Check-in: ${checkin}\n📅 Check-out: ${checkout}\n👤 Guests: ${guests}`);
  closeModal();
});

const reviews = [
  {
    img: "img/view.jpg",
    text:
      "The hotel was simply amazing and I couldn't thank The Velvet Oak more for helping out. I've been a customer for awhile and I have to say it's probably my favourite hotel!",
    reviewerImg: "img/profile-pic.jpg",
    name: "Olivia Blisset",
    role: "Satisfied Traveler",
  },
  {
    img: "img/view.jpg",
    text:
      "From the first step in, I knew this was going to be special. The staff were lovely, and the atmosphere was magical. Highly recommend to anyone seeking comfort with class.",
    reviewerImg: "img/arvi.jpg",
    name: "Arvi",
    role: "Frequent Guest",
  },
];

let currentReview = 0;

function showReview(index) {
  const review = reviews[index];
  document.getElementById("review-img").querySelector("img").src = review.img;
  document.getElementById("review-text").innerText = review.text;
  document.getElementById("reviewer-img").src = review.reviewerImg;
  document.getElementById("reviewer-name").innerText = review.name;
  document.getElementById("reviewer-role").innerText = review.role;
}

function nextReview() {
  currentReview = (currentReview + 1) % reviews.length;
  showReview(currentReview);
}

function prevReview() {
  currentReview = (currentReview - 1 + reviews.length) % reviews.length;
  showReview(currentReview);
}

document.addEventListener("DOMContentLoaded", function () {
  showReview(currentReview);
});

// Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  alert(`Thanks, ${name}! Your message has been received. We'll respond shortly.`);
  this.reset(); // Clear the form
});
