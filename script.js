// === Elemente principale pentru media player ===
const display = document.getElementById('mediaDisplay');
const items = document.querySelectorAll('.carousel-item');
const fullscreenBtn = document.getElementById('fullscreenBtn');
let currentIndex = 0;

// Creează săgețile doar dacă există display
if (display && display.parentElement) {
  const leftArrow = document.createElement('div');
  leftArrow.className = 'arrow left-arrow';
  leftArrow.innerHTML = '&#10094;';
  display.parentElement.appendChild(leftArrow);

  const rightArrow = document.createElement('div');
  rightArrow.className = 'arrow right-arrow';
  rightArrow.innerHTML = '&#10095;';
  display.parentElement.appendChild(rightArrow);

  leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    loadMedia(currentIndex, 'left');
  });

  rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    loadMedia(currentIndex, 'right');
  });
}

// Încarcă media în funcție de index
function loadMedia(index, direction = 'right') {
  const item = items[index];
  if (!item || !display) return;

  const type = item.dataset.type;
  const src = item.dataset.src;
  currentIndex = index;
  display.innerHTML = '';

  let element;
  switch (type) {
    case 'image':
      element = document.createElement('img');
      element.src = src;
      element.alt = 'Imagine';
      element.onerror = () => { element.alt = 'Imagine negăsită'; };
      break;

    case 'video':
      element = document.createElement('video');
      element.src = src;
      element.controls = true;
      element.autoplay = true;
      break;

    case 'youtube':
      element = document.createElement('iframe');
      element.src = src + '?autoplay=1';
      element.frameBorder = '0';
      element.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      element.allowFullscreen = true;
      break;
  }

  if (element) display.appendChild(element);
}

// Inițializează media player la load
window.addEventListener('load', () => {
  const loading = document.getElementById('loading-screen');
  if (loading) {
    setTimeout(() => {
      loading.style.opacity = '0';
      setTimeout(() => {
        loading.style.display = 'none';
      }, 1800); // sincron cu CSS transition
    }, 5700); // timp total de animație
  }
});

// Evenimente pentru carousel media
items.forEach((item, index) => {
  item.addEventListener('click', () => loadMedia(index));
});

// === Slider orizontal pentru carduri tip blog ===
const slider = document.getElementById('cardSlider');
const leftBtn = document.getElementById('sliderLeft');
const rightBtn = document.getElementById('sliderRight');

if (slider && leftBtn && rightBtn) {
  leftBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -320, behavior: 'smooth' });
  });

  rightBtn.addEventListener('click', () => {
    slider.scrollBy({ left: 320, behavior: 'smooth' });
  });
}

// === Sticky Navbar cu efect blur la scroll ===
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar"); // folosește .navbar, nu #navbar
  if (!navbar) return;

  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
