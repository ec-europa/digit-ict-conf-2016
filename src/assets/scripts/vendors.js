// Import vendors
import 'material-design-lite';

// Close drawer on click
const drawer = document.querySelector('.mdl-layout__drawer');
drawer.addEventListener('click', () => {
  document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
  drawer.classList.remove('is-visible');
}, false);
