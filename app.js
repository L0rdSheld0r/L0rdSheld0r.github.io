function loadPage(page) {
  fetch(`pages/${page}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("app").innerHTML = html;
    });
}

// On first load:
const page = location.hash.replace("#", "") || "home";
loadPage(page);

// Back/forward buttons
window.onpopstate = () => {
  const page = location.hash.replace("#", "") || "home";
  loadPage(page);
};


const track = document.querySelector(".roulette-track");
const cards = document.querySelectorAll(".card");

function spin() {
  const index = Math.floor(Math.random() * cards.length);
  const offset = index * 220; // card width + gap
  track.style.transform = `translateX(-${offset}px)`;
}
