/**
 * Artist box directive.
 */
export default function artistsBox() {

  'ngInject';

  return {
    restrict: 'E',
    scope: {
      artist: '=',
    },
    template: require('../templates/artist-box.html'),
    controller: 'artistBoxCtrl',
    controllerAs: 'vm',
  };
}
