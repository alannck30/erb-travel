// #region navbar
const toggleButton = document.querySelector(".navbar__mobile-menu-toggle");
const mobileMenu = document.querySelector(".navbar__mobile-menu-items");

// Toggle menu on hamburger click
toggleButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  console.log("click");
  console.log(mobileMenu);
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
const cards = document.querySelectorAll(".section__card-container");
const bgImgs = document.querySelectorAll(".bg");
const videos = document.querySelectorAll(".hero__video");

cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    console.log("hovered");
    bgImgs.forEach((bgImg) => {
      bgImg.classList.remove("active");
      if (card.classList.contains(bgImg.id)) {
        bgImg.classList.add("active");
      }
    });
    videos.forEach((video) => {
      if (card.classList.contains(video.id.split("-")[1])) {
        video.classList.add("active");
      } else {
        video.classList.remove("active");
      }
    });
  });
});
// #endregion
