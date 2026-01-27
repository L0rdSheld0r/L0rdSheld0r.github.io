// /scripts/twitch-followers.js
// Lädt /data/twitch_stats.json (Default), cached die Daten und rendert .twitch-followers[ data-username ]
const TWITCH_STATS_URL = '/data/twitch_stats.json'; // anpassen falls nötig

let __twitchStatsCache = null;

export async function loadTwitchStats(url = TWITCH_STATS_URL) {
  if (__twitchStatsCache) return __twitchStatsCache;
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) {
      console.warn('Konnte twitch_stats nicht laden:', res.status);
      __twitchStatsCache = {};
      return __twitchStatsCache;
    }
    const data = await res.json();
    __twitchStatsCache = data;
    return data;
  } catch (err) {
    console.warn('Fehler beim Laden der twitch_stats:', err);
    __twitchStatsCache = {};
    return __twitchStatsCache;
  }
}

// Liefert die followerzahl (Number) oder null; unterstützt zwei JSON-Formate
export function getFollowerCountFromStats(stats, username) {
  if (!stats || !username) return null;
  // Format A: { "userA": { followers: 123 } }
  if (stats[username] && typeof stats[username].followers !== 'undefined') {
    return stats[username].followers;
  }
  // Format B: { users: { "userA": { followers: 123 } } }
  if (stats.users && stats.users[username] && typeof stats.users[username].followers !== 'undefined') {
    return stats.users[username].followers;
  }
  return null;
}

// Füllt alle data-username-template zu data-username="username"
// und setzt data-username="" (leere) ebenfalls auf username
export function fillUsernameTemplates(container = document, username) {
  if (!username) return;
  const root = (container instanceof Element) ? container : document;
  // Elemente mit dem Marker-Attribut
  root.querySelectorAll('[data-username-template]').forEach(el => {
    el.setAttribute('data-username', username);
    el.removeAttribute('data-username-template');
  });
  // Elemente, die schon data-username existiert aber leer ist
  root.querySelectorAll('.twitch-followers[data-username]').forEach(el => {
    if (!el.getAttribute('data-username')) el.setAttribute('data-username', username);
  });
}

// Rendert alle .twitch-followers[<usernameAttr>] innerhalb container (oder document)
export async function renderTwitchFollowerCounts(container = document, opts = {}) {
  const usernameAttr = opts.usernameAttr || 'data-username';
  const placeholder = opts.placeholder || '—';
  const root = (container instanceof Element) ? container : document;
  const elems = Array.from(root.querySelectorAll(`.twitch-followers[${usernameAttr}]`));
  if (!elems.length) return;
  const stats = await loadTwitchStats();
  elems.forEach(el => {
    const username = el.getAttribute(usernameAttr);
    const count = getFollowerCountFromStats(stats, username);
    el.textContent = (count === null) ? placeholder : new Intl.NumberFormat().format(count);
  });
}