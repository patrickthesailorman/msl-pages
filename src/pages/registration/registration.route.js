import {ANONYMOUS_REDIRECT_TO, ROLE_ANONYMOUS} from 'constants';

/**
 * Angular config for registration page.
 * @param {ui.router.state.$stateProvider} $stateProvider
 */
export default function registrationRoute($stateProvider) {
  'ngInject';

  $stateProvider.state(
    'msl.registration', {
      url: '/register',
      template: require('./registration.html'),
      controller: 'registrationCtrl',
      controllerAs: 'vm',
      data: {
        permissions: {
          only: [ROLE_ANONYMOUS],
          redirectTo: ANONYMOUS_REDIRECT_TO,
        },
      },
      title: 'Registration',
    });
}
