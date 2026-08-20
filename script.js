const categories = [
  {
    name: 'Home',
    items: [
      { name: 'Cameras', url: 'https://cameras.giconmedia.win' },
      { name: 'Tacoma', url: 'https://home.giconmedia.win/tacoma' }
    ]
  },
  {
    name: 'Media',
    items: [
      { name: 'Movie/TV Requests', url: 'https://requests.giconmedia.win' },
      { name: 'Radarr', url: 'https://home.giconmedia.win/radarr/' },
      { name: 'Sonarr', url: 'https://home.giconmedia.win/sonarr/' },
      { name: 'Sab', url: 'https://home.giconmedia.win/sabnzbd/' },
      { name: 'Fileshare', url: 'https://fileshare.giconmedia.win/' },
      { name: 'AudioBooks', url: 'https://audiobooks.giconmedia.win' },
      { name: 'Calendar', url: 'https://calendar.giconmedia.win/calendrier' }
    ]
  },
  {
    name: 'Admin',
    collapsed: true,
    items: [
      { name: 'Dashboard', url: 'https://dashboard.giconmedia.win' },
      { name: 'Server1', url: 'https://server.giconmedia.win' }
    ]
  }
];

const sheet = document.getElementById('sheet');
const backdrop = document.getElementById('backdrop');
const nav = document.getElementById('nav');
const frame = document.getElementById('frame');
const title = document.getElementById('title');
const openBtn = document.getElementById('open-btn');
const link = document.getElementById('link');
const placeholder = document.getElementById('placeholder');
const STORAGE_KEY = 'localDashboard_lastService';

function renderNav() {
  let html = '';
  categories.forEach((cat, catIndex) => {
    html += `<div class="category">
      <div class="category-header">${cat.name}</div>
      <div class="category-items">`;
    cat.items.forEach((item, itemIndex) => {
      const globalIndex = `${catIndex}-${itemIndex}`;
      html += `<button class="tile" data-index="${globalIndex}">${item.name}</button>`;
    });
    html += '</div></div>';
  });
  nav.innerHTML = html;

  document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', () => {
      selectService(tile.dataset.index);
      closeSheet();
    });
  });
}

function selectService(index) {
  const [catIndex, itemIndex] = index.split('-').map(Number);
  const item = categories[catIndex].items[itemIndex];
  frame.src = item.url;
  link.href = item.url;
  title.textContent = item.name;
  placeholder.classList.remove('show');
  document.querySelectorAll('.tile').forEach(t => {
    t.classList.toggle('active', t.dataset.index === index);
  });
  localStorage.setItem(STORAGE_KEY, index);
}

function openSheet() {
  sheet.classList.add('open');
  backdrop.classList.add('show');
}

function closeSheet() {
  sheet.classList.remove('open');
  backdrop.classList.remove('show');
}

function showPlaceholder() {
  placeholder.classList.add('show');
  frame.removeAttribute('src');
  title.textContent = 'Services';
  link.removeAttribute('href');
}

function init() {
  renderNav();
  openBtn.addEventListener('click', openSheet);
  backdrop.addEventListener('click', closeSheet);
  placeholder.addEventListener('click', openSheet);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });

  const saved = localStorage.getItem(STORAGE_KEY);
  const hasValidSaved = saved && saved.includes('-') &&
    (() => {
      const [c, i] = saved.split('-').map(Number);
      return categories[c] && categories[c].items[i];
    })();
  if (hasValidSaved) selectService(saved);
  else showPlaceholder();
}

init();