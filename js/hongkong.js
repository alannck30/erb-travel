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

const date = (document.getElementById("date").innerHTML = new Date().getFullYear());

// #endregion

// #region menu
const sections = document.querySelectorAll(".section");
const links = document.querySelectorAll(".nav__link");
const menu = document.getElementById("menu");

const options = {
  root: null,
  threshold: 0,
  rootMargin: "-25% 0px -75% 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      links.forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add("active");

      menu.classList.add("show");
    } else if (entry.boundingClientRect.top > 0) {
      menu.classList.remove("show");
    }
  });
}, options);

menu.addEventListener("mouseenter", () => {
  menu.classList.add("full");
});

menu.addEventListener("mouseleave", () => {
  menu.classList.remove("full");
});

sections.forEach((section) => observer.observe(section));
// #endregion

// #region culture
const food = {
  id: "food",
  imagePath: "../assets/hongkong_assets/hk_dimsum.jpg",
  about:
    "Hong Kong is the world's culinary capital. Its heart lies in Dim Sum — 'touching the heart' — small bite-sized portions served in bamboo steamers.",
  content: {
    name: "Dim Sum",
    text: "A wide range of small dishes, from shrimp dumplings (Har Gow) to BBQ pork buns.",
  },
  funFact:
    "In Hong Kong, if someone taps the table with two fingers while you pour tea, they are saying 'thank you!' This tradition mimics a kowtow to an ancient Emperor traveling in disguise.",
};

const cha = {
  id: "cha",
  imagePath: "../assets/hongkong_assets/hk_cha.jpg",
  about:
    "The 'Cha Chaan Teng' (Tea Restaurant) is the soul of Hong Kong's local dining. It represents the city's unique fusion of British and Chinese culinary habits.",
  content: {
    name: "Silk Stocking Milk Tea",
    text: "Ultra-smooth black tea mixed with evaporated milk, filtered through a sackcloth bag.",
  },
  funFact:
    "The famous 'Yuenyeung' drink is a perfect 50/50 mix of coffee and milk tea. It’s the ultimate symbol of Hong Kong: a hybrid that shouldn't work, but tastes amazing!",
};

const festival = {
  id: "festival",
  imagePath: "../assets/hongkong_assets/hk_festival.jpg",
  about:
    "Hong Kong celebrates its heritage through spectacular festivals, featuring fire dragons, massive bamboo theaters, and rhythmic drum beats.",
  content: {
    name: "Dragon Boat Festival",
    text: "Intense racing of long, decorated boats accompanied by traditional Zongzi (sticky rice).",
  },
  funFact:
    "During the Cheung Chau Bun Festival, people used to scramble up a 60-foot tower made of real buns! Today, they use plastic 'lucky buns' for safety, but the spirit of the race remains the same.",
};

const cinema = {
  id: "cinema",
  imagePath: "../assets/hongkong_assets/hk_cinema.jpg",
  about:
    "From the golden age of Cantopop to the legendary action cinema, Hong Kong’s entertainment industry has influenced global pop culture for decades.",
  content: {
    name: "Cantopop & Cinema",
    text: "The vibrant mix of local Cantonese music and world-renowned martial arts films.",
  },
  funFact:
    "Bruce Lee actually started as a child actor in Hong Kong and was a Cha-Cha dancing champion before becoming a global Kung Fu icon! His philosophy still shapes the city's 'be water' spirit.",
};

const cultures = [food, cha, festival, cinema];
const gridList = document.querySelectorAll(".culture__content--grid");
const imageContainer = document.getElementById("image");
const aboutContainer = document.getElementById("about");
const egContainer = document.getElementById("eg");
const ffContainer = document.getElementById("ff");
const gridContainer = document.querySelector(".culture__content");
const cultureUnderline = document.querySelectorAll(".culture__content .culture__underline");

const renderContent = (data) => {
  if (!data) return;
  imageContainer.innerHTML = `<img src="${data.imagePath}">`;
  aboutContainer.innerHTML = `
  <h1>About</h1>
  <p>${data.about}</p>`;

  egContainer.innerHTML = `
  <h1>${data.content.name}</h1>
  <p>${data.content.text}</p>`;

  ffContainer.innerHTML = `
  <h1>Fun Fact</h1>
  <p>${data.funFact}</p>
  `;
};

const changeGridLayout = (type) => {
  gridContainer.classList.remove(
    "layout--food",
    "layout--cha",
    "layout--festival",
    "layout--cinma",
  );
  gridContainer.classList.add(`layout--${type}`);
};

gridList.forEach((grid) => {
  const data = cultures.find((c) => c.id === grid.id);
  if (data) {
    grid.addEventListener("click", () => {
      cultureUnderline.forEach((line) => line.classList.remove("active"));

      const currentLine = grid.querySelector(".culture__content .culture__underline");

      currentLine.classList.add("active");

      changeGridLayout(grid.id);
      renderContent(data);
    });
  }
});

if (cultures.length > 0) {
  renderContent(cultures[0]);
}
// #endregion

// #region guide
// #region currency
const amountInput = document.getElementById("amount");
const selectedCurrency = document.getElementById("currency");
const resultText = document.getElementById("result");

const USD = { code: "USD", rate: 7.82 };
const JPY = { code: "JPY", rate: 0.04 };
const EUR = { code: "EUR", rate: 8.96 };
const GBP = { code: "GBP", rate: 10.37 };
const SAR = { code: "SAR", rate: 2.08 };
const CNY = { code: "CNY", rate: 1.13 };

const currencyList = [USD, JPY, EUR, GBP, SAR, CNY];

selectedCurrency.addEventListener("change", () => {
  const match = currencyList.find((currency) => currency.code === selectedCurrency.value);
  document.getElementById("rate").innerText = `1 ${match.code} = ${match.rate.toFixed(2)} HKD`;
  const result = amountInput.value * match.rate;
  resultText.innerText = `Result: ${result.toFixed(2)} HKD`;
});

amountInput.addEventListener("input", () => {
  const match = currencyList.find((currency) => currency.code === selectedCurrency.value);
  document.getElementById("rate").innerText = `1 ${match.code} = ${match.rate.toFixed(2)} HKD`;
  const result = amountInput.value * match.rate;
  resultText.innerText = `Result: ${result.toFixed(2)} HKD`;
});

const defaultRate = (document.getElementById("rate").innerText = `1 USD = ${USD.rate} HKD`);
const defaultResult = (resultText.innerText = `Result: ${USD.rate} HKD`);
// #endregion
// #region weather
let weatherCache = null;
const hongkong = { latitude: 22.2783, longitude: 114.1747 };

async function initWeather({ latitude, longitude }) {
  const dateInput = document.getElementById("date-input");
  const display = document.getElementById("forecast");

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 6);

  console.log(today.getDate());

  const formatDate = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  dateInput.min = formatDate(today);
  dateInput.max = formatDate(nextWeek);
  dateInput.value = formatDate(today);

  const url = `
  https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    weatherCache = data.daily;
    updateUI(dateInput.value);
  } catch (err) {
    display.innerHTML = "Please try later!";
  }

  dateInput.addEventListener("change", (e) => {
    updateUI(e.target.value);
  });

  function updateUI(selectedDate) {
    if (!weatherCache) {
      return;
    }

    const index = weatherCache.time.indexOf(selectedDate);

    if (index !== -1) {
      const maxTemp = weatherCache.temperature_2m_max[index];
      const minTemp = weatherCache.temperature_2m_min[index];
      const rain = weatherCache.precipitation_probability_max[index];

      display.innerHTML = `
      <p>Selected Date: ${selectedDate}</p>
      <p>Temperature: ${minTemp}°C - ${maxTemp}°C</p>
      <p>Rain Probability: ${rain}%</p>
      `;
    }
  }
}

initWeather(hongkong);

// #endregion
// #endregion
