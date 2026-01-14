let is24Hour = false;
let currentIanaTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
let currentLocationLabel = "Your Local Time";
let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];

const timeEl = document.getElementById("timeValue");
const dateEl = document.getElementById("dateValue");
const locationEl = document.getElementById("locationName");
const formatBtn = document.getElementById("formatToggle");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const recentList = document.getElementById("recentList");

function updateClock() {
    const now = new Date();

    const timeFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: currentIanaTimeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: !is24Hour
    });

    const dateFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: currentIanaTimeZone,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    timeEl.textContent = timeFormatter.format(now);
    dateEl.textContent = dateFormatter.format(now);
    locationEl.textContent = currentLocationLabel;
}

async function searchLocation() {
    const query = cityInput.value.trim();
    if (!query) return;

    searchBtn.disabled = true;
    searchBtn.textContent = "Searching...";

    try {
        const res = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1`
        );
        const data = await res.json();

        if (!data.results || !data.results.length) {
            alert("Location not found");
        } else {
            const r = data.results[0];
            currentIanaTimeZone = r.timezone;
            currentLocationLabel = `${r.name}, ${r.country}`;
            saveRecent(currentLocationLabel, currentIanaTimeZone);
            updateClock();
            cityInput.value = "";
        }
    } catch {
        alert("Network error");
    }

    searchBtn.disabled = false;
    searchBtn.textContent = "Search Time";
}

function saveRecent(label, tz) {
    recentSearches = recentSearches.filter(i => i.label !== label);
    recentSearches.unshift({ label, tz });
    recentSearches = recentSearches.slice(0, 6);
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    renderRecent();
}

function renderRecent() {
    recentList.innerHTML = "";
    recentSearches.forEach(item => {
        const card = document.createElement("div");
        card.className = "recent-card";
        card.innerHTML = `<strong>${item.label}</strong><span>${item.tz}</span>`;
        card.onclick = () => {
            currentIanaTimeZone = item.tz;
            currentLocationLabel = item.label;
            updateClock();
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
        recentList.appendChild(card);
    });
}

formatBtn.onclick = () => {
    is24Hour = !is24Hour;
    formatBtn.textContent = is24Hour ? "Switch to 12h" : "Switch to 24h";
    updateClock();
};

searchBtn.onclick = searchLocation;
cityInput.onkeypress = e => e.key === "Enter" && searchLocation();

renderRecent();
updateClock();
setInterval(updateClock, 1000);