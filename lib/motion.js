/** Révélations, repères de navigation et progression de la méthode. */
export function initializeMotion(scope) {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  root.classList.add('js');
  const wait = (milliseconds) => new Promise((resolve) => scope.timeout(resolve, milliseconds));
  Promise.race([document.fonts?.ready || Promise.resolve(), wait(900)]).then(
    scope.guard(() => {
      scope.frame(() => root.classList.add('is-ready'));
    }),
  );
  $('#year').textContent = new Date().getFullYear();

  // Reveal content once as it enters the viewport.
  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = scope.observe(
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          });
        },
        {
          threshold: 0.06,
          rootMargin: '0px 0px -24px 0px',
        },
      ),
    );
    $$('.reveal').forEach((element) => revealObserver.observe(element));
  } else {
    $$('.reveal').forEach((element) => element.classList.add('is-visible'));
  }

  // One animation frame per scroll event, with no continuous render loop.
  const sections = $$('.desktop-nav a').map((link) => ({
    link,
    section: $(link.getAttribute('href')),
  }));
  const methodSteps = $$('.method-step');
  const methodNumber = $('#method-number');
  const methodTrack = $('.method-track > span');
  let currentStep = 1;
  let scrollQueued = false;
  function updateScroll() {
    const total = root.scrollHeight - innerHeight;
    root.style.setProperty('--page-progress', total > 0 ? String(Math.min(1, scrollY / total)) : '0');
    let activeSection = null;
    sections.forEach((item) => {
      const bounds = item.section.getBoundingClientRect();
      if (bounds.top < innerHeight * 0.4 && bounds.bottom > innerHeight * 0.25) activeSection = item;
    });
    sections.forEach((item) => {
      const active = item === activeSection;
      item.link.classList.toggle('is-active', active);
      if (active) item.link.setAttribute('aria-current', 'location');
      else item.link.removeAttribute('aria-current');
    });
    let nextStep = 1;
    methodSteps.forEach((step, index) => {
      if (step.getBoundingClientRect().top < innerHeight * 0.54) nextStep = index + 1;
    });
    if (currentStep !== nextStep) {
      currentStep = nextStep;
      methodNumber.textContent = String(nextStep).padStart(2, '0');
      methodTrack.style.width = nextStep * 25 + '%';
      methodSteps.forEach((step, index) => step.classList.toggle('is-current', index + 1 === nextStep));
      if (!reducedMotion)
        methodNumber.animate?.(
          [
            {
              opacity: 0,
              transform: 'translateY(10px)',
            },
            {
              opacity: 1,
              transform: 'translateY(0)',
            },
          ],
          {
            duration: 450,
            easing: 'cubic-bezier(.22,1,.36,1)',
          },
        );
    }
    scrollQueued = false;
  }
  function queueScroll() {
    if (scrollQueued) return;
    scrollQueued = true;
    scope.frame(updateScroll);
  }
  scope.listen(window, 'scroll', queueScroll, {
    passive: true,
  });
  scope.listen(window, 'resize', queueScroll, {
    passive: true,
  });
  updateScroll();
}
