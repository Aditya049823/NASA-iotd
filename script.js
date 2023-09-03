const apiEndpoint = "https://api.nasa.gov/planetary/apod";
const apikey='mNcWa9PC7NkR70zKXjVcFydFAMAcwxTqLvkgf24N';

const currentDate = new Date().toISOString().split("T")[0];
document.getElementById("search-input").setAttribute("max", currentDate);
function getCurrentImageOfTheDay() {
  const url = `${apiEndpoint}?api_key=${apikey}&date=${currentDate}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const currentImageContainer = document.getElementById(
        "current-image-container"
      );
      currentImageContainer.innerHTML = `
        <h1>NASA Picture of the Day</h1>
        <img src="${data.url}" alt="${data.title}" class="nasa-image">
        <h2>${data.title}</h2>
        <p>${data.explanation}</p>
      `;
    })
    .catch((error) => console.log(error));
}

function getImageOfTheDay(date) {
  const url = `${apiEndpoint}?api_key=${apikey}&date=${date}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const currentImageContainer = document.getElementById(
        "current-image-container"
      );
      currentImageContainer.innerHTML = `
          <h1>Picture on ${date}</h1>
          <img src="${data.url}" alt="${data.title}" class="nasa-image">
          <h2>${data.title}</h2>
          <p>${data.explanation}</p>
        `;
      saveSearch(date);
    })
    .catch((error) => console.log(error));
}

function saveSearch(date) {
  const searches = JSON.parse(localStorage.getItem("searches")) || [];

  const search = { date: date };
  searches.push(search);
  localStorage.setItem("searches", JSON.stringify(searches));

  addSearchToHistory();
}

function addSearchToHistory() {
  const searchHistory = document.getElementById("search-history");
  searchHistory.innerHTML = "";

  const searches = JSON.parse(localStorage.getItem("searches")) || [];

  searches.forEach((search) => {
    const li = document.createElement("li");
    li.textContent = search.date;
    li.addEventListener("click", () => {
      getImageOfTheDay(search.date);
    });
    searchHistory.appendChild(li);
  });
}

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const searchInput = document.getElementById("search-input");
    const date = searchInput.value;
    console.log(date);
    getImageOfTheDay(date);
    searchInput.value = "";
  });
getCurrentImageOfTheDay();
addSearchToHistory();