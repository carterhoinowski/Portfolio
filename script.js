// Highlights the nav link for whichever section is in view.
// Uses IntersectionObserver so it doesn't run on every scroll event.

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

const setActive = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.section === id);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  },
  { rootMargin: '-40% 0px -50% 0px' } // triggers when a section is near the middle of the viewport
);

sections.forEach((section) => observer.observe(section));
