// For swiper
var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    }
});
AOS.init();
// For Login an SignUp
function toggleSignupForm() {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('signup').classList.remove('hidden');
}

function toggleLoginForm() {
    document.getElementById('signup').classList.add('hidden');
    document.getElementById('login').classList.remove('hidden');
}
function validateSignup() {
    var password = document.getElementById('signupPassword').value;
    var passwordRepeat = document.getElementById('signup_confirm').value;
    var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordPattern.test(password)) {
        alert('Password must contain at least 8 characters including at least one uppercase letter, one lowercase letter, one number, and one special character.');
        return false;
    } else if (password !== passwordRepeat) {
        alert('Passwords missmatch, please enter same password!');
        return false;
    } else {
        toggleLoginForm();
        alert('Account successfuly created, login to access your data');
        return true;
    }
}
function validateLogin() {
    // Add your login validation logic here
}

// Nav hamburgerburger selections
const burger = document.querySelector(".burger-menu");
const ul = document.querySelector("nav ul");
const nav = document.querySelector("nav");

// Select nav links
const navLink = document.querySelectorAll(".nav-link");

// Hamburger menu function
burger.addEventListener("click", () => {
    ul.classList.toggle("show");
});

// Close hamburger menu when a link is clicked
navLink.forEach((link) =>
    link.addEventListener("click", () => {
        ul.classList.remove("show");
    })
);

// Get Messages written by users from homepage
// Initialize messages array when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Get existing messages from localStorage or initialize an empty array
    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];

    // Display existing messages (if any)
    displayMessages(messages);
});

// Function to display messages
function displayMessages(messages) {
    // Code to display messages on the page goes here
}

// Get Messages written by users from homepage
const contactMeForm = document.getElementById('contact__form');

contactMeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form input values
    const contactName = document.getElementById('cont_name').value.trim();
    const contactEmail = document.getElementById('cont_mail').value.trim();
    const contactMsgTitle = document.getElementById('cont_subj').value.trim();
    const contactMsgBody = document.getElementById('cont_descrp').value.trim();

    // Validate form inputs
    if (contactName === '' || contactEmail === '' || contactMsgTitle === '' || contactMsgBody === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Get existing messages from localStorage or initialize an empty array
    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];

    // Create a new message object
    const newMessage = {
        name: contactName,
        email: contactEmail,
        title: contactMsgTitle,
        body: contactMsgBody
    };

    // Add the new message to the array
    messages.push(newMessage);

    // Store the updated array back to localStorage
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    console.log('Message sent:', newMessage);
    contactMeForm.reset();
});
