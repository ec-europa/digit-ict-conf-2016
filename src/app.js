import page from 'page';
import controllers from './controllers/index.js';
import store from './store';

store.init();

page('/', controllers.home, controllers.layout);
page('/programme', controllers.programme, controllers.layout);
page('/speakers', controllers.speakers, controllers.layout);
page('*', controllers.notfound, controllers.layout);
page({ hashbang: false });
