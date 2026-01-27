// Update follower count for a container
function updateFollowers(container) {
  const username = container.dataset.username;
  if (!username) {
    container.innerText = "No user specified";
    return;
  }

  fetch(".github/data/twitch_stats.json")
    .then(r => {
      if (!r.ok) throw new Error("Cannot fetch JSON");
      return r.json();
    })
    .then(data => {
      const talent = data.talents.find(
        t => t.username.toLowerCase() === username.toLowerCase()
      );

      if (!talent) {
        console.error("User not found:", username);
        container.innerText = "N/A";
        return;
      }

      container.innerText = talent.followers;
    })
    .catch(err => {
      console.error(err);
      container.innerText = "Error";
    });
}

// Call this after loading dynamic content
function initFollowers(parent = document) {
  parent.querySelectorAll(".twitch-followers").forEach(updateFollowers);
}
