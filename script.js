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
      { name: 'Sonarr', url: 'https://sonarr.giconmedia.win' },
      { name: 'Sab', url: 'https://sab.giconmedia.win' },
      { name: 'Fileshare', url: 'https://fileshare.giconmedia.win/' },
      { name: 'AudioBooks', url: 'https://audiobooks.giconmedia.win' }
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

const nav = document.getElementById('nav');
const frame = document.getElementById('frame');
const link = document.getElementById('link');
const STORAGE_KEY = 'localDashboard_lastService';

function renderNav() {
  let html = '';
  categories.forEach((cat, catIndex) => {
    const collapsedClass = cat.collapsed ? 'collapsed' : '';
    html += `<div class="category ${collapsedClass}" data-cat="${catIndex}">
      <div class="category-header">${cat.name}</div>
      <div class="category-items">`;
    cat.items.forEach((item, itemIndex) => {
      const globalIndex = `${catIndex}-${itemIndex}`;
      html += `<div class="nav-item" data-index="${globalIndex}">${item.name}</div>`;
    });
    html += '</div></div>';
  });
  nav.innerHTML = html;

  document.querySelectorAll('.category-header').forEach(header => {
    header.addEventListener('click', () => {
      header.parentElement.classList.toggle('collapsed');
    });
  });

  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => selectService(item.dataset.index));
  });
}

function selectService(index) {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.index === index);
  });
  const [catIndex, itemIndex] = index.split('-');
  const item = categories[catIndex].items[itemIndex];
  frame.src = item.url;
  link.href = item.url;
  link.textContent = item.url;
  localStorage.setItem(STORAGE_KEY, index);
}

function init() {
  renderNav();
  const saved = localStorage.getItem(STORAGE_KEY);
  const index = (saved && saved.includes('-')) ? saved : '0-0';
  selectService(index);
}

init();
