const refreshStyles = document.createElement('link');
refreshStyles.rel = 'stylesheet';
refreshStyles.href = 'brand-refresh.css';
document.head.appendChild(refreshStyles);

document.querySelectorAll('.brand').forEach((brand) => {
  const mark = brand.querySelector('.brand-icon');
  if (!mark) return;
  const logo = document.createElement('img');
  logo.className = 'company-logo';
  logo.src = 'logo.svg';
  logo.alt = 'Gepäckservice Pfalz';
  mark.replaceWith(logo);
  brand.querySelector('.brand-copy')?.remove();
});

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
    const link = `mailto:info@gsp1.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const status = document.getElementById('form-status');
    status.textContent = 'Ihr E-Mail-Programm sollte sich jetzt mit Ihrer vorbereiteten Anfrage öffnen.';
    window.location.href = link;
  });
}
