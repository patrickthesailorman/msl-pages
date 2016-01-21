// View
import './stylesheets/error.scss';

// Dependencies
import angular from 'angular';

import errorPageRoute from './error.route.js';

/**
 * Default error page module.
 * All pages related with errors are handled in this module.
 */
export default angular.module('msl.error', [])
  .config(errorPageRoute)
  .name;
