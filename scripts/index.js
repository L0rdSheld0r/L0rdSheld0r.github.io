// /scripts/index.js
// Einfacher Loader: lädt die Partial, setzt Username-Templates und rendert Follower
import { fillUsernameTemplates, renderTwitchFollowerCounts } from './twitch-followers.js';

/**
 * loadTalentPage(username, partialUrl?, containerSelector?)
 * - username: der Twitch-username, der in die Partial eingesetzt werden soll
 * - partialUrl: Pfad zur Partial (default '/partials/talent.html')
 * - containerSelector: CSS-Selector des Containers (default '#main-content')
 */
export async function loadTalentPage(username, partialUrl = '/partials/talent.html', containerSelector = '#main-content') {
  const resp = await fetch(partialUrl);
  if (!resp.ok) {
    console.error('Konnte Partial nicht laden:', resp.status);
    return;
  }
  const html = await resp.text();
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error('Container nicht gefunden:', containerSelector);
    return;
  }
  container.innerHTML = html;

  // Setze Username in Templates / leere data-username
  fillUsernameTemplates(container, username);

  // Optional: sichtbaren Namen setzen (falls vorhanden)
  const nameEl = container.querySelector('.talent-name');
  if (nameEl) nameEl.textContent = username;

  // Follower rendern (verwendet cached twitch_stats.json)
  await renderTwitchFollowerCounts(container);
}