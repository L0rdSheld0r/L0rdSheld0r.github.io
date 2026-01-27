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
