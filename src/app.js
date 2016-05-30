import page from 'page';
import controllers from './controllers/index.js';

page('/', controllers.home, controllers.layout);
page('/program', controllers.program, controllers.layout);
page('/speakers', controllers.speakers, controllers.layout);
page('*', controllers.notfound, controllers.layout);
page({ hashbang: true });
