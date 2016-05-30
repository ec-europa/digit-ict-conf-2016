import homeController from './home.js';
import programmeController from './programme.js';
import speakersController from './speakers.js';
import layoutController from './layout.js';
import notfoundController from './404.js';

export default {
  home: homeController,
  programme: programmeController,
  speakers: speakersController,
  layout: layoutController,
  notfound: notfoundController,
};
