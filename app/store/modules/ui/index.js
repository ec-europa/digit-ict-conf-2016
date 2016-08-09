import { combineReducers } from 'redux';

import drawer from './drawer';
import header from './header';
import snackbar from './snackbar';
import modal from './modal';

export default combineReducers({
  drawer,
  header,
  snackbar,
  modal,
});
