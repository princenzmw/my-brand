/********* The end of the Navbar functionality ********************/
// Get the navbar and toggle button elements
const navbar = document.getElementById('dashboard_navbar');
const toggleBtn = document.getElementById('toggleNav');
const navLinks = document.querySelectorAll('.dash_nav_links');

// Add click event listener to the toggle button
toggleBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // Stop the click event from propagating to the document
    navbar.classList.toggle('show_nav');
});

// Add click event listener to the links in the navbar to highlight selected link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(otherLink => {
            otherLink.classList.remove('side_selected');
        })
        link.classList.add('side_selected');
    })
});

// Add scroll event listener to close the navbar when user scrolls
document.addEventListener('scroll', () => {
    navbar.classList.remove('show_nav');
});
// Add click event listener to close the navbar when user clicks outside of it
document.addEventListener('click', function (event) {
    if (!navbar.contains(event.target) && event.target !== toggleBtn) {
        navbar.classList.remove('show_nav');
    }
});
/********* The end of the Navbar functionality ********************/

// Adding links

// Get the navbar and toggle button elements
const blogLink = document.getElementById('dsh_blg');
const projectLink = document.getElementById('dsh_prj');
const portfolioLink = document.getElementById('dsh_port');
const usersLink = document.getElementById('dsh_usrs');
const postsLink = document.getElementById('dsh_posts');
const commentsLink = document.getElementById('dsh_comts');
const logoutLink = document.getElementById('dsh_lgt');

// Function to load HTML content into a specific element
function loadHTMLContent(url, targetElement) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            targetElement.innerHTML = data;
        })
        .catch(error => console.error('Error loading HTML content:', error));
}

// Add click event listener to the blog link to load the HTML content
blogLink.addEventListener('click', function () {
    const blogContainer = document.querySelector('.dumbtest');
    loadHTMLContent('../blogs/bloghome.html', blogContainer);
});
projectLink.addEventListener('click', function () {
    const blogContainer = document.querySelector('.dumbtest');
    loadHTMLContent('../../index.html', blogContainer);
});
logoutLink.addEventListener('click', function () {
    const blogContainer = document.querySelector('.dumbtest');
    loadHTMLContent('../../index.html', blogContainer);
});


/**
 * Other functionalities to widen sidebar or make it small
 */
const navBigger = document.querySelector('.tog_off');
const navSmaller = document.querySelector('.tog_on');
const imgContainer = document.querySelector('.dash_profile');
const mainElement = document.querySelector('main');
const linksWord = document.querySelectorAll('.linkToShow');

navSmaller.addEventListener('click', () => {
    navbar.classList.add('small');
    imgContainer.classList.add('small');
    linksWord.forEach(link => {
        link.classList.add('small');
    })
    mainElement.classList.add('small');
    navSmaller.style.display = 'none';
    navBigger.style.display = 'block';
})
navBigger.addEventListener('click', () => {
    navbar.classList.remove('small');
    imgContainer.classList.remove('small');
    linksWord.forEach(link => {
        link.classList.remove('small');
    })
    mainElement.classList.remove('small');
    navBigger.style.display = 'none';
    navSmaller.style.display = 'block';
})
/**
 * Styles for dark and light mode
 */
const darkMode = document.querySelector('.dark_thm');
const lightMode = document.querySelector('.light_thm');

darkMode.addEventListener('click', () => {
    document.body.style.backgroundColor = '#000000';
    document.body.style.color = '#ffffff';
    darkMode.style.display = 'none';
    lightMode.style.display = 'block';
})
lightMode.addEventListener('click', () => {
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#000000';
    lightMode.style.display = 'none';
    darkMode.style.display = 'block';
})
