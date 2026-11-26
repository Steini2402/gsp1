/* Cache-freies Brand-Refresh für alle Seiten */
(function () {
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'brand-refresh.css?v=20261126-2';
  document.head.appendChild(css);

  document.querySelectorAll('.brand').forEach((brand) => {
    const icon = brand.querySelector('.brand-icon');
    const copy = brand.querySelector('.brand-copy');

    let logo = brand.querySelector('img.company-logo');
    if (!logo) {
      logo = document.createElement('img');
      logo.className = 'company-logo';
      logo.src = 'logo.svg?v=20261126';
      logo.alt = 'Gepäckservice Pfalz';
      logo.width = 184;
      logo.height = 66;
      if (icon) icon.replaceWith(logo); else brand.prepend(logo);
    }
    if (copy) copy.remove();
  });
})();

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Navigation schließen' : 'Navigation öffnen');
  });
}

const form = document.getElementById('inquiry-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const subject = data.get('subject') || 'Anfrage Gepäckservice Pfalz';
    const body = [
      `Name: ${data.get('name')}`,
      `E-Mail: ${data.get('email')}`,
      `Telefon: ${data.get('phone') || '—'}`,
      `Adresse: ${data.get('address') || '—'}`,
      '',
      'Nachricht:',
      data.get('message')
    ].join('\n');

    const status = document.getElementById('form-status');
    if (status) status.textContent = 'Ihr E-Mail-Programm sollte sich jetzt mit Ihrer vorbereiteten Anfrage öffnen.';
    window.location.href = `mailto:info@gsp1.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
