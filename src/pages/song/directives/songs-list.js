/**
 * Song list directive.
 */
export default function songList() {

  'ngInject';

  return {
    restrict: 'E',
    scope: {
      songs: '=',
    },
    template: require('../templates/songs-list.html'),
  };
}
