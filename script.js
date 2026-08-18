
const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const barsBox = document.querySelector('.bars-box');

const menuIcon = document.querySelector('#menu-icon');
const nav = document.querySelector('header nav');

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('bx-x');
  nav.classList.toggle('active');
});

let isAnimating = false;

function changePage(index) {

  // Prevent double clicking during animation
  if (isAnimating) return;

  isAnimating = true;

  // Start bars animation
  barsBox.classList.add('active');

  // Change page when screen is covered
  setTimeout(() => {

    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    navLinks[index].classList.add('active');

    sections.forEach(section => {
      section.classList.remove('active');
    });

    sections[index].classList.add('active');

  }, 600);


  // Remove bars after animation
  setTimeout(() => {

    barsBox.classList.remove('active');
    isAnimating = false;

  }, 1200);
}


// Navbar links
navLinks.forEach((link, index) => {

  link.addEventListener('click', (e) => {

    e.preventDefault();

    if (!link.classList.contains('active')) {
      changePage(index);
    }

    // Close mobile menu
    menuIcon.classList.remove('bx-x');
    nav.classList.remove('active');

  });

});

// Logo → Home
logoLink.addEventListener('click', (e) => {

  e.preventDefault();

  if (!navLinks[0].classList.contains('active')) {
    changePage(0);
  }
  menuIcon.classList.remove('bx-x');
  nav.classList.remove('active');

});
// ===============================
// RESUME SECTION
// ===============================

const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

resumeBtns.forEach((btn, idx) => {

  btn.addEventListener('click', () => {

    // Remove active from buttons
    resumeBtns.forEach(btn => {
      btn.classList.remove('active');
    });

    // Add active to clicked button
    btn.classList.add('active');


    // Remove active from details
    resumeDetails.forEach(detail => {
      detail.classList.remove('active');
    });

    // Show selected detail
    resumeDetails[idx].classList.add('active');

  });

});


// ===============================
// PORTFOLIO SLIDER
// ===============================

const portfolioDetails =
  document.querySelectorAll('.portfolio-detail');

const imgSlide =
  document.querySelector('.portfolio-carousel .img-slide');

const arrowRight =
  document.querySelector('.portfolio .arrow-right');

const arrowLeft =
  document.querySelector('.portfolio .arrow-left');

let index = 0;


// Show portfolio
function activePortfolio() {

  // Content
  portfolioDetails.forEach(detail => {
    detail.classList.remove('active');
  });

  portfolioDetails[index].classList.add('active');


  // Image
  imgSlide.style.transform =
    `translateX(calc(${index * -100}% - ${index * 2}rem))`;

}


// Right arrow
if (arrowRight) {

  arrowRight.addEventListener('click', () => {

    if (index < portfolioDetails.length - 1) {
      index++;
    } else {
      index = 0;
    }

    activePortfolio();

  });

}


// Left arrow
if (arrowLeft) {

  arrowLeft.addEventListener('click', () => {

    if (index > 0) {
      index--;
    } else {
      index = portfolioDetails.length - 1;
    }

    activePortfolio();

  });

}

// ===============================
// CONTACT FORM - EMAILJS
// ===============================

emailjs.init({
  publicKey: '1vEFBMBjThLt_9iM9'
});

const contactForm = document.querySelector('#contact-form');
const formMessage = document.querySelector('#form-message');

contactForm.addEventListener('submit', function (e) {

  e.preventDefault();

  console.log("FORM SUBMITTED");

  emailjs.sendForm(
    'service_2x6v93y',
    'template_1h7kjqh',
    this
  )
   .then(() => {

    formMessage.textContent =
        'Thank you! Your message has been sent successfully.';

  

    contactForm.reset();

})
    .catch((error) => {

      console.log("EMAIL ERROR:", error);

      formMessage.textContent =
        'Message could not be sent. Please try again.';

    });

});