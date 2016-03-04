/**
 * Songs table directive.
 */
export default function songsTable () {
  'ngInject';
  return {
    restrict: 'E',
    template: require('../templates/songsTable.html'),
    scope: {
      loading: '=',
      songs: '=',
    },
  };
}
