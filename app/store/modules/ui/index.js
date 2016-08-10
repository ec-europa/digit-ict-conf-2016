import { combineReducers } from 'redux';

import content from './content';
import drawer from './drawer';
import header from './header';
import snackbar from './snackbar';
import modal from './modal';

export default combineReducers({
  content,
  drawer,
  header,
  snackbar,
  modal,
});
