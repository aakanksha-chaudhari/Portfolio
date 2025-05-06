// ================= ScrollReveal Animations =================
// ScrollReveal is used to animate elements when they appear in the viewport on scroll.
// Configuration: reset allows animation to replay, distance is how far elements move, duration is how long animation lasts, and delay is the wait before it starts.
ScrollReveal({
  reset: true,
  distance: '60px',
  duration: 2000,
  delay: 200,
});

// Revealing elements from the top
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });

// Revealing elements from the bottom
ScrollReveal().reveal(
  '.home-img, .about-img, .services-container, .portfolio-box, .contact form',
  { origin: 'bottom' }
);

// Revealing elements from the left and right
ScrollReveal().reveal('.about-img', { origin: 'left' });
ScrollReveal().reveal('.about-content', { origin: 'right' });

// Extra ScrollReveal config (this part is a duplicate, you can remove one set)
ScrollReveal({
  reset: true,
  distance: '60px',
  duration: 2000,
  delay: 200
});
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// ================= Active Nav on Scroll =================
// This section adds an "active" class to the nav link when the user scrolls to the corresponding section.
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150; // Adjusted position
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id'); // Get current section ID
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active'); // Remove active class from all
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active'); // Add active class to current section link
    }
  });
};

// ================= Mobile Nav Toggle =================
// Toggles the menu icon and navbar on small screens when the icon is clicked.
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
if (menuIcon) {
  menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x'); // Changes icon to 'X'
    navbar.classList.toggle('active'); // Opens/closes the navbar
  };
}

// ============ Contact Form with Validation & Formspree Integration ============
// Validates form fields (name, email, message) before submitting using Formspree API.
document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const submitButton = document.querySelector('button[type="submit"]');

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  let valid = true;

  // Basic field validation with alerts
  if (name === "") {
    alert("Please enter your name.");
    valid = false;
  }

  if (email === "") {
    alert("Please enter your email.");
    valid = false;
  } else if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    valid = false;
  }

  if (message === "") {
    alert("Please enter your message.");
    valid = false;
  }

  // If all valid, submit form using Formspree
  if (valid) {
    submitButton.disabled = true;

    fetch('https://formspree.io/f/mldjvwqp', {
      method: 'POST',
      body: new FormData(this)
    })
    .then(response => {
      if (response.ok) {
        document.getElementById('contact-form').reset();
        alert('Message Sent! We will get back to you soon.');
      } else {
        alert('Oops! Something went wrong. Please try again later.');
      }
      submitButton.disabled = false;
    })
    .catch(error => {
      alert('There was an error sending your message. Please try again later.');
      submitButton.disabled = false;
    });
  }
});

// ================= Project Filter Logic =================
// Filters project boxes based on the clicked category (All, Web, App, AI, etc.)
const filterButtons = document.querySelectorAll('.filter');
const projectBoxes = document.querySelectorAll('.project-box');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.filter.active').classList.remove('active'); // Remove active from all buttons
    button.classList.add('active'); // Set current button as active

    const filterValue = button.getAttribute('data-filter');
    projectBoxes.forEach(box => {
      if (filterValue === 'all' || box.classList.contains(filterValue)) {
        box.style.display = 'block'; // Show matched
      } else {
        box.style.display = 'none'; // Hide unmatched
      }
    });
  });
});

// ================= Back to Top Button =================
// Displays a button when user scrolls down and scrolls smoothly to top when clicked
const scrollBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollBtn.style.display = "block"; // Show button
  } else {
    scrollBtn.style.display = "none"; // Hide button
  }
};

// Scroll to top smoothly
scrollBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ================= Typing Text Animation =================
// Creates animated typing effect for different roles or titles
var typed = new Typed(".typing-text", {
  strings: [
    "Full Stack Developer",
    "AI Enthusiast",
    "Open Source Contributor",
    "Lifelong Learner"
  ],
  typeSpeed: 60,
  backSpeed: 30,
  loop: true // Keeps typing in a loop
});

// ================= Subtitle Underline Animation =================
// Adds reveal class to subtitle after 1.5 seconds for underline animation (CSS driven)
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) subtitle.classList.add('reveal');
  }, 1500);
});


document.addEventListener("DOMContentLoaded", function() {
  // Typing effect for "And I'm a"
  const typingText = document.querySelector('.typing-text');
  const roles = ["Full Stack Developer", "AI Enthusiast", "Open Source Contributor", "Lifelong Learner"];
  let roleIndex = 0;
  let charIndex = 0;

  function typeRole() {
    if (charIndex < roles[roleIndex].length) {
      typingText.innerHTML += roles[roleIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeRole, 100); // Adjust typing speed
    } else {
      setTimeout(deleteRole, 1000); // Pause before deleting
    }
  }

  // Delete the current role and move to the next one
  function deleteRole() {
    if (charIndex > 0) {
      typingText.innerHTML = typingText.innerHTML.slice(0, -1);
      charIndex--;
      setTimeout(deleteRole, 50); // Adjust deleting speed
    } else {
      roleIndex = (roleIndex + 1) % roles.length; // Change to the next role
      setTimeout(typeRole, 500); // Pause before typing the next role
    }
  }

  typeRole(); // Start the typing effect

  // Role change animation in the sub-heading
  const roleChange = document.querySelector('.role-change');
  let roleChangeIndex = 0;
  const rolesForSubHeading = ["Creative Developer", "Tech Innovator", "Future Coder"];

  function changeRole() {
    if (roleChangeIndex < rolesForSubHeading.length) {
      roleChange.innerHTML = rolesForSubHeading[roleChangeIndex];
      roleChangeIndex++;
    } else {
      roleChangeIndex = 0; // Restart role change
    }
    setTimeout(changeRole, 2000); // Change every 2 seconds
  }

  changeRole(); // Start the role change
});
