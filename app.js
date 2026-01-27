function loadPage(page) {
  let path;

  if (page === "home") {
    path = `pages/home.html`;
  } else {
    // alle Talente liegen im Unterordner /pages/talents
    path = `pages/talents/${page}.html`;
  }

  fetch(path)
    .then(res => res.text())
    .then(html => {
      document.getElementById("app").innerHTML = html;
      initRoulette(); // wichtig für home.html
    });
}

// default: Home laden
loadPage("home");


const track = document.querySelector(".roulette-track");
const cards = document.querySelectorAll(".card");

function spin() {
  const index = Math.floor(Math.random() * cards.length);
  const offset = index * 220; // card width + gap
  track.style.transform = `translateX(-${offset}px)`;
}
