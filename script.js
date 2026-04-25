const whatsappNumber = '+918397903160';
const whatsappBase = `https://wa.me/${whatsappNumber}`;
const header = document.querySelector('.site-header');
const backToTopButton = document.getElementById('backToTop');
const observerOptions = { threshold: 0.18 };

// Slider variables
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slider img');
const dotsContainer = document.querySelector('.slider-dots');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
let autoSlideInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  document.querySelectorAll('.slider-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  currentSlide = index;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function createDots() {
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showSlide(index));
    dotsContainer.appendChild(dot);
  });
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function initSlider() {
  if (slides.length === 0) return;
  createDots();
  showSlide(0);
  startAutoSlide();

  prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
  });
}

function orderNow() {
  const message = 'Hello Resin Creations, I would like to inquire about a custom resin order.';
  window.open(`${whatsappBase}?text=${encodeURIComponent(message)}`, '_blank');
}

function buyProduct(product) {
  const message = `Hello Resin Creations, I am interested in ordering: ${product}.`;
  window.open(`${whatsappBase}?text=${encodeURIComponent(message)}`, '_blank');
}

function openImage(element) {
  const imageSrc = element.tagName === 'IMG'
    ? element.src
    : element.querySelector('img')?.src;

  if (!imageSrc) return;

  const popup = document.getElementById('popup');
  const popupImg = document.getElementById('popup-img');
  popupImg.src = imageSrc;
  popup.style.display = 'grid';
}

function closeImage() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
}

function sendOrder(event) {
  event.preventDefault();

  const name = document.getElementById('customer-name').value.trim();
  const product = document.getElementById('product-select').value;
  const customText = document.getElementById('custom-text').value.trim();

  if (!name || !product) {
    alert('Please enter your name and select a product.');
    return;
  }

  let message = `Name: ${name}\nProduct: ${product}`;
  if (customText) {
    message += `\nCustom: ${customText}`;
  }
  message += '\n\nI would like to place this order with Resin Creations.';

  window.open(`${whatsappBase}?text=${encodeURIComponent(message)}`, '_blank');
}

function handleScroll() {
  const hasScrolled = window.scrollY > 16;
  header.classList.toggle('scrolled', hasScrolled);
  backToTopButton.classList.toggle('show', window.scrollY > 450);
}

function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(element => observer.observe(element));
}

function initPage() {
  initSlider();
  setupScrollAnimations();
  document.querySelectorAll('.product-card, .gallery-grid img').forEach(element => {
    element.addEventListener('click', (event) => {
      if (event.target.tagName.toLowerCase() !== 'button') {
        openImage(event.currentTarget);
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initPage();
  setTimeout(() => {
    document.body.classList.add('page-ready');
  }, 100);
});

window.addEventListener('scroll', handleScroll);

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeImage();
  }
});
