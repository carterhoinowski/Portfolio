// Highlights the nav link for whichever section is in view.

const sections = [...document.querySelectorAll('.section')];
const navLinks = document.querySelectorAll('.nav-link');

const setActive = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.section === id);
  });
};

const update = () => {
  // Contact is short, so it never reaches the middle of the screen.
  // Once you hit the bottom of the page, highlight the last section.
  const atBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom) return setActive(sections[sections.length - 1].id);

  // Otherwise: the last section whose top has passed the middle of the screen
  const line = window.innerHeight * 0.45;
  let current = sections[0].id;
  sections.forEach((s) => {
    if (s.getBoundingClientRect().top <= line) current = s.id;
  });
  setActive(current);
};

// requestAnimationFrame keeps this to once per frame while scrolling
let ticking = false;
window.addEventListener(
  'scroll',
  () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  },
  { passive: true }
);

window.addEventListener('resize', update);
update();

// Dark mode toggle. The starting theme is set in a small script in <head>.
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');

const syncToggle = () => {
  toggle.setAttribute('aria-pressed', root.dataset.theme === 'dark');
};

toggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
  syncToggle();
});

syncToggle();