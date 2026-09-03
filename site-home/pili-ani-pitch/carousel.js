const slides = Array.from(document.querySelectorAll(".slide"));
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const slideCurrent = document.getElementById("slideCurrent");
const slideTotal = document.getElementById("slideTotal");
const dotsContainer = document.getElementById("dots");
const carousel = document.getElementById("carousel");

let current = 0;
let touchStartX = 0;
let touchStartY = 0;

slideTotal.textContent = slides.length;

slides.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.className = "dot";
  dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
  dot.addEventListener("click", () => goTo(index));
  dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.querySelectorAll(".dot"));

function goTo(index) {
  if (index < 0 || index >= slides.length) return;

  slides[current].classList.remove("active");
  dots[current].classList.remove("active");

  current = index;

  slides[current].classList.add("active");
  dots[current].classList.add("active");

  slideCurrent.textContent = current + 1;
}

function next() {
  goTo(Math.min(current + 1, slides.length - 1));
}

function previous() {
  goTo(Math.max(current - 1, 0));
}

prevBtn.addEventListener("click", previous);
nextBtn.addEventListener("click", next);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    event.preventDefault();
    next();
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    previous();
  } else if (event.key === "Home") {
    event.preventDefault();
    goTo(0);
  } else if (event.key === "End") {
    event.preventDefault();
    goTo(slides.length - 1);
  }
});

/* Touch/swipe navigation */
carousel.addEventListener("touchstart", (event) => {
  const touch = event.changedTouches[0];
  touchStartX = touch.screenX;
  touchStartY = touch.screenY;
}, { passive: true });

carousel.addEventListener("touchend", (event) => {
  const touch = event.changedTouches[0];
  const dx = touch.screenX - touchStartX;
  const dy = touch.screenY - touchStartY;

  /* Ignore mostly-vertical gestures */
  if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;

  if (dx < 0) next();
  else previous();
}, { passive: true });

goTo(0);
