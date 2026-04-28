document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const filters = document.querySelectorAll('[data-filter]');
  const items = document.querySelectorAll('[data-category]');

  if (filters.length && items.length) {
    const applyProductFilter = (selectedFilter) => {
      const selected = selectedFilter || 'all';

      filters.forEach((button) => {
        const isActive = button.dataset.filter === selected;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });

      items.forEach((card) => {
        const categories = (card.dataset.category || '')
          .split(/\s+/)
          .filter(Boolean);
        const show = selected === 'all' || categories.includes(selected);

        card.classList.toggle('is-hidden', !show);
        card.toggleAttribute('hidden', !show);
        card.setAttribute('aria-hidden', String(!show));
      });
    };

    filters.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.classList.contains('active')));
      button.addEventListener('click', () => applyProductFilter(button.dataset.filter));
    });
  }



  const modelFallbacks = {
    rover: ['assets/models/Rover.glb'],
    futbol: ['assets/models/Futbol.glb'],
    basquet: ['assets/models/Basquet.glb'],
    carreras: ['assets/models/Carreras.glb']
  };

  document.querySelectorAll('model-viewer[data-product]').forEach((viewer) => {
    const product = viewer.dataset.product;
    const sources = modelFallbacks[product];
    if (!sources || !sources.length) return;

    let currentIndex = Math.max(0, sources.indexOf(viewer.getAttribute('src')));
    if (viewer.getAttribute('src') !== sources[currentIndex]) {
      viewer.setAttribute('src', sources[currentIndex]);
    }

    viewer.addEventListener('error', () => {
      currentIndex += 1;
      if (currentIndex < sources.length) {
        viewer.setAttribute('src', sources[currentIndex]);
      }
    });
  });

  document.querySelectorAll('[data-contact-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = form.querySelector('.form-status');
      if (status) {
        status.textContent = 'Gracias por tu solicitud. Hemos recibido tu información y pronto daremos seguimiento a tu interés en MEERA KIDS.';
      }
      form.reset();
    });
  });
});
