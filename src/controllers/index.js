import homeController from './home.js';
import programController from './program.js';
import speakersController from './speakers.js';
import layoutController from './layout.js';
import notfoundController from './404.js';

export default {
  home: homeController,
  program: programController,
  speakers: speakersController,
  layout: layoutController,
  notfound: notfoundController,
};
