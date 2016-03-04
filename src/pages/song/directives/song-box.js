/**
 * Song box directive.
 */
export default function songBox() {

  'ngInject';

  return {
    restrict: 'E',
    scope: {
      song: '=',
    },
    template: require('../templates/song-box.html'),
    controller: 'songBoxCtrl',
    controllerAs: 'vm',
  };
}
