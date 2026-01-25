document.addEventListener("DOMContentLoaded", () => {
  // --- WEATHER (NAV) ---
  fetchWeatherNav();

  function fetchWeatherNav() {
    const apiKey = 'b13ef6259a5f3c54f5ad973470879af3';
    const city = 'Shimla,IN';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        document.getElementById('weather-temp-nav').textContent = `${Math.round(data.main.temp)}°C`;
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        document.getElementById('weather-icon-nav').src = iconUrl;
      })
      .catch(() => {
        document.getElementById('weather-temp-nav').textContent = '--°C';
      });
  }

  // --- SMOOTH SCROLL ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // --- REVIEWS ---
  const reviews = [
    {
      img: "/img/view.jpg",
      text: "The hotel was simply amazing and I couldn't thank The Royal Heritage more...",
      reviewerImg: "/img/profile-pic.jpg",
      name: "Olivia Blisset",
      role: "Satisfied Traveler",
    },
    {
      img: "/img/view.jpg",
      text: "From the first step in, I knew this was going to be special...",
      reviewerImg: "/img/arvi.jpg",
      name: "Arvi",
      role: "Frequent Guest",
    },
  ];

  let currentReview = 0;
  function showReview(i) {
    const r = reviews[i];
    document.getElementById("review-img").querySelector("img").src = r.img;
    document.getElementById("review-text").innerText = r.text;
    document.getElementById("reviewer-img").src = r.reviewerImg;
    document.getElementById("reviewer-name").innerText = r.name;
    document.getElementById("reviewer-role").innerText = r.role;
  }
  showReview(currentReview);

  // --- Review Navigation ---
  window.nextReview = function() {
    currentReview = (currentReview + 1) % reviews.length;
    showReview(currentReview);
  };

  window.prevReview = function() {
    currentReview = (currentReview - 1 + reviews.length) % reviews.length;
    showReview(currentReview);
  };

  // --- CONTACT FORM (with localStorage) ---
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const contactName = document.getElementById('name');
    const contactEmail = document.getElementById('email');

    // Load data
    contactName.value = localStorage.getItem('userContactName') || "";
    contactEmail.value = localStorage.getItem('userContactEmail') || "";

    // Save on input
    contactName.addEventListener('input', () => {
      localStorage.setItem('userContactName', contactName.value);
    });
    contactEmail.addEventListener('input', () => {
      localStorage.setItem('userContactEmail', contactEmail.value);
    });

    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      const message = document.getElementById("message").value.trim();
      if (!contactName.value || !contactEmail.value || !message) {
        alert("Please fill in all fields.");
        return;
      }
      alert(`Thanks, ${contactName.value}! Your message has been received.`);
      contactForm.reset();
    });
  }

  // --- BOOKING MODAL (with localStorage) ---
  const modal = document.getElementById("bookingModal");
  const bookNowBtn = document.querySelector(".book-now");
  const choosePlanBtns = document.querySelectorAll(".room-btn");
  const closeBtn = document.getElementById("closeBooking");
  const bookingForm = document.getElementById("bookingForm");
  const roomTypeSelect = document.getElementById("room-type");

  function openModal() {
    modal.style.display = "flex";
    bookingForm.reset(); // resets all form fields
    document.getElementById("room-type").value = ""; // ensures first option selected
  }

  function closeModal() {
    modal.style.display = "none";
  }

  if (bookNowBtn) bookNowBtn.addEventListener("click", openModal);
  choosePlanBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const roomName = btn.closest(".room-info").querySelector("h4").textContent;
      [...roomTypeSelect.options].forEach(option => {
        if (option.text.includes(roomName)) option.selected = true;
      });
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  window.addEventListener("click", e => { if (e.target === modal) closeModal(); });

  bookingForm.addEventListener("submit", e => {
    e.preventDefault();
    const bookingData = {
      checkin: document.getElementById("checkin").value,
      checkout: document.getElementById("checkout").value,
      guests: document.getElementById("guests").value,
      roomType: document.getElementById("room-type").value
    };
    if (!bookingData.checkin || !bookingData.checkout || !bookingData.roomType) {
      alert("Please complete all booking fields.");
      return;
    }

    localStorage.setItem("userBooking", JSON.stringify(bookingData));
    alert("👑 Thank you for booking with us! We’ll ensure you have a truly royal stay 🏰");
    closeModal();
    bookingForm.reset();
  });

  function loadBookingData() {
    const savedBooking = localStorage.getItem("userBooking");
    if (savedBooking) {
      const data = JSON.parse(savedBooking);
      document.getElementById("checkin").value = data.checkin || "";
      document.getElementById("checkout").value = data.checkout || "";
      document.getElementById("guests").value = data.guests || "1";
      document.getElementById("room-type").value = data.roomType || "";
    }
  }

  // --- LOCAL TIME (NAV) ---
  function updateLocalTime() {
    const now = new Date();
    const options = {
      timeZone: 'Asia/Kolkata', // Shimla uses IST
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    const timeString = now.toLocaleTimeString('en-IN', options);
    const timeElement = document.getElementById("local-time-nav");
    if (timeElement) {
      timeElement.textContent = `${timeString} (IST)`;
    }
  }

  updateLocalTime();
  setInterval(updateLocalTime, 1000);
});
