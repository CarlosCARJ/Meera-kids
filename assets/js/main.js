document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('is-open');
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => menu.classList.remove('is-open'));
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
          const categories = card.dataset.category.split(' ');
          const show = selected === 'all' || categories.includes(selected);
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  document.querySelectorAll('[data-demo-form]').forEach((form) => {
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
