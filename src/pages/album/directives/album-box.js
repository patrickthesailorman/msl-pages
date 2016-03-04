/**
 * Album box directive.
 */
export default function albumBox() {

  'ngInject';

  return {
    restrict: 'E',
    scope: {
      album: '=',
    },
    template: require('../templates/album-box.html'),
    controller: 'albumBoxCtrl',
    controllerAs: 'vm',
  };
}
