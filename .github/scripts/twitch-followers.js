// Get the container
const container = document.getElementById("twitch-followers");

// Get the username from data-attribute
const username = container.dataset.username;

if (!username) {
  container.innerText = "No user specified";
} else {
  fetch(".github/data/twitch_stats.json")
    .then(r => r.json())
    .then(data => {
      const talent = data.talents.find(
        t => t.username.toLowerCase() === username.toLowerCase()
      );

      if (!talent) {
        console.error("User not found:", username);
        container.innerText = "N/A";
        return;
      }

      // Inject follower count
      container.innerText = talent.followers;
    })
    .catch(err => {
      console.error(err);
      container.innerText = "Error";
    });
}
