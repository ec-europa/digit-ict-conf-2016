// Import vendors
import 'material-design-lite';
// Import modules
import {elementFactory} from './elementFactory';
import {fetchContent} from './fetchContent';

document.onreadystatechange = function () {
  if (document.readyState == "complete") {

    addDrawer([
      {'label': 'home'},
      {'label': 'speakers'}
    ]);

    fetchContent('data/speakers.json', addSpeakersList)
  }
};

function addSpeakersList(speakers) {
  // hide drawer
  var drawer = document.querySelector("nav-drawer");
  drawer.classList.remove("is-visible");
  var card_to_add = elementFactory.speakersList(speakers);
  var card_holder = document.querySelector("card-holder");
  card_holder.innerHTML = card_to_add; // this hurts my eyes
}

function addDrawer(menu) {
  var card_to_add = elementFactory.drawer(menu);
  var card_holder = document.querySelector("nav-drawer");
  card_holder.innerHTML = card_to_add
}
