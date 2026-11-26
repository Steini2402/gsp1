/* Cache-freies Brand-Refresh für alle Seiten */
(function () {
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'brand-refresh.css?v=20261126-3';
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
