import { combineReducers } from 'redux';

import drawer from './drawer';
import header from './header';
import snackbar from './snackbar';

export default combineReducers({
  drawer,
  header,
  snackbar,
});
