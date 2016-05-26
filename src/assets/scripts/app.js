// Import vendors
import 'material-design-lite';

// Import modules
import { elementFactory } from './elementFactory';
import { fetchContent } from './fetchContent';

function addDrawer(menu) {
  const cardToAdd = elementFactory.drawer(menu);
  const cardHolder = document.querySelector('nav-drawer');
  cardHolder.innerHTML = cardToAdd;
}

function addSpeakersList(speakers) {
  // hide drawer
  const drawer = document.querySelector('nav-drawer');
  drawer.classList.remove('is-visible');

  const cardToAdd = elementFactory.speakersList(speakers);
  const cardHolder = document.querySelector('card-holder');
  cardHolder.innerHTML = cardToAdd;
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    // Create the navigation
    addDrawer([
      { icon: 'home', label: 'home' },
      { icon: 'people', label: 'speakers' },
    ]);

    fetchContent('data/speakers.json', addSpeakersList);
  }
};
