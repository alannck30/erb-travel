// #region navbar
const toggleButton = document.querySelector(".navbar__mobile-menu-toggle");
const mobileMenu = document.querySelector(".navbar__mobile-menu-items");

// Toggle menu on hamburger click
toggleButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

// Close menu when clicking a menu link
const menuLinks = document.querySelectorAll(".navbar__mobile-menu-list");
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});
// #endregion

// #region footer
const date = (document.getElementById("date").innerHTML = new Date().getFullYear());
// #endregion

// #region change background and video
// the order of the images,videos and the cards in html must be the same
const cards = document.querySelectorAll(".section__card-container");
const bgImgs = document.querySelectorAll(".bg");
const videos = document.querySelectorAll(".hero__video");
const gridContainer = document.querySelector(".grid-container");
const progressBars = document.querySelectorAll(".section__card-progress-fill");

let realIndex = 0;

function initCarousel() {
  cards[0].classList.add("active");

  progressBars.forEach((bar) => {
    bar.addEventListener("animationend", () => {
      const nextIndex = (realIndex + 1) % cards.length;
      playNext(realIndex, nextIndex);
      realIndex = nextIndex;
    });
  });
}

function playNext(prev, next) {
  [cards, bgImgs, videos].forEach((list) => {
    list[prev].classList.remove("active");
    list[next].classList.add("active");
  });
}

function updateDisplay(from, to) {
  [bgImgs, videos].forEach((list) => {
    list[from].classList.remove("active");
    list[to].classList.add("active");
  });
}

gridContainer.addEventListener("mouseover", (e) => {
  const hoveredCard = e.target.closest(".section__card-container");

  if (!hoveredCard) return;
  progressBars.forEach((bar) => {
    bar.style.animationPlayState = "paused";
  });

  const hoverIndex = [...cards].indexOf(hoveredCard);
  if (hoverIndex !== realIndex) {
    updateDisplay(realIndex, hoverIndex);
  }
});

gridContainer.addEventListener("mouseout", (e) => {
  const hoveredCard = e.target.closest(".section__card-container");

  if (!hoveredCard) return;
  progressBars.forEach((bar) => {
    bar.style.animationPlayState = "running";
  });

  const visibleIndex = [...bgImgs].findIndex((img) => img.classList.contains("active"));
  if (visibleIndex !== realIndex) {
    updateDisplay(visibleIndex, realIndex);
  }
});

initCarousel();

// #endregion
