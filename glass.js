const sections = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -30px 0px' });

  document.documentElement.classList.add('motion');
  sections.forEach(section => observer.observe(section));
}

document.querySelectorAll('.principles article').forEach(card => {
  card.addEventListener('pointermove', event => {
    const bounds = card.getBoundingClientRect();
    card.style.setProperty('--light-x', `${event.clientX - bounds.left}px`);
    card.style.setProperty('--light-y', `${event.clientY - bounds.top}px`);
  });
});

const meme = document.querySelector('#meme');
let memeTimer;

function scheduleMeme() {
  clearTimeout(memeTimer);
  if (document.hidden || meme.open) return;

  memeTimer = setTimeout(() => {
    if (!document.hidden && !meme.open) meme.showModal();
  }, 15_000);
}

if (typeof meme?.showModal === 'function') {
  meme.addEventListener('close', scheduleMeme);
  document.addEventListener('visibilitychange', scheduleMeme);
  scheduleMeme();
}
