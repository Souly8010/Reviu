export const smoothScrollTo = (targetSelector, duration = 1500) => {
  const element = typeof targetSelector === 'string' 
    ? document.querySelector(targetSelector)
    : targetSelector;
    
  if (!element) return;

  const start = window.scrollY;
  const end = element.getBoundingClientRect().top + window.scrollY;
  const distance = end - start;
  const startTime = performance.now();

  function scrollStep(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutQuad(progress);
    window.scrollTo(0, start + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    }
  }

  function easeInOutQuad(t) {
    return t < 0.5
      ? 2 * t * t
      : -1 + (4 - 2 * t) * t;
  }

  requestAnimationFrame(scrollStep);
};

export const scrollToSection = (sectionId, duration = 1500, offset = 80) => {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const start = window.scrollY;
  const end = element.getBoundingClientRect().top + window.scrollY - offset;
  const distance = end - start;
  const startTime = performance.now();

  function scrollStep(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutQuad(progress);
    window.scrollTo(0, start + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    }
  }

  function easeInOutQuad(t) {
    return t < 0.5
      ? 2 * t * t
      : -1 + (4 - 2 * t) * t;
  }

  requestAnimationFrame(scrollStep);
};
