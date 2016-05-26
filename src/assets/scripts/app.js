// Import vendors
import 'material-design-lite';
// Import modules
import {elementFactory} from './elementFactory';
import {fetchContent} from './fetchContent';

document.onreadystatechange = function () {
  if (document.readyState == "complete") {

    // Create the navigation
    addDrawer([
      {'icon':'home','label': 'home'},
      {'icon':'people','label': 'speakers'}
    ]);

    fetchContent('data/speakers.json', addSpeakersList)
  }
};

function addSpeakersList(speakers) {
  // hide drawer
  let drawer = document.querySelector("nav-drawer");
  drawer.classList.remove("is-visible");

  const card_to_add = elementFactory.speakersList(speakers);
  let card_holder = document.querySelector("card-holder");
  card_holder.innerHTML = card_to_add;
}

function addDrawer(menu) {
  const card_to_add = elementFactory.drawer(menu);
  let card_holder = document.querySelector("nav-drawer");
  card_holder.innerHTML = card_to_add;
}
