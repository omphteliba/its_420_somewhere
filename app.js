"use strict";

const TARGET_SEC = 16 * 3600 + 20 * 60; // 16:20:00
const DAY = 86400;
const FLAG_URL = (cc) => `https://flagcdn.com/${cc}.svg`;

// Optional for testing: ?at=2026-04-20T15:20:00Z simulates a start time.
const clockOffset = (() => {
  const at = new URLSearchParams(location.search).get("at");
  const t = at ? Date.parse(at) : NaN;
  return Number.isNaN(t) ? 0 : t - Date.now();
})();
const now = () => new Date(Date.now() + clockOffset);

// ---------- settings & i18n ----------

const settings = {
  lang: localStorage.getItem("lang") || "auto",
  clock: localStorage.getItem("clock") || "auto",
};

const TEXT = {
  en: {
    tagline: "It's 420 somewhere.",
    settings: "Settings",
    litIn: "It's 4:20 right now in",
    justIn: "Just hit 4:20 in",
    rightNow: "right now! 🔥",
    since: (t) => `since ${t}`,
    howFar: "How far?",
    away: (km) => `≈ ${km} km away`,
    youAreThere: "You're right there 🌿",
    locating: "Locating…",
    noLocation: "Location unavailable",
    nextSesh: "Next sesh",
    yourTime: "Your time",
    yourLit: "<b>It's 4:20 for you!</b> 🔥",
    yourIn: (t) => `Your 4:20 in <b>${t}</b>`,
    upNext: "Up next",
    upNextHint: "When it hits 4:20 there – in your local time.",
    install: "Add to home screen",
    responsibly: "Enjoy responsibly – and only where it's legal 🌿",
    language: "Language",
    clock: "Clock",
    langAuto: "Automatic (browser)",
    close: "Close",
    more: (n) => `+${n} more`,
    and: "and",
    strainsTitle: "Strains from around here",
    strainsHint: "Landraces and classics from this time zone – a small selection.",
    strainsNone: (wait) => `Nothing documented from this time zone – these are up next, in ${wait}:`,
    landrace: "Landrace",
    classic: "Classic",
    sativa: "Sativa",
    indica: "Indica",
    hybrid: "Hybrid",
    ruderalis: "Ruderalis",
    pageOf: (i, n) => `${i} of ${n}`,
    prev: "Previous",
    next: "Next",
    eggs: {
      apr20: ["🎉", "Happy 4/20!", "Today is the high holiday – worldwide."],
      apr1: ["🥳", "Bubatz is legal!", "In Germany since April 1, 2024 – no April Fools' joke."],
      morning: ["☀️", "Wake and bake", "Good morning, sunshine."],
      days: [
        ["😌", "Sundaze", "Nothing to do, all day long."],
        ["🍕", "Munchie Monday", "The fridge is calling."],
        ["🍋", "Terpsday", "Take a sniff – it's all about the terpenes."],
        ["🍯", "Wax Wednesday", "Sticky middle of the week."],
        ["✨", "Trichome Thursday", "Almost weekend, glittering already."],
        ["🙌", "Highday am Friday", "Bring on the weekend."],
        ["🌞", "Sativa Saturday", "Up and about."],
      ],
    },
  },
  de: {
    tagline: "Irgendwo ist immer 4:20.",
    settings: "Einstellungen",
    litIn: "Genau jetzt 4:20 in",
    justIn: "Gerade 4:20 gewesen in",
    rightNow: "genau jetzt! 🔥",
    since: (t) => `seit ${t}`,
    howFar: "Wie weit?",
    away: (km) => `≈ ${km} km entfernt`,
    youAreThere: "Du bist direkt da 🌿",
    locating: "Suche Standort…",
    noLocation: "Standort nicht verfügbar",
    nextSesh: "Nächste Sesh",
    yourTime: "Deine Zeit",
    yourLit: "<b>Bei dir ist 4:20!</b> 🔥",
    yourIn: (t) => `Dein 4:20 in <b>${t}</b>`,
    upNext: "Als Nächstes",
    upNextHint: "Wann es dort 4:20 ist – in deiner Ortszeit.",
    install: "Zum Startbildschirm hinzufügen",
    responsibly: "Bitte verantwortungsvoll genießen – und nur, wo es legal ist 🌿",
    language: "Sprache",
    clock: "Uhrzeit",
    langAuto: "Automatisch (Browser)",
    close: "Schließen",
    more: (n) => `+${n} weitere`,
    and: "und",
    strainsTitle: "Strains aus der Gegend",
    strainsHint: "Landrassen und Klassiker aus dieser Zeitzone – eine kleine Auswahl.",
    strainsNone: (wait) => `Aus dieser Zeitzone ist nichts überliefert – diese sind als Nächstes dran, in ${wait}:`,
    landrace: "Landrasse",
    classic: "Klassiker",
    sativa: "Sativa",
    indica: "Indica",
    hybrid: "Hybrid",
    ruderalis: "Ruderalis",
    pageOf: (i, n) => `${i} von ${n}`,
    prev: "Zurück",
    next: "Weiter",
    eggs: {
      apr20: ["🎉", "Frohen 4/20!", "Heute ist weltweiter Kiffer-Feiertag."],
      apr1: ["🥳", "Bubatz ist legal!", "Seit dem 1. April 2024 in Deutschland – kein Aprilscherz."],
      morning: ["☀️", "Wake and bake", "Guten Morgen, Sonnenschein."],
      days: [
        ["😌", "Sundaze", "Den ganzen Tag nichts vor."],
        ["🍕", "Munchie Monday", "Der Kühlschrank ruft."],
        ["🍋", "Terpsday", "Riech mal rein – auf die Terpene kommt's an."],
        ["🍯", "Wax Wednesday", "Klebrige Wochenmitte."],
        ["✨", "Trichome Thursday", "Fast Wochenende, glitzert schon."],
        ["🙌", "Highday am Friday", "Das Wochenende kann kommen."],
        ["🌞", "Sativa Saturday", "Hellwach und unterwegs."],
      ],
    },
  },
};

let lang = "en";
let t = TEXT.en;
let regionNames;
let clockFmt;

function applySettings() {
  lang = settings.lang === "auto"
    ? (navigator.language || "en").toLowerCase().startsWith("de") ? "de" : "en"
    : settings.lang;
  t = TEXT[lang];
  document.documentElement.lang = lang;
  regionNames = new Intl.DisplayNames([lang], { type: "region" });
  const hour12 = settings.clock === "auto" ? undefined : settings.clock === "12";
  clockFmt = new Intl.DateTimeFormat(lang, { hour: "2-digit", minute: "2-digit", hour12 });

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = t[el.dataset.i18n];
    if (typeof v === "string") el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t[el.dataset.i18nAria]);
  });
  lastTimelineKey = "";
  lastStrainKey = "";
  lastHeroCity = null;
  lastEggKey = "";
  distanceText.textContent = t.howFar;
  if (userPos) showDistance();
}

// ---------- time helpers ----------

const formatterCache = new Map();
function secondsOfDay(tz, date) {
  let f = formatterCache.get(tz);
  if (!f) {
    f = new Intl.DateTimeFormat("en-US", {
      timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
    });
    formatterCache.set(tz, f);
  }
  const p = {};
  for (const { type, value } of f.formatToParts(date)) p[type] = Number(value);
  return (p.hour % 24) * 3600 + p.minute * 60 + p.second;
}

function fmtWait(sec) {
  if (sec < 120) {
    const m = Math.floor(sec / 60);
    return `${m}:${String(sec % 60).padStart(2, "0")}`;
  }
  const mins = Math.ceil(sec / 60);
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

function fmtSince(sec) {
  const mins = Math.floor(sec / 60);
  if (mins < 60) return `${mins} min`;
  return `${Math.floor(mins / 60)} h ${mins % 60} min`;
}

// ---------- data ----------

const cities = CITIES.map(([en, de, cc, tz, lat, lon]) => ({ en, de, cc, tz, lat, lon }));
const cityName = (c) => (lang === "de" && c.de) || c.en;
const countryName = (c) => regionNames.of(c.cc.toUpperCase());

function computeState(date) {
  const bySince = new Map();
  for (const c of cities) {
    const since = (secondsOfDay(c.tz, date) - TARGET_SEC + DAY) % DAY;
    if (!bySince.has(since)) bySince.set(since, []);
    bySince.get(since).push(c);
  }
  const groups = [...bySince].map(([since, list]) => ({ since, until: since === 0 ? 0 : DAY - since, cities: list }));
  groups.sort((a, b) => a.since - b.since);
  const current = groups[0];
  const rest = groups.slice(1).sort((a, b) => a.until - b.until);
  return { current, next: rest[0], upcoming: rest, lit: current.since < 60 };
}

// ---------- DOM ----------

const $ = (id) => document.getElementById(id);
const heroEl = document.querySelector(".hero");
const heroEyebrow = $("hero-eyebrow");
const heroFlag = $("hero-flag");
const heroCity = $("hero-city");
const heroCountry = $("hero-country");
const heroAlso = $("hero-also");
const sinceText = $("since-text");
const distanceBtn = $("distance-btn");
const distanceText = $("distance-text");
const nextFlag = $("next-flag");
const nextCity = $("next-city");
const nextIn = $("next-in");
const progress = $("progress");
const progressFill = $("progress-fill");
const youClock = $("you-clock");
const youNext = $("you-next");
const timelineEl = $("timeline");
const eggEl = $("egg");
const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

let lastHeroCity = null;
let lastTimelineKey = "";
let lastStrainKey = "";
let lastEggKey = "";
const strainList = $("strain-list");
const strainsHint = $("strains-hint");
let userPos = null;
let state = null;

function setSrc(img, src) {
  if (img.getAttribute("src") !== src) img.setAttribute("src", src);
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function listNames(list, max) {
  const names = list.map(cityName);
  if (names.length <= max) return names;
  return [...names.slice(0, max), t.more(names.length - max)];
}

function render(date) {
  const { current, next, upcoming, lit } = state;
  const hero = current.cities[0];

  // Hero
  heroEl.classList.toggle("lit", lit);
  heroEyebrow.textContent = lit ? t.litIn : t.justIn;
  sinceText.textContent = lit ? t.rightNow : t.since(fmtSince(current.since));
  if (lastHeroCity !== hero) {
    lastHeroCity = hero;
    setSrc(heroFlag, FLAG_URL(hero.cc));
    heroFlag.alt = countryName(hero);
    heroCity.textContent = cityName(hero);
    heroCountry.textContent = countryName(hero);
    const others = listNames(current.cities.slice(1), 3);
    heroAlso.textContent = others.length ? `+ ${others.join(", ")}` : "";
    if (userPos) showDistance();
  }

  // Next
  const nextHead = next.cities[0];
  setSrc(nextFlag, FLAG_URL(nextHead.cc));
  nextFlag.alt = countryName(nextHead);
  nextCity.textContent = cityName(nextHead);
  nextIn.textContent = fmtWait(next.until);
  const pct = Math.min(100, (current.since / (current.since + next.until)) * 100);
  progressFill.style.width = `${pct.toFixed(1)}%`;
  progress.setAttribute("aria-valuenow", Math.round(pct));

  // You
  youClock.textContent = clockFmt.format(date);
  const mySince = (secondsOfDay(userTz, date) - TARGET_SEC + DAY) % DAY;
  youNext.innerHTML = mySince < 60 ? t.yourLit : t.yourIn(fmtWait(DAY - mySince));

  // Timeline (rebuilt only when it changes)
  const rows = upcoming.map((g) => ({
    time: clockFmt.format(new Date(date.getTime() + g.until * 1000)),
    cities: g.cities,
  }));
  const key = lang + rows.map((r) => r.time + r.cities[0].en).join("|");
  if (key !== lastTimelineKey) {
    lastTimelineKey = key;
    timelineEl.innerHTML = rows.map((r) => {
      const shown = r.cities.slice(0, 4).map((c) =>
        `<span class="place"><img class="flag" src="${FLAG_URL(c.cc)}" alt="" loading="lazy">${escapeHtml(cityName(c))}</span>`
      );
      if (r.cities.length > 4) shown.push(`<span class="place">${escapeHtml(t.more(r.cities.length - 4))}</span>`);
      return `<li><span class="time-pill">${r.time}</span><span class="places">${shown.join("")}</span></li>`;
    }).join("");
  }

  renderStrains(date, current);
  renderEgg(date);

  document.title = lit
    ? `🔥 4:20 in ${cityName(hero)} – 4:20 Now`
    : `${cityName(nextHead)} ${fmtWait(next.until)} – 4:20 Now`;
}

// ---------- easter eggs (by the user's local date and time) ----------

function pickEgg(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  if (month === 4 && day === 20) return ["apr20", t.eggs.apr20];
  if (month === 4 && day === 1) return ["apr1", t.eggs.apr1];
  if (hour >= 5 && hour < 11) return ["morning", t.eggs.morning];
  return ["day" + date.getDay(), t.eggs.days[date.getDay()]];
}

function renderEgg(date) {
  const [id, [emoji, title, sub]] = pickEgg(date);
  if (lang + id === lastEggKey) return;
  lastEggKey = lang + id;
  eggEl.className = `egg egg-${id.startsWith("day") ? "day" : id}`;
  eggEl.innerHTML = `<span class="egg-emoji" aria-hidden="true">${emoji}</span>` +
    `<span><b>${escapeHtml(title)}</b> <span class="egg-sub">${escapeHtml(sub)}</span></span>`;
}

// ---------- leaf sea (hero background) ----------

const leafSea = $("leaf-sea");
const SVG_NS = "http://www.w3.org/2000/svg";

function buildLeafSea() {
  const { width: W, height: H } = leafSea.getBoundingClientRect();
  if (!W || !H) return;
  // Deterministic randomness so the layout doesn't jump on rebuild.
  let seed = 420;
  const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

  const back = [150, 208, 120];   // light green, far away
  const front = [36, 92, 44];     // dark green, close up
  const mix = (t) => `rgb(${back.map((b, i) => Math.round(b + (front[i] - b) * t)).join(",")})`;

  const ROWS = 6;
  let out = `<defs><path id="lf" d="${LEAF_PATH}"/></defs>`;
  for (let r = 0; r < ROWS; r++) {
    const t = r / (ROWS - 1);
    const size = 44 + t * 50;                       // leaf height in px
    const baseY = 52 + t * (H - 40) + size * 0.25;  // where the stems sit
    const step = size * (0.36 + t * 0.12);         // denser at the back
    const scale = size / 100;
    const dur = (5 + rand() * 1.5).toFixed(2);
    for (let x = -size * 0.5 + rand() * step; x < W + size * 0.5; x += step * (0.8 + rand() * 0.4)) {
      const rot = (rand() * 56 - 28).toFixed(1);
      const y = (baseY + rand() * size * 0.18).toFixed(1);
      const delay = (-(x / W) * 2.5 - r * 0.7 - rand()).toFixed(2); // ripple from left to right
      const shade = Math.min(1, Math.max(0, t + (rand() - 0.5) * 0.18));
      out +=
        `<g transform="translate(${x.toFixed(1)} ${y}) rotate(${rot})">` +
        `<g class="sway" style="animation-duration:${dur}s;animation-delay:${delay}s">` +
        `<use href="#lf" fill="${mix(shade)}" transform="scale(${scale.toFixed(3)}) translate(-50 -96)"/>` +
        `</g></g>`;
    }
  }
  leafSea.setAttribute("viewBox", `0 0 ${W.toFixed(0)} ${H.toFixed(0)}`);
  leafSea.innerHTML = out;
}

let seaSize = "";
new ResizeObserver(([entry]) => {
  const size = `${Math.round(entry.contentRect.width)}x${Math.round(entry.contentRect.height)}`;
  if (size !== seaSize) { seaSize = size; buildLeafSea(); }
}).observe(leafSea);

// ---------- strains ----------

// Strains from the current time zone; if there are none, the next zone that has some.
function pickStrains(date, current) {
  const withSince = STRAINS.map((s) => ({ s, since: (secondsOfDay(s.tz, date) - TARGET_SEC + DAY) % DAY }));
  const here = withSince.filter((x) => x.since === current.since).map((x) => x.s);
  if (here.length) return { list: here, wait: 0 };
  const until = (x) => (x.since === 0 ? 0 : DAY - x.since);
  const soonest = Math.min(...withSince.map(until));
  return { list: withSince.filter((x) => until(x) === soonest).map((x) => x.s), wait: soonest };
}

function strainCard(s) {
  const q = encodeURIComponent(s.name);
  const links = [];
  if (s.wiki) links.push(`<a href="${s.wiki}" target="_blank" rel="noopener">Wikipedia ↗</a>`);
  links.push(`<a href="https://www.leafly.com/search?q=${q}&searchCategory=strain" target="_blank" rel="noopener">Leafly ↗</a>`);
  return `<article class="strain">
    <div class="strain-icon ${s.type}"><img src="leaf.svg" alt=""></div>
    <div>
      <p class="strain-origin"><img class="flag" src="${FLAG_URL(s.cc)}" alt="">${escapeHtml(s.region[lang])}</p>
      <h4>${escapeHtml(s.name)}</h4>
      <div class="tags"><span class="tag">${t[s.kind]}</span><span class="tag">${t[s.type]}</span></div>
      <p class="desc">${escapeHtml(s.text[lang])}</p>
      <div class="strain-links">${links.join("")}</div>
    </div>
  </article>`;
}

function renderStrains(date, current) {
  const { list, wait } = pickStrains(date, current);
  strainsHint.textContent = wait ? t.strainsNone(fmtWait(wait)) : t.strainsHint;
  const key = lang + list.map((s) => s.name).join("|");
  if (key === lastStrainKey) return;
  lastStrainKey = key;
  const keepPage = list.map((s) => s.name).join("|") === lastStrainNames ? currentPage() : 0;
  lastStrainNames = list.map((s) => s.name).join("|");
  strainList.innerHTML = list.map(strainCard).join("");
  goTo(keepPage, false);
}
let lastStrainNames = "";

// ---------- strain carousel ----------

const carouselNav = $("carousel-nav");
const prevBtn = $("strain-prev");
const nextBtn = $("strain-next");
const countEl = $("strain-count");

const pageWidth = () => strainList.clientWidth + parseFloat(getComputedStyle(strainList).columnGap || 0);
const pageCount = () => strainList.children.length;
const pageFromScroll = () => Math.round(strainList.scrollLeft / pageWidth());

// The page we are on or animating towards (scrollLeft lags behind during smooth scrolling).
let page = 0;
let programmatic = false;
let settleTimer = 0;
const currentPage = () => page;

function updateCarousel() {
  const n = pageCount();
  page = Math.max(0, Math.min(page, n - 1));
  carouselNav.hidden = n < 2;
  countEl.textContent = t.pageOf(page + 1, n);
  prevBtn.disabled = page <= 0;
  nextBtn.disabled = page >= n - 1;
}

function goTo(target, smooth = true) {
  page = Math.max(0, Math.min(pageCount() - 1, target));
  programmatic = true;
  strainList.scrollTo({ left: page * pageWidth(), behavior: smooth ? "smooth" : "auto" });
  updateCarousel();
}

prevBtn.addEventListener("click", () => goTo(page - 1));
nextBtn.addEventListener("click", () => goTo(page + 1));

// Swiping / trackpad: follow the scroll position once it settles.
strainList.addEventListener("scroll", () => {
  clearTimeout(settleTimer);
  settleTimer = setTimeout(() => {
    if (!programmatic || pageFromScroll() === page) {
      programmatic = false;
      page = pageFromScroll();
      updateCarousel();
    }
  }, 120);
}, { passive: true });

strainList.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") { e.preventDefault(); goTo(page - 1); }
  if (e.key === "ArrowRight") { e.preventDefault(); goTo(page + 1); }
});
window.addEventListener("resize", () => goTo(page, false));

// Mouse drag on desktop (touch already swipes natively).
let drag = null;
strainList.addEventListener("pointerdown", (e) => {
  if (e.pointerType !== "mouse" || e.button !== 0 || e.target.closest("a")) return;
  drag = { x: e.clientX, left: strainList.scrollLeft, moved: false };
  strainList.style.scrollSnapType = "none";
  strainList.style.scrollBehavior = "auto";
  strainList.setPointerCapture(e.pointerId);
});
strainList.addEventListener("pointermove", (e) => {
  if (!drag) return;
  const dx = e.clientX - drag.x;
  if (Math.abs(dx) > 3) drag.moved = true;
  strainList.scrollLeft = drag.left - dx;
});
const endDrag = (e) => {
  if (!drag) return;
  const dx = e.clientX - drag.x;
  drag = null;
  strainList.style.scrollSnapType = "";
  strainList.style.scrollBehavior = "";
  const threshold = pageWidth() * 0.15;
  goTo(dx < -threshold ? page + 1 : dx > threshold ? page - 1 : page);
};
strainList.addEventListener("pointerup", endDrag);
strainList.addEventListener("pointercancel", endDrag);

// ---------- distance ----------

function haversineKm(a, b) {
  const R = 6371;
  const rad = (d) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function showDistance() {
  const km = haversineKm(userPos, state.current.cities[0]);
  distanceText.textContent = km < 25 ? t.youAreThere : t.away(Math.round(km).toLocaleString(lang));
}

distanceBtn.addEventListener("click", () => {
  if (userPos) return showDistance();
  if (!navigator.geolocation) { distanceText.textContent = t.noLocation; return; }
  distanceText.textContent = t.locating;
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userPos = { lat: pos.coords.latitude, lon: pos.coords.longitude };
      showDistance();
    },
    () => { distanceText.textContent = t.noLocation; },
    { maximumAge: 600000, timeout: 10000 }
  );
});

// ---------- settings dialog ----------

const dialog = $("settings");
$("settings-btn").addEventListener("click", () => {
  dialog.querySelector(`input[name=lang][value="${settings.lang}"]`).checked = true;
  dialog.querySelector(`input[name=clock][value="${settings.clock}"]`).checked = true;
  dialog.showModal();
});
dialog.addEventListener("change", (e) => {
  const { name, value } = e.target;
  if (!(name in settings)) return;
  settings[name] = value;
  localStorage.setItem(name, value);
  applySettings();
  render(now());
});
dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });

// ---------- install (PWA) ----------

let installEvent = null;
const installBtn = $("install-btn");
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  installEvent = e;
  installBtn.hidden = false;
});
installBtn.addEventListener("click", async () => {
  if (!installEvent) return;
  installEvent.prompt();
  await installEvent.userChoice;
  installEvent = null;
  installBtn.hidden = true;
});

// ---------- loop ----------

function tick() {
  const date = now();
  state = computeState(date);
  render(date);
}

applySettings();
tick();
setTimeout(() => {
  tick();
  setInterval(tick, 1000);
}, 1000 - (now().getTime() % 1000));
