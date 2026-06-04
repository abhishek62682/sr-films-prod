import { categories, expertise } from "./config.js";

let active = 'all';

// Read category from URL
const urlParams = new URLSearchParams(window.location.search);
const urlCategory = urlParams.get('category');
if (urlCategory && categories[urlCategory]) {
  active = urlCategory;
}

// Lightbox state
let currentImages = [];
let currentIndex = 0;

function openLightbox(images, index) {
  currentImages = images;
  currentIndex = index;
  updateLightboxImage();
  document.getElementById('lightbox').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
  document.body.style.overflow = '';
}

function updateLightboxImage() {
  const img = document.getElementById('lightbox-img');
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = currentImages[currentIndex];
    img.style.opacity = '1';
  }, 150);
  document.getElementById('lightbox-counter').textContent = `${currentIndex + 1} / ${currentImages.length}`;
}

function prevImage() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateLightboxImage();
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateLightboxImage();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (lb.classList.contains('hidden')) return;
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'Escape') closeLightbox();
});

function createLightbox() {
  if (document.getElementById('lightbox')) return;
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.className = 'hidden fixed inset-0 z-[999] bg-black/95 flex items-center justify-center';
  lb.innerHTML = `
    <!-- Close -->
    <button id="lb-close"
      class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
    >
      <i class="ri-close-line text-white text-xl"></i>
    </button>

    <!-- Counter -->
    <span id="lightbox-counter" class="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 font-secondary text-sm"></span>

    <!-- Prev -->
    <button id="lb-prev"
      class="absolute left-3 sm:left-6 z-10 w-11 h-11 rounded-full bg-black/60 sm:bg-white/10 hover:bg-black/80 sm:hover:bg-white/25 flex items-center justify-center transition-colors"
    >
      <i class="ri-arrow-left-s-line text-white text-2xl"></i>
    </button>

    <!-- Image -->
    <img id="lightbox-img" src="" alt=""
      class="max-w-[90vw] max-h-[88vh] object-contain rounded-xl transition-opacity duration-150"
      style="opacity:1"
    />

    <!-- Next -->
    <button id="lb-next"
      class="absolute right-3 sm:right-6 z-10 w-11 h-11 rounded-full bg-black/60 sm:bg-white/10 hover:bg-black/80 sm:hover:bg-white/25 flex items-center justify-center transition-colors"
    >
      <i class="ri-arrow-right-s-line text-white text-2xl"></i>
    </button>
  `;
  document.body.appendChild(lb);

  document.getElementById('lb-close').addEventListener('click', closeLightbox);
  document.getElementById('lb-prev').addEventListener('click', prevImage);
  document.getElementById('lb-next').addEventListener('click', nextImage);

  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });
}

function navigate(id) {
  active = id;
  render(id);
}

function renderChips(activeId) {
  const nav = document.getElementById('chipNav');

  const allTabs = [
    { id: 'all', label: 'All' },
    ...expertise
  ];

  nav.innerHTML = allTabs.map(({ id, label }) => {
    const isActive = id === activeId;
    return `
      <button
        onclick="navigate('${id}')"
        class="relative shrink-0 px-4 py-2 text-[11px] font-medium font-secondary
               tracking-wide transition-all duration-300 cursor-pointer rounded-full
               outline-none border
               ${isActive
                 ? 'bg-gray-900 text-white border-gray-900'
                 : 'bg-transparent text-gray-600 border-gray-300 hover:text-gray-900 hover:border-gray-600'
               }"
      >
        ${label}
      </button>
    `;
  }).join('');
}

function showLoader() {
  const grid = document.getElementById('cardGrid');
  const wrapper = grid.parentElement;

  const old = document.getElementById('gridLoader');
  if (old) old.remove();

  const loader = document.createElement('div');
  loader.id = 'gridLoader';
  loader.className = 'flex flex-col items-center justify-center py-24 gap-3 w-full';
  loader.innerHTML = `
    <div class="w-10 h-10 rounded-full border-2 border-[#efe7da] border-t-[#a88b6a] animate-spin"></div>
    <p class="text-[13px] font-medium text-[#a88b6a] font-secondary">Loading Beautiful Moments</p>
  `;

  grid.style.display = 'none';
  wrapper.appendChild(loader);
}

function renderCards(id) {
  showLoader();

  setTimeout(() => {
    const grid = document.getElementById('cardGrid');
    const loader = document.getElementById('gridLoader');
    if (loader) loader.remove();
    grid.style.display = '';

    const images = id === 'all'
      ? Object.values(categories).flatMap(c => c.cards.map(card => card.image))
      : categories[id].cards.map(c => c.image);

    grid.innerHTML = images.map((image, index) => `
      <li class="break-inside-avoid mb-4 sm:mb-5">
        <div class="group cursor-pointer relative" onclick="window._openLightbox(${index})">
          <div class="relative overflow-hidden rounded-2xl bg-gray-100">
            <img
              class="w-full h-auto block object-cover
                     group-hover:scale-105 transition-transform duration-500 ease-out"
              src="${image}"
              alt="Photography image ${index + 1}"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/40
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
            </div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <i class="ri-zoom-in-line text-white text-lg"></i>
              </div>
            </div>
          </div>
        </div>
      </li>
    `).join('');

    window._openLightbox = (index) => openLightbox(images, index);
  }, 600);
}

function render(id) {
  const title = id === 'all'
    ? 'All Photography'
    : categories[id]?.title ?? 'Gallery';

  if (document.getElementById('breadcrumbCategory')) {
    document.getElementById('breadcrumbCategory').textContent = title;
  }
  if (document.getElementById('pageTitle')) {
    document.getElementById('pageTitle').textContent = title;
  }

  document.title = `${title} | SR Film Photography`;

  renderChips(id);
  renderCards(id);
}

window.navigate = navigate;

createLightbox();
render(active);