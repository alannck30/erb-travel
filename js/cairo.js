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
  imagePath: "../assets/cairo_assets/cairo_food.webp",
  about:
    "Cairo's food scene is a delicious blend of ancient traditions and modern flavors. From street food to fine dining, the city offers an unforgettable culinary journey.",
  content: {
    name: "Kushari",
    text: "Egypt's national dish - a flavorful mix of rice, pasta, lentils, and chickpeas",
  },
  funFact:
    "Ancient Egyptians loved Onions so much that they swore oaths by them! Today, fried onions are the soul of Koshary. Even the Pharaohs were buried with onions to help them breathe in the afterlife.",
};

const cafe = {
  id: "cafe",
  imagePath: "../assets/cairo_assets/cairo_coffee.webp",
  about:
    "Cairo's coffee houses, known as 'ahwas,' are the heartbeat of social life. These traditional cafes have been gathering places for intellectuals, artists, and friends for generations.",
  content: {
    name: "Turkish Coffee",
    text: "Rich, strong coffee served in small cups with cardamom",
  },
  funFact:
    "In a traditional Cairo Ahwa, you don't just order a drink; you order a 'conversation.' Many famous Egyptian novels, including those by Nobel prize winner Naguib Mahfouz, were written entirely on café tables.",
};

const festival = {
  id: "festival",
  imagePath: "../assets/cairo_assets/cairo_festival.webp",
  about:
    "Cairo comes alive with vibrant festivals throughout the year, celebrating religious holidays, cultural events, and artistic achievements.",
  content: {
    name: "Ramadan Nights",
    text: "The city transforms with lanterns and festive decorations",
  },
  funFact:
    "The Fanous (Ramadan lantern) was originally used to light the Caliph's way through Cairo's dark streets in the 10th century. Today, it has evolved into a global symbol of the holy month.",
};

const music = {
  id: "music",
  imagePath: "../assets/cairo_assets/cairo_music.webp",
  about:
    "Cairo is the beating heart of Arabic music, home to legendary composers and singers. The city's musical tradition spans from classical Arabic melodies to modern pop.",
  content: {
    name: "Umm Kulthum",
    text: "The legendary 'Star of the East' who captivated millions",
  },
  funFact:
    "Cairo's legendary singer Umm Kulthum had a voice so powerful that she had to stand 3 feet away from the microphone! Her monthly radio concerts used to literally clear the streets of the Middle East.",
};

const cultures = [food, cafe, festival, music];
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
    "layout--cafe",
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

const USD = { code: "USD", rate: 52.36 };
const HKD = { code: "HKD", rate: 6.69 };
const EUR = { code: "EUR", rate: 60.3 };
const GBP = { code: "GBP", rate: 69.9 };
const SAR = { code: "SAR", rate: 13.96 };
const CNY = { code: "CNY", rate: 7.61 };

const currencyList = [USD, HKD, EUR, GBP, SAR, CNY];

selectedCurrency.addEventListener("change", () => {
  const match = currencyList.find((currency) => currency.code === selectedCurrency.value);
  document.getElementById("rate").innerText = `1 ${match.code} = ${match.rate.toFixed(2)} EGP`;
  const result = amountInput.value * match.rate;
  resultText.innerText = `Result: ${result.toFixed(2)} EGP`;
});

amountInput.addEventListener("input", () => {
  const match = currencyList.find((currency) => currency.code === selectedCurrency.value);
  document.getElementById("rate").innerText = `1 ${match.code} = ${match.rate.toFixed(2)} EGP`;
  const result = amountInput.value * match.rate;
  resultText.innerText = `Result: ${result.toFixed(2)} EGP`;
});

const defaultRate = (document.getElementById("rate").innerText = `1 USD = 52.36 EGP`);
const defaultResult = (resultText.innerText = "Result: 52.36 EGP");
// #endregion
// #region weather
let weatherCache = null;
const cairo = { latitude: 30.0626, longitude: 31.2497 };

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

initWeather(cairo);

// #endregion
// #endregion
