/**
 * Artist List directive.
 */
export default function artistsList() {

  'ngInject';

  return {
    restrict: 'E',
    scope: {
      artists: '=',
    },
    template: require('../templates/artist-list.html'),
  };
}
