
// default: Home laden
loadPage("home");

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

window.addEventListener("popstate", (event) => {
  const page = (event.state && event.state.page) || "home";
  loadPage(page, false); // false → nicht erneut in History pushen
});


function initRoulette() {
  const roulette = document.querySelector(".roulette");
  if (!roulette) return;

  // Mausrad horizontal scrollen
  roulette.addEventListener("wheel", (e) => {
    e.preventDefault();
    roulette.scrollLeft += e.deltaY;
  });
}

