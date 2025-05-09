const scrollArea = document.querySelector('.card-slider');
let scrollAmount = 320; // cât să deruleze la fiecare pas
let autoScroll;

// Funcția de auto-scroll
function startAutoScroll() {
  autoScroll = setInterval(() => {
    scrollArea.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    // Dacă ajunge aproape de capăt, revine la început
    if (scrollArea.scrollLeft + scrollArea.clientWidth >= scrollArea.scrollWidth - 10) {
      scrollArea.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, 4000);
}

// Oprește auto-scroll la hover
scrollArea.addEventListener('mouseenter', () => clearInterval(autoScroll));
scrollArea.addEventListener('mouseleave', startAutoScroll);

// Scroll cu rotita mouse-ului
scrollArea.addEventListener('wheel', (e) => {
  e.preventDefault();
  scrollArea.scrollBy({
    left: e.deltaY < 0 ? -100 : 100,
    behavior: 'smooth'
  });
});

// Pornește auto-scroll inițial
startAutoScroll();
