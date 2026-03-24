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
  imagePath: "../assets/london_assets/fish_chips.jpg",
  about:
    "London's culinary scene is a melting pot of global influences. From traditional pub grub to over 60 Michelin-starred restaurants, the city is a world-class destination for food lovers.",
  content: {
    name: "Fish and Chips",
    text: "The quintessential British comfort meal - battered fish served with chunky chips and mushy peas.",
  },
  funFact:
    "During WWII, Fish and Chips was one of the few foods never rationed in the UK because the government feared it would damage civilian morale. It truly is the nation's 'soul food'.",
};

const tea = {
  id: "tea",
  imagePath: "../assets/london_assets/afternoon_tea.jpg",
  about:
    "While coffee is popular, London's tea culture is legendary. From historic tea rooms to trendy East London cafes, the ritual of a 'proper brew' is central to London life.",
  content: {
    name: "Afternoon Tea",
    text: "An elegant tradition featuring finger sandwiches, scones with clotted cream, and fine teas.",
  },
  funFact:
    "The tradition of Afternoon Tea was started in 1840 by Anna, the 7th Duchess of Bedford, simply because she got 'a sinking feeling' in the late afternoon and couldn't wait until the 8 PM dinner!",
};

const festival = {
  id: "festival",
  imagePath: "../assets/london_assets/notting_hill.jpg",
  about:
    "London’s calendar is packed with world-famous events, from royal pageantry and flower shows to massive street carnivals that celebrate the city's diversity.",
  content: {
    name: "Notting Hill Carnival",
    text: "Europe's biggest street party celebrating Caribbean culture, music, and dance.",
  },
  funFact:
    "The Notting Hill Carnival attracts around 2.5 million people annually, making it the second-largest street festival in the world, surpassed only by Brazil's Rio Carnival.",
};

const music = {
  id: "music",
  imagePath: "../assets/london_assets/london_music.jpg",
  about:
    "As the birthplace of legendary bands and the global 'Cool Britannia' movement, London remains a powerhouse of rock, pop, and classical music performance.",
  content: {
    name: "Abbey Road",
    text: "The world's most famous recording studio and iconic crossing made famous by The Beatles.",
  },
  funFact:
    "London’s O2 Arena is the busiest music venue in the world! Also, more than 300 languages are spoken in London, and this diversity is reflected in the city’s incredible underground music scene.",
};

const cultures = [food, tea, festival, music];
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
    "layout--tea",
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

const USD = { code: "USD", rate: 0.75 };
const HKD = { code: "HKD", rate: 0.09 };
const EUR = { code: "EUR", rate: 0.86 };
const AUD = { code: "AUD", rate: 0.52 };
const SAR = { code: "SAR", rate: 0.2 };
const CNY = { code: "CNY", rate: 0.1 };

const currencyList = [USD, HKD, EUR, AUD, SAR, CNY];

selectedCurrency.addEventListener("change", () => {
  const match = currencyList.find((currency) => currency.code === selectedCurrency.value);
  document.getElementById("rate").innerText = `1 ${match.code} = ${match.rate.toFixed(2)} GBP`;
  const result = amountInput.value * match.rate;
  resultText.innerText = `Result: ${result.toFixed(2)} GBP`;
});

amountInput.addEventListener("input", () => {
  const match = currencyList.find((currency) => currency.code === selectedCurrency.value);
  document.getElementById("rate").innerText = `1 ${match.code} = ${match.rate.toFixed(2)} GBP`;
  const result = amountInput.value * match.rate;
  resultText.innerText = `Result: ${result.toFixed(2)} GBP`;
});

const defaultRate = (document.getElementById("rate").innerText = `1 USD = ${USD.rate} GBP`);
const defaultResult = (resultText.innerText = `Result: ${USD.rate} GBP`);
// #endregion
// #region weather
let weatherCache = null;
const london = { latitude: 51.5085, longitude: -0.1257 };

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

initWeather(london);

// #endregion
// #endregion
