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
  imagePath: "../assets/paris_assets/food.webp",
  about:
    "Paris is the global capital of gastronomy, where dining is an art form. From rustic bistros to Michelin-starred establishments, the city defines the standards of world cuisine.",
  content: {
    name: "The Baguette",
    text: "A symbol of French life—crispy on the outside and airy on the inside, baked fresh daily.",
  },
  funFact:
    "In Paris, there are strict laws governing what can be called a 'Baguette Tradition.' It must only contain four ingredients: flour, water, salt, and yeast. Parisians consume about 30 million baguettes a year!",
};

const drink = {
  id: "drink",
  imagePath: "../assets/paris_assets/wine.webp",
  about:
    "In Paris, wine isn't just a drink; it's a way of life. From the historic vineyards of Montmartre to cozy 'bars à vins,' the city offers the finest selections of Terroir-driven French wines.",
  content: {
    name: "French Wine & Champagne",
    text: "Whether it's a crisp Chablis or a celebratory glass of Champagne, wine is the heart of every Parisian meal.",
  },
  funFact:
    "Did you know Paris still has a functional vineyard? The 'Clos Montmartre' produces around 1,000 bottles of wine a year right in the middle of the city, with an annual festival to celebrate the harvest!",
};

const festival = {
  id: "festival",
  imagePath: "../assets/paris_assets/festival.webp",
  about:
    "Paris celebrates life through a calendar of elegant events, from world-leading fashion weeks to massive public celebrations along the Seine.",
  content: {
    name: "Bastille Day",
    text: "The French National Day featuring military parades on the Champs-Élysées and fireworks at the Eiffel Tower.",
  },
  funFact:
    "On the night of Bastille Day, fire stations across Paris open their doors to the public for 'Firemen’s Balls' (Bals des Pompiers), a tradition where locals dance with firefighters until dawn!",
};

const music = {
  id: "music",
  imagePath: "../assets/paris_assets/music.webp",
  about:
    "From the haunting melodies of Edith Piaf's Chanson to the sophisticated jazz of the Left Bank, Paris has always been a sanctuary for musical innovation.",
  content: {
    name: "La Vie en Rose",
    text: "The soulful sound of French Chanson that captures the romantic spirit of the city.",
  },
  funFact:
    "The Paris Opera House (Palais Garnier) has a real underground lake beneath it. This hidden water tank inspired the famous setting for the 'Phantom of the Opera'!",
};

const cultures = [food, drink, festival, music];
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
    "layout--drink",
    "layout--festival",
    "layout--music",
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

const USD = { code: "USD", rate: 0.87 };
const HKD = { code: "HKD", rate: 0.11 };
const CAD = { code: "CAD", rate: 0.63 };
const AUD = { code: "AUD", rate: 0.6 };
const SAR = { code: "SAR", rate: 0.23 };
const CNY = { code: "CNY", rate: 0.12 };

const currencyList = [USD, HKD, CAD, AUD, SAR, CNY];

selectedCurrency.addEventListener("change", () => {
  const match = currencyList.find((currency) => currency.code === selectedCurrency.value);
  document.getElementById("rate").innerText = `1 ${match.code} = ${match.rate.toFixed(2)} EUR`;
  const result = amountInput.value * match.rate;
  resultText.innerText = `Result: ${result.toFixed(2)} EUR`;
});

amountInput.addEventListener("input", () => {
  const match = currencyList.find((currency) => currency.code === selectedCurrency.value);
  document.getElementById("rate").innerText = `1 ${match.code} = ${match.rate.toFixed(2)} EUR`;
  const result = amountInput.value * match.rate;
  resultText.innerText = `Result: ${result.toFixed(2)} EUR`;
});

const defaultRate = (document.getElementById("rate").innerText = `1 USD = ${USD.rate} EUR`);
const defaultResult = (resultText.innerText = `Result: ${USD.rate} EUR`);
// #endregion
// #region weather
let weatherCache = null;
const paris = { latitude: 48.8534, longitude: 2.3488 };

async function initWeather({ latitude, longitude }) {
  const dateInput = document.getElementById("date-input");
  const display = document.getElementById("forecast");

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 6);

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

initWeather(paris);

// #endregion
// #endregion
