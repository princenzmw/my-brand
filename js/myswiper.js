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

// For header
const navButton = document.querySelector(".navbutton");
const navDropdown = document.querySelector(".nav_links");

navButton.addEventListener("click", () => {
    navDropdown.classList.toggle("created");
    console.log('buton clicked');
});

window.addEventListener("resize", function () {
    if (window.innerWidth <= 768) {
        navDropdown.classList.add("created");
    } else if (window.innerWidth > 768) {
        navDropdown.classList.remove("created");
    }
});
////////////////////////////
