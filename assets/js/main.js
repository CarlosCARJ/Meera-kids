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
    filters.forEach((button) => {
      button.addEventListener('click', () => {
        const selected = button.dataset.filter;

        filters.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');

        items.forEach((card) => {
          const categories = (card.dataset.category || '').split(' ');
          const show = selected === 'all' || categories.includes(selected);
          card.hidden = !show;
        });
      });
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
