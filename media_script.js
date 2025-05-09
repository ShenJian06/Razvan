// Elemente principale
const display = document.getElementById('mediaDisplay');
const background = document.getElementById('mediaBackground');
const items = document.querySelectorAll('.carousel-item');
const infoBox = document.createElement('div');
infoBox.className = 'media-info-box';
display.parentElement.appendChild(infoBox);

let currentIndex = 0;

// Creează săgețile
const leftArrow = document.createElement('div');
leftArrow.className = 'arrow left-arrow';
leftArrow.innerHTML = '&#10094;';
display.parentElement.appendChild(leftArrow);

const rightArrow = document.createElement('div');
rightArrow.className = 'arrow right-arrow';
rightArrow.innerHTML = '&#10095;';
display.parentElement.appendChild(rightArrow);

// Încarcă media selectată
function loadMedia(index, direction = 'right') {
  const item = items[index];
  if (!item) return;

  const type = item.dataset.type;
  const src = item.dataset.src;
  const title = item.querySelector('h3')?.textContent || '';
  const description = item.querySelector('p')?.textContent || '';

  currentIndex = index;
  display.innerHTML = '';

  // Ascunde logo-ul cinematic dacă există
  const initialLogo = document.querySelector('.initial-cinematic-logo');
  if (initialLogo) {
    initialLogo.style.display = 'none';
  }

  const wrapper = document.createElement('div');
  wrapper.classList.add('media-wrapper');
  wrapper.classList.add(direction === 'left' ? 'enter-left' : 'enter-right');

  let element;

  if (type === 'image') {
    element = document.createElement('img');
    element.src = src;
    element.alt = 'Imagine';
    element.onerror = () => {
      element.alt = 'Imagine negăsită';
    };
    background.style.backgroundImage = `url(${src})`;
  } else if (type === 'video') {
    element = document.createElement('video');
    element.src = src;
    element.controls = true;
    element.autoplay = true;
    element.style.width = '100%';
    element.style.height = '100%';
    background.style.backgroundImage = '';
  } else if (type === 'youtube') {
    element = document.createElement('iframe');
    element.src = `${src}?autoplay=1&mute=1&rel=0`;
    element.setAttribute('allowfullscreen', '');
    element.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    element.style.width = '80%';
    element.style.height = '80%';
    element.style.border = 'none';
    element.style.objectFit = 'cover';
    background.style.backgroundImage = '';
  }

  wrapper.appendChild(element);
  display.appendChild(wrapper);
  infoBox.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
}

// Inițializează evenimentele pe iteme
items.forEach((item, index) => {
  item.addEventListener('click', () => {
    const direction = index > currentIndex ? 'right' : 'left';
    loadMedia(index, direction);
  });
});

// Meniu sticky pe mișcarea mouse-ului
window.addEventListener('mousemove', (e) => {
  const header = document.getElementById('stickyHeader');
  header.style.top = e.clientY < 50 ? '0' : '-100px';
});

// Navigare cu tastele săgeți
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    const next = (currentIndex + 1) % items.length;
    loadMedia(next, 'right');
  } else if (e.key === 'ArrowLeft') {
    const prev = (currentIndex - 1 + items.length) % items.length;
    loadMedia(prev, 'left');
  }
});

// Navigare cu click pe săgeți
leftArrow.addEventListener('click', () => {
  const prev = (currentIndex - 1 + items.length) % items.length;
  loadMedia(prev, 'left');
});

rightArrow.addEventListener('click', () => {
  const next = (currentIndex + 1) % items.length;
  loadMedia(next, 'right');
});

// Scroll orizontal în carusel cu rotița mouse-ului
const carousel = document.querySelector('.media-carousel');
carousel.addEventListener('wheel', (e) => {
  e.preventDefault();
  carousel.scrollLeft += e.deltaY;
});
