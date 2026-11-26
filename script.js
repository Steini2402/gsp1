/* Cache-freies Brand-Refresh für alle Seiten */
(function () {
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'brand-refresh.css?v=20261126-6';
  document.head.appendChild(css);

  document.querySelectorAll('.brand').forEach((brand) => {
    const icon = brand.querySelector('.brand-icon');
    const copy = brand.querySelector('.brand-copy');
    let logo = brand.querySelector('img.company-logo');
    if (!logo) {
      logo = document.createElement('img');
      logo.className = 'company-logo';
      logo.src = 'logo.svg?v=20261126-6';
      logo.alt = 'Gepäckservice Pfalz';
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

const inquiryForm = document.getElementById('inquiry-form');
if (inquiryForm) {
  inquiryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!inquiryForm.reportValidity()) return;

    const button = inquiryForm.querySelector('button[type="submit"]');
    const status = document.getElementById('form-status');
    const originalButtonText = button.innerHTML;
    button.disabled = true;
    button.textContent = 'Wird gesendet …';
    status.textContent = 'Ihre Anfrage wird sicher übertragen …';

    try {
      const response = await fetch(inquiryForm.action, {
        method: 'POST',
        body: new FormData(inquiryForm),
        headers: { Accept: 'application/json' }
      });
      const result = await response.json();
      const succeeded = result.success === true || result.success === 'true';
      if (!response.ok || !succeeded) {
        throw new Error(result.message || 'Der Formular-Dienst hat die Anfrage nicht bestätigt.');
      }
      window.location.assign('danke.html');
    } catch (error) {
      status.textContent = 'Der Versand hat leider nicht funktioniert. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch unter 0175 – 159 12 04.';
      button.disabled = false;
      button.innerHTML = originalButtonText;
      console.error('FormSubmit submission failed:', error);
    }
  });
}
